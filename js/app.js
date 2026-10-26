/**
 * Munja Kalkulator Oferty
 * Clean Vanilla JavaScript Calculator Engine
 */

(() => {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
    vatRate: 0.23, // 23% VAT
    currency: 'PLN',
    locale: 'pl-PL'
  };

  // Currency Formatter
  const currencyFormatter = new Intl.NumberFormat(CONFIG.locale, {
    style: 'currency',
    currency: CONFIG.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // --- DOM Elements ---
  const elements = {
    form: document.getElementById('offer-calc-form'),
    packageSelect: document.getElementById('package-select'),
    quantityRange: document.getElementById('quantity-range'),
    quantityVal: document.getElementById('quantity-val'),
    discountInput: document.getElementById('calc-discount'),
    breakdownList: document.getElementById('breakdown-list'),
    totalNet: document.getElementById('total-net'),
    totalVat: document.getElementById('total-vat'),
    totalGross: document.getElementById('total-gross'),
    btnReset: document.getElementById('btn-reset'),
    btnCopy: document.getElementById('btn-copy-summary'),
    btnPrint: document.getElementById('btn-print-summary'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
  };

  let toastTimeout = null;

  // --- Core Calculation Logic ---
  function calculate() {
    const items = [];
    let subtotal = 0;

    // 1. Base Package
    if (elements.packageSelect) {
      const selectedOption = elements.packageSelect.options[elements.packageSelect.selectedIndex];
      const packagePrice = parseFloat(selectedOption.dataset.price || '0');
      const packageName = selectedOption.textContent.split('—')[0].trim();

      items.push({
        name: packageName,
        sub: 'Pakiet podstawowy',
        price: packagePrice
      });
      subtotal += packagePrice;
    }

    // 2. Extra Quantity (e.g. hours / modules)
    if (elements.quantityRange) {
      const qty = parseInt(elements.quantityRange.value, 10) || 0;
      const unitPrice = parseFloat(elements.quantityRange.dataset.unitPrice || '0');
      const qtyTotal = qty * unitPrice;

      if (qty > 0) {
        items.push({
          name: `Dodatkowe moduły/godziny (${qty} szt.)`,
          sub: `${currencyFormatter.format(unitPrice)} / szt.`,
          price: qtyTotal
        });
        subtotal += qtyTotal;
      }
    }

    // 3. Checkboxes (Extra options)
    const extraCheckboxes = elements.form.querySelectorAll('input[name="extra_options"]:checked');
    extraCheckboxes.forEach((cb) => {
      const price = parseFloat(cb.dataset.price || '0');
      const card = cb.closest('.custom-checkbox-card');
      const title = card ? card.querySelector('.checkbox-title')?.textContent : 'Opcja dodatkowa';

      items.push({
        name: title.split('(+')[0].trim(),
        sub: 'Opcja rozszerzona',
        price: price
      });
      subtotal += price;
    });

    // 4. Discount
    let discountPercent = 0;
    let discountAmount = 0;
    if (elements.discountInput) {
      discountPercent = Math.min(Math.max(parseFloat(elements.discountInput.value) || 0, 0), 100);
      if (discountPercent > 0) {
        discountAmount = subtotal * (discountPercent / 100);
        items.push({
          name: `Rabat partnerski (-${discountPercent}%)`,
          sub: 'Zniżka specjalna',
          price: -discountAmount,
          isDiscount: true
        });
      }
    }

    const netTotal = Math.max(0, subtotal - discountAmount);
    const vatAmount = netTotal * CONFIG.vatRate;
    const grossTotal = netTotal + vatAmount;

    return {
      items,
      subtotal,
      discountPercent,
      discountAmount,
      netTotal,
      vatAmount,
      grossTotal
    };
  }

  // --- Render Function ---
  function render() {
    const calculation = calculate();

    // Update Totals
    elements.totalNet.textContent = currencyFormatter.format(calculation.netTotal);
    elements.totalVat.textContent = currencyFormatter.format(calculation.vatAmount);
    elements.totalGross.textContent = currencyFormatter.format(calculation.grossTotal);

    // Update Live Range Value Display
    if (elements.quantityRange && elements.quantityVal) {
      elements.quantityVal.textContent = `${elements.quantityRange.value} szt.`;
    }

    // Update Breakdown
    if (elements.breakdownList) {
      if (calculation.items.length === 0) {
        elements.breakdownList.innerHTML = '<li class="breakdown-empty">Brak wybranych pozycji</li>';
      } else {
        elements.breakdownList.innerHTML = calculation.items.map((item) => `
          <li class="breakdown-item">
            <div>
              <div class="breakdown-item-name">${escapeHtml(item.name)}</div>
              ${item.sub ? `<div class="breakdown-item-sub">${escapeHtml(item.sub)}</div>` : ''}
            </div>
            <div class="breakdown-item-price ${item.isDiscount ? 'discount' : ''}">
              ${item.price < 0 ? '-' : ''}${currencyFormatter.format(Math.abs(item.price))}
            </div>
          </li>
        `).join('');
      }
    }
  }

  // --- Utilities ---
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showToast(message) {
    if (!elements.toast || !elements.toastMessage) return;
    elements.toastMessage.textContent = message;
    elements.toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2800);
  }

  function generateTextSummary() {
    const calc = calculate();
    let text = `==============================\n`;
    text += `MUNJA — SZACUNEK OFERTY\n`;
    text += `munja-kalkulator.wesolowski.dev\n`;
    text += `Data: ${new Date().toLocaleDateString(CONFIG.locale)}\n`;
    text += `==============================\n\n`;

    text += `POZYCJE:\n`;
    calc.items.forEach((item, idx) => {
      const priceStr = `${item.price < 0 ? '-' : ''}${currencyFormatter.format(Math.abs(item.price))}`;
      text += `${idx + 1}. ${item.name}: ${priceStr}\n`;
    });

    text += `\n------------------------------\n`;
    text += `Suma netto:  ${currencyFormatter.format(calc.netTotal)}\n`;
    text += `VAT 23%:     ${currencyFormatter.format(calc.vatAmount)}\n`;
    text += `ŁĄCZNIE BRUTTO: ${currencyFormatter.format(calc.grossTotal)}\n`;
    text += `==============================\n`;
    text += `Wycena orientacyjna.`;

    return text;
  }

  // --- Event Listeners ---
  function initListeners() {
    if (elements.form) {
      elements.form.addEventListener('input', render);
      elements.form.addEventListener('change', render);
    }

    if (elements.btnReset) {
      elements.btnReset.addEventListener('click', () => {
        elements.form.reset();
        render();
        showToast('Formularz został zresetowany');
      });
    }

    if (elements.btnCopy) {
      elements.btnCopy.addEventListener('click', async () => {
        const text = generateTextSummary();
        try {
          await navigator.clipboard.writeText(text);
          showToast('Podsumowanie skopiowane do schowka!');
        } catch (err) {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast('Podsumowanie skopiowane do schowka!');
        }
      });
    }

    if (elements.btnPrint) {
      elements.btnPrint.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // --- Initializer ---
  function init() {
    initListeners();
    render();
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
