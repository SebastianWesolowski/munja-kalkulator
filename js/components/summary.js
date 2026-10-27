/**
 * Component: Summary Card & Cost Breakdown Controller
 */

import { formatMoney, escapeHtml, currencyFormatter } from '../config.js';
import { generateOfferText, copyToClipboard } from '../services/clipboard.js';
import { showToast } from './toast.js';

let summaryTaxIndicator = null;
let totalOnetimeDisplay = null;
let onetimeSubtext = null;
let totalMonthlyDisplay = null;
let monthlySubtext = null;
let summaryNetMonthly = null;
let summaryVatMonthly = null;
let summaryGrossMonthly = null;
let breakdownList = null;
let tcoTotal = null;
let tcoNote = null;
let btnCopy = null;
let btnPrint = null;

let currentCalc = null;

/**
 * Initialize summary card action buttons
 */
export function initSummary() {
  summaryTaxIndicator = document.getElementById('summary-tax-indicator');
  totalOnetimeDisplay = document.getElementById('total-onetime-display');
  onetimeSubtext = document.getElementById('onetime-subtext');
  totalMonthlyDisplay = document.getElementById('total-monthly-display');
  monthlySubtext = document.getElementById('monthly-subtext');
  summaryNetMonthly = document.getElementById('summary-net-monthly');
  summaryVatMonthly = document.getElementById('summary-vat-monthly');
  summaryGrossMonthly = document.getElementById('summary-gross-monthly');
  breakdownList = document.getElementById('breakdown-list');
  tcoTotal = document.getElementById('tco-total');
  tcoNote = document.getElementById('tco-note');
  btnCopy = document.getElementById('btn-copy-summary');
  btnPrint = document.getElementById('btn-print-summary');

  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      if (!currentCalc) return;
      const text = generateOfferText(currentCalc);
      const ok = await copyToClipboard(text);
      if (ok) {
        showToast('Podsumowanie skopiowane do schowka!');
      }
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}

/**
 * Render complete summary output
 * @param {Object} calc - Calculation result from calculateOffer
 * @param {Object} values - Current form values
 * @param {boolean} isGross - Whether in gross mode
 */
export function renderSummary(calc, values, isGross) {
  currentCalc = calc;

  // Mode badge
  if (summaryTaxIndicator) {
    summaryTaxIndicator.textContent = isGross ? 'BRUTTO (+23% VAT)' : 'NETTO';
  }

  // Hero: Onetime
  if (totalOnetimeDisplay) {
    totalOnetimeDisplay.textContent = formatMoney(calc.onetimeNet, isGross);
  }
  if (onetimeSubtext) {
    const parts = [];
    if (values.pilot) parts.push(`Pilotaż (${formatMoney(4000, isGross, { trimZero: true })})`);
    if (values.setupFee && calc.setupNet > 0) parts.push(`Przeniesienie infrastruktury (${formatMoney(calc.setupNet, isGross, { trimZero: true })})`);
    onetimeSubtext.textContent = parts.length > 0 ? parts.join(' + ') : 'Brak opłat startowych';
  }

  // Hero: Monthly
  if (totalMonthlyDisplay) {
    totalMonthlyDisplay.innerHTML = `${formatMoney(calc.monthlyNet, isGross)}<small>/mies.</small>`;
  }
  if (monthlySubtext) {
    const baseFormatted = formatMoney(calc.baseNet, isGross, { trimZero: true });
    const parts = [`Baza (${baseFormatted})`];

    if (values.devPlan && values.devPlan !== '0') {
      const devItem = calc.monthlyItems.find(i => i.type === 'dev');
      const devFormatted = devItem ? ` (${formatMoney(devItem.netPrice, isGross, { trimZero: true })})` : '';
      parts.push(`Rozwój ${values.devPlan}h${devFormatted}`);
    }
    if (calc.adhocHours > 0) {
      const adhocFormatted = formatMoney(calc.adhocNet || (calc.adhocHours * 200), isGross, { trimZero: true });
      parts.push(`+${calc.adhocHours}h (${adhocFormatted})`);
    }
    if (values.workspace) {
      const wsAccounts = calc.workspaceAccounts || 9;
      const wsFormatted = formatMoney(calc.workspaceNet || (wsAccounts * 35), isGross, { trimZero: true });
      parts.push(`Poczta (${wsFormatted})`);
    }
    monthlySubtext.textContent = calc.monthlyNet > 0 ? parts.join(' + ') : 'Brak stałego abonamentu';
  }

  // Tax Table
  if (summaryNetMonthly) {
    summaryNetMonthly.textContent = currencyFormatter.format(calc.monthlyNet);
  }
  if (summaryVatMonthly) {
    summaryVatMonthly.textContent = currencyFormatter.format(calc.monthlyVat);
  }
  if (summaryGrossMonthly) {
    summaryGrossMonthly.textContent = currencyFormatter.format(calc.monthlyGross);
  }

  const taxBanner = document.getElementById('tax-banner');
  if (taxBanner) {
    taxBanner.classList.toggle('mode-gross', isGross);
    taxBanner.classList.toggle('mode-net', !isGross);
  }

  // Itemized breakdown list
  if (breakdownList) {
    let html = '';

    if (calc.onetimeItems.length > 0) {
      html += `<li class="breakdown-category">🚀 Koszty jednorazowe na start</li>`;
      calc.onetimeItems.forEach(item => {
        html += `
          <li class="breakdown-item">
            <div>
              <div class="breakdown-item-name">${escapeHtml(item.name)}</div>
              <div class="breakdown-item-sub">${escapeHtml(item.sub)}</div>
            </div>
            <div class="breakdown-item-price">${formatMoney(item.netPrice, isGross)}</div>
          </li>
        `;
      });
    }

    if (calc.monthlyItems.length > 0) {
      html += `<li class="breakdown-category">🔄 Stały abonament miesięczny (od stycznia 2027 r.)</li>`;
      calc.monthlyItems.forEach(item => {
        html += `
          <li class="breakdown-item">
            <div>
              <div class="breakdown-item-name">${escapeHtml(item.name)}</div>
              <div class="breakdown-item-sub">${escapeHtml(item.sub)}</div>
            </div>
            <div class="breakdown-item-price">${formatMoney(item.netPrice, isGross)}/mies.</div>
          </li>
        `;
      });
    }

    if (calc.onetimeItems.length === 0 && calc.monthlyItems.length === 0) {
      html = `<li class="breakdown-empty">Brak zaznaczonych pozycji w wycenie.</li>`;
    }

    breakdownList.innerHTML = html;
  }

  // TCO Box
  if (tcoTotal) {
    tcoTotal.textContent = formatMoney(calc.tcoNet, isGross);
  }
  if (tcoNote) {
    if (calc.monthlyNet === 0) {
      tcoNote.textContent = `Obejmuje wyłącznie etap pilotażowy (${formatMoney(calc.onetimeNet, isGross, { trimZero: true })}). Bez zobowiązań do stałej obsługi.`;
    } else {
      tcoNote.textContent = `Obejmuje: Pilotaż Munji (listopad / grudzień 2026) + Przeniesienie infrastruktury (styczeń 2027) + 12 miesięcy stałej obsługi (${formatMoney(calc.monthlyNet * 12, isGross, { trimZero: true })}).`;
    }
  }

  // Legal note
  const summaryLegal = document.getElementById('summary-legal-note');
  if (summaryLegal) {
    summaryLegal.textContent = isGross
      ? 'Wszystkie kwoty w wycenie są wartościami brutto (zawierają 23% VAT). Pilotaż zamawiany jest osobno. Docelowe stawki stałej opieki doprecyzujemy po pilotażu i zbadaniu zaplecza.'
      : 'Wszystkie kwoty w wycenie są wartościami netto (+23% VAT). Pilotaż zamawiany jest osobno. Docelowe stawki stałej opieki doprecyzujemy po pilotażu i zbadaniu zaplecza.';
  }
}
