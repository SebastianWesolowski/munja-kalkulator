/**
 * Munja · Baila Warsaw · NINE’s Restaurant & Sports Bar
 * Kalkulator Oferty & Symulator Kosztów Współpracy
 * Vanilla JavaScript Engine
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

  // Short number formatter (without trailing .00 if integer)
  function formatMoney(amount, isGross = false) {
    const finalAmount = isGross ? amount * (1 + CONFIG.vatRate) : amount;
    return currencyFormatter.format(finalAmount);
  }

  // --- DOM Elements ---
  const elements = {
    form: document.getElementById('offer-calc-form'),
    
    // Tax toggles
    taxToggleNet: document.getElementById('tax-toggle-net'),
    taxToggleGross: document.getElementById('tax-toggle-gross'),
    summaryTaxIndicator: document.getElementById('summary-tax-indicator'),

    // Preset pills
    presetPills: document.querySelectorAll('.preset-pill'),

    // Step 1: Pilot
    optPilot: document.getElementById('opt-pilot'),

    // Step 2: Setup Fee
    optSetupFee: document.getElementById('opt-setup-fee'),

    // Step 3A: Base items
    optSupervision: document.getElementById('opt-supervision'),
    optCms: document.getElementById('opt-cms'),
    optVps: document.getElementById('opt-vps'),
    optDomains: document.getElementById('opt-domains'),
    baseBundleTotal: document.getElementById('base-bundle-total'),

    // Step 3B: Development plans
    devRadios: document.querySelectorAll('input[name="dev_plan"]'),
    extraAdhocHours: document.getElementById('extra-adhoc-hours'),
    extraHoursDisplay: document.getElementById('extra-hours-display'),

    // Step 3C: Workspace
    toggleWorkspace: document.getElementById('toggle-workspace'),
    workspacePanel: document.getElementById('workspace-config-panel'),
    workspaceAccountsRange: document.getElementById('workspace-accounts-range'),
    workspaceAccountsDisplay: document.getElementById('workspace-accounts-display'),

    // Summary outputs
    totalOnetimeDisplay: document.getElementById('total-onetime-display'),
    onetimeSubtext: document.getElementById('onetime-subtext'),
    totalMonthlyDisplay: document.getElementById('total-monthly-display'),
    monthlySubtext: document.getElementById('monthly-subtext'),
    
    summaryNetMonthly: document.getElementById('summary-net-monthly'),
    summaryVatMonthly: document.getElementById('summary-vat-monthly'),
    summaryGrossMonthly: document.getElementById('summary-gross-monthly'),
    
    breakdownList: document.getElementById('breakdown-list'),
    tcoTotal: document.getElementById('tco-total'),
    tcoNote: document.getElementById('tco-note'),

    // Action buttons
    btnReset: document.getElementById('btn-reset'),
    btnCopy: document.getElementById('btn-copy-summary'),
    btnPrint: document.getElementById('btn-print-summary'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
  };

  // State
  let state = {
    isGross: false // false = netto, true = brutto
  };

  let toastTimeout = null;

  // --- Calculation Logic ---
  function calculate() {
    const isGross = state.isGross;
    const vatMul = isGross ? (1 + CONFIG.vatRate) : 1;

    // 1. Onetime items
    const onetimeItems = [];
    let onetimeNet = 0;

    if (elements.optPilot && elements.optPilot.checked) {
      const price = parseFloat(elements.optPilot.dataset.price || '3000');
      onetimeItems.push({
        id: 'pilot',
        name: 'Pilotaż Munji (pakiet 20h szybkich usprawnień)',
        sub: '150 zł/h netto · Listopad / Grudzień 2026',
        netPrice: price,
        type: 'onetime'
      });
      onetimeNet += price;
    }

    if (elements.optSetupFee && elements.optSetupFee.checked) {
      const price = parseFloat(elements.optSetupFee.dataset.price || '3000');
      onetimeItems.push({
        id: 'setup',
        name: 'Setup Fee: Wdrożenie VPS, migracja, domeny, SPF/DKIM/DMARC',
        sub: 'Jednorazowe przejęcie infrastruktury · Styczeń 2027',
        netPrice: price,
        type: 'onetime'
      });
      onetimeNet += price;
    }

    // 2. Monthly Base items
    const monthlyItems = [];
    let baseNet = 0;

    if (elements.optSupervision && elements.optSupervision.checked) {
      const price = parseFloat(elements.optSupervision.dataset.price || '750');
      monthlyItems.push({
        id: 'supervision',
        name: 'Nadzór techniczny, kopie, monitoring 24/7 i SLA',
        sub: 'P1 ≤ 4h, P2 ≤ 1 dzień, P3 ≤ 3 dni',
        netPrice: price,
        type: 'base'
      });
      baseNet += price;
    }

    if (elements.optCms && elements.optCms.checked) {
      const price = parseFloat(elements.optCms.dataset.price || '500');
      monthlyItems.push({
        id: 'cms',
        name: 'Publikacja gotowych treści w CMS',
        sub: 'Do 9h/mies. łącznie na menu, teksty, zdjęcia lokali',
        netPrice: price,
        type: 'base'
      });
      baseNet += price;
    }

    if (elements.optVps && elements.optVps.checked) {
      const price = parseFloat(elements.optVps.dataset.price || '150');
      monthlyItems.push({
        id: 'vps',
        name: 'Dedykowany VPS (DataHouse Warszawa)',
        sub: '4 vCPU, 8 GB RAM, 100 GB NVMe wyłącznie dla grupy',
        netPrice: price,
        type: 'base'
      });
      baseNet += price;
    }

    if (elements.optDomains && elements.optDomains.checked) {
      const price = parseFloat(elements.optDomains.dataset.price || '50');
      monthlyItems.push({
        id: 'domains',
        name: 'Pakiet 5 domen (stały ryczałt)',
        sub: 'Model hurtowy win-win: transfer i coroczne odnowienia',
        netPrice: price,
        type: 'base'
      });
      baseNet += price;
    }

    // 3. Monthly Development Plan
    let devNet = 0;
    let selectedDevRadio = null;
    elements.devRadios.forEach(radio => {
      if (radio.checked) selectedDevRadio = radio;
    });

    if (selectedDevRadio) {
      const devPrice = parseFloat(selectedDevRadio.dataset.price || '0');
      const devHours = parseInt(selectedDevRadio.dataset.hours || '0', 10);
      const devRate = parseInt(selectedDevRadio.dataset.rate || '0', 10);

      if (devPrice > 0) {
        monthlyItems.push({
          id: 'dev_plan',
          name: `Dalszy rozwój: Pakiet ${devHours} godzin`,
          sub: `${devRate} zł/h netto · Niewykorzystane godziny przechodzą na kolejny miesiąc`,
          netPrice: devPrice,
          type: 'dev'
        });
        devNet += devPrice;
      }
    }

    // 4. Extra ad-hoc hours
    let extraHoursNet = 0;
    const adhocHours = parseInt(elements.extraAdhocHours ? elements.extraAdhocHours.value : '0', 10) || 0;
    if (adhocHours > 0) {
      const rate = 200;
      extraHoursNet = adhocHours * rate;
      monthlyItems.push({
        id: 'extra_hours',
        name: `Dodatkowe godziny doraźne (${adhocHours} h)`,
        sub: `${rate} zł/godz. netto · Rozliczane po wcześniejszym uzgodnieniu`,
        netPrice: extraHoursNet,
        type: 'adhoc'
      });
    }

    // 5. Google Workspace
    let workspaceNet = 0;
    if (elements.toggleWorkspace && elements.toggleWorkspace.checked) {
      const accountsCount = parseInt(elements.workspaceAccountsRange ? elements.workspaceAccountsRange.value : '9', 10) || 9;
      const ratePerAccount = parseFloat(elements.workspaceAccountsRange.dataset.costPerAccount || '35');
      workspaceNet = accountsCount * ratePerAccount;
      monthlyItems.push({
        id: 'workspace',
        name: `Poczta Google Workspace (${accountsCount} kont)`,
        sub: `Średnio ${ratePerAccount} zł/konto/mies. netto (plan 30–40 zł/m.)`,
        netPrice: workspaceNet,
        type: 'workspace'
      });
    }

    // Totals
    const monthlyNet = baseNet + devNet + extraHoursNet + workspaceNet;
    const monthlyVat = monthlyNet * CONFIG.vatRate;
    const monthlyGross = monthlyNet + monthlyVat;

    const onetimeVat = onetimeNet * CONFIG.vatRate;
    const onetimeGross = onetimeNet + onetimeVat;

    // TCO 1st Year estimate:
    // Onetime + (12 * monthly)
    const tcoNet = onetimeNet + (12 * monthlyNet);
    const tcoVat = tcoNet * CONFIG.vatRate;
    const tcoGross = tcoNet + tcoVat;

    return {
      isGross,
      onetimeItems,
      onetimeNet,
      onetimeVat,
      onetimeGross,
      onetimeDisplay: isGross ? onetimeGross : onetimeNet,

      baseNet,
      monthlyItems,
      monthlyNet,
      monthlyVat,
      monthlyGross,
      monthlyDisplay: isGross ? monthlyGross : monthlyNet,

      adhocHours,
      tcoNet,
      tcoVat,
      tcoGross,
      tcoDisplay: isGross ? tcoGross : tcoNet
    };
  }

  // --- Render Function ---
  function render() {
    const calc = calculate();
    const isGross = state.isGross;

    // 1. Update Mode Indicators & Headers
    if (elements.summaryTaxIndicator) {
      elements.summaryTaxIndicator.textContent = isGross ? 'BRUTTO (Z 23% VAT)' : 'NETTO';
    }

    // Update tax toggle buttons
    if (elements.taxToggleNet && elements.taxToggleGross) {
      elements.taxToggleNet.classList.toggle('active', !isGross);
      elements.taxToggleNet.setAttribute('aria-pressed', !isGross);
      elements.taxToggleGross.classList.toggle('active', isGross);
      elements.taxToggleGross.setAttribute('aria-pressed', isGross);
    }

    // 2. Update dynamic inline price tags across cards
    document.querySelectorAll('[data-amount-net]').forEach(el => {
      const netVal = parseFloat(el.dataset.amountNet || '0');
      const period = el.dataset.period;
      let displayPrice = formatMoney(netVal, isGross);
      if (period === 'jednorazowo') {
        el.textContent = displayPrice;
      } else {
        el.textContent = `${displayPrice}/m.`;
      }
    });

    // 3. Update Base Bundle Total
    if (elements.baseBundleTotal) {
      elements.baseBundleTotal.textContent = `${formatMoney(calc.baseNet, isGross)}/m.`;
    }

    // 4. Update Ad-hoc range label
    if (elements.extraHoursDisplay && elements.extraAdhocHours) {
      const hrs = parseInt(elements.extraAdhocHours.value, 10);
      const val = hrs * 200;
      elements.extraHoursDisplay.textContent = `${hrs} godz. (${formatMoney(val, isGross)})`;
    }

    // 5. Update Workspace range label & visibility
    if (elements.workspacePanel && elements.toggleWorkspace) {
      if (elements.toggleWorkspace.checked) {
        elements.workspacePanel.classList.remove('collapsed');
      } else {
        elements.workspacePanel.classList.add('collapsed');
      }
    }

    if (elements.workspaceAccountsDisplay && elements.workspaceAccountsRange) {
      const count = parseInt(elements.workspaceAccountsRange.value, 10);
      const cost = count * 35;
      elements.workspaceAccountsDisplay.textContent = `${count} kont (${formatMoney(cost, isGross)}/m.)`;
    }

    // 6. Update Hero Values in Summary Sidebar
    if (elements.totalOnetimeDisplay) {
      elements.totalOnetimeDisplay.textContent = formatMoney(calc.onetimeNet, isGross);
    }
    if (elements.onetimeSubtext) {
      const parts = [];
      if (elements.optPilot && elements.optPilot.checked) parts.push('Pilotaż (3 tys. zł)');
      if (elements.optSetupFee && elements.optSetupFee.checked) parts.push('Setup Fee (3 tys. zł)');
      elements.onetimeSubtext.textContent = parts.length > 0 ? parts.join(' + ') : 'Brak opłat startowych';
    }

    if (elements.totalMonthlyDisplay) {
      elements.totalMonthlyDisplay.innerHTML = `${formatMoney(calc.monthlyNet, isGross)}<small>/m.</small>`;
    }
    if (elements.monthlySubtext) {
      const baseFormatted = formatMoney(calc.baseNet, false).replace(',00', '');
      const parts = [`Baza (${baseFormatted})`];
      
      const checkedDev = document.querySelector('input[name="dev_plan"]:checked');
      if (checkedDev && checkedDev.value !== '0') {
        parts.push(`Rozwój ${checkedDev.value}h`);
      }
      if (calc.adhocHours > 0) {
        parts.push(`+${calc.adhocHours}h`);
      }
      if (elements.toggleWorkspace && elements.toggleWorkspace.checked) {
        parts.push('Poczta');
      }
      elements.monthlySubtext.textContent = calc.monthlyNet > 0 ? parts.join(' + ') : 'Brak stałego abonamentu';
    }

    // 7. Update Net / VAT / Gross Monthly Breakdown Table
    if (elements.summaryNetMonthly) {
      elements.summaryNetMonthly.textContent = currencyFormatter.format(calc.monthlyNet);
    }
    if (elements.summaryVatMonthly) {
      elements.summaryVatMonthly.textContent = currencyFormatter.format(calc.monthlyVat);
    }
    if (elements.summaryGrossMonthly) {
      elements.summaryGrossMonthly.textContent = currencyFormatter.format(calc.monthlyGross);
    }

    // 8. Update Itemized Breakdown
    if (elements.breakdownList) {
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
        html += `<li class="breakdown-category">🔄 Stały abonament miesięczny (od 2027 r.)</li>`;
        calc.monthlyItems.forEach(item => {
          html += `
            <li class="breakdown-item">
              <div>
                <div class="breakdown-item-name">${escapeHtml(item.name)}</div>
                <div class="breakdown-item-sub">${escapeHtml(item.sub)}</div>
              </div>
              <div class="breakdown-item-price">${formatMoney(item.netPrice, isGross)}/m.</div>
            </li>
          `;
        });
      }

      if (calc.onetimeItems.length === 0 && calc.monthlyItems.length === 0) {
        html = `<li class="breakdown-empty">Brak zaznaczonych pozycji w wycenie.</li>`;
      }

      elements.breakdownList.innerHTML = html;
    }

    // 9. Update TCO (Total Cost of Ownership)
    if (elements.tcoTotal) {
      elements.tcoTotal.textContent = formatMoney(calc.tcoNet, isGross);
    }
    if (elements.tcoNote) {
      elements.tcoNote.textContent = `Obejmuje: Start (${formatMoney(calc.onetimeNet, isGross)}) + 12 miesięcy stałej obsługi (${formatMoney(calc.monthlyNet * 12, isGross)}).`;
    }

    // 10. Check and update active Preset Pill
    updateActivePresetIndicator();
  }

  // --- Presets Handler ---
  function applyPreset(presetName) {
    if (presetName === 'recommended') {
      // Pilotaż (3000) + Setup (3000) + Baza (1450) + Rozwój 20h (3200) = 4650 zł/m.
      if (elements.optPilot) elements.optPilot.checked = true;
      if (elements.optSetupFee) elements.optSetupFee.checked = true;
      if (elements.optSupervision) elements.optSupervision.checked = true;
      if (elements.optCms) elements.optCms.checked = true;
      if (elements.optVps) elements.optVps.checked = true;
      if (elements.optDomains) elements.optDomains.checked = true;
      
      const devRadio20 = document.getElementById('dev-plan-20');
      if (devRadio20) devRadio20.checked = true;

      if (elements.extraAdhocHours) elements.extraAdhocHours.value = 0;
      if (elements.toggleWorkspace) elements.toggleWorkspace.checked = false;
      showToast('Włączono wariant: Rekomendowany (Baza + 20h)');
    } else if (presetName === 'balanced') {
      // Pilotaż (3000) + Setup (3000) + Baza (1450) + Rozwój 10h (1700) = 3150 zł/m.
      if (elements.optPilot) elements.optPilot.checked = true;
      if (elements.optSetupFee) elements.optSetupFee.checked = true;
      if (elements.optSupervision) elements.optSupervision.checked = true;
      if (elements.optCms) elements.optCms.checked = true;
      if (elements.optVps) elements.optVps.checked = true;
      if (elements.optDomains) elements.optDomains.checked = true;

      const devRadio10 = document.getElementById('dev-plan-10');
      if (devRadio10) devRadio10.checked = true;

      if (elements.extraAdhocHours) elements.extraAdhocHours.value = 0;
      if (elements.toggleWorkspace) elements.toggleWorkspace.checked = false;
      showToast('Włączono wariant: Zrównoważony (Baza + 10h)');
    } else if (presetName === 'base') {
      // Baza (1450) bez rozwoju
      if (elements.optPilot) elements.optPilot.checked = true;
      if (elements.optSetupFee) elements.optSetupFee.checked = true;
      if (elements.optSupervision) elements.optSupervision.checked = true;
      if (elements.optCms) elements.optCms.checked = true;
      if (elements.optVps) elements.optVps.checked = true;
      if (elements.optDomains) elements.optDomains.checked = true;

      const devRadio0 = document.getElementById('dev-plan-0');
      if (devRadio0) devRadio0.checked = true;

      if (elements.extraAdhocHours) elements.extraAdhocHours.value = 0;
      if (elements.toggleWorkspace) elements.toggleWorkspace.checked = false;
      showToast('Włączono wariant: Sama Baza (1 450 zł/m.)');
    } else if (presetName === 'pilot-only') {
      // Tylko pilotaż (3000 zł)
      if (elements.optPilot) elements.optPilot.checked = true;
      if (elements.optSetupFee) elements.optSetupFee.checked = false;
      if (elements.optSupervision) elements.optSupervision.checked = false;
      if (elements.optCms) elements.optCms.checked = false;
      if (elements.optVps) elements.optVps.checked = false;
      if (elements.optDomains) elements.optDomains.checked = false;

      const devRadio0 = document.getElementById('dev-plan-0');
      if (devRadio0) devRadio0.checked = true;

      if (elements.extraAdhocHours) elements.extraAdhocHours.value = 0;
      if (elements.toggleWorkspace) elements.toggleWorkspace.checked = false;
      showToast('Włączono wariant: Tylko Pilotaż Munji (3 000 zł)');
    }

    render();
  }

  function updateActivePresetIndicator() {
    const isPilot = elements.optPilot && elements.optPilot.checked;
    const isSetup = elements.optSetupFee && elements.optSetupFee.checked;
    const isSup = elements.optSupervision && elements.optSupervision.checked;
    const isCms = elements.optCms && elements.optCms.checked;
    const isVps = elements.optVps && elements.optVps.checked;
    const isDom = elements.optDomains && elements.optDomains.checked;
    const isAllBase = isSup && isCms && isVps && isDom;
    const devChecked = document.querySelector('input[name="dev_plan"]:checked')?.value;
    const extraHours = parseInt(elements.extraAdhocHours?.value || '0', 10);
    const workspaceOn = elements.toggleWorkspace && elements.toggleWorkspace.checked;

    let matchingPreset = null;

    if (isPilot && isSetup && isAllBase && devChecked === '20' && extraHours === 0 && !workspaceOn) {
      matchingPreset = 'recommended';
    } else if (isPilot && isSetup && isAllBase && devChecked === '10' && extraHours === 0 && !workspaceOn) {
      matchingPreset = 'balanced';
    } else if (isPilot && isSetup && isAllBase && devChecked === '0' && extraHours === 0 && !workspaceOn) {
      matchingPreset = 'base';
    } else if (isPilot && !isSetup && !isSup && !isCms && !isVps && !isDom && devChecked === '0' && extraHours === 0 && !workspaceOn) {
      matchingPreset = 'pilot-only';
    }

    elements.presetPills.forEach(pill => {
      if (pill.dataset.preset === matchingPreset) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // --- Summary Generator for Email / Clipboard ---
  function generateTextSummary() {
    const calc = calculate();
    const dateStr = new Date().toLocaleDateString(CONFIG.locale);

    let text = `==============================================================\n`;
    text += `MUNJA · BAILA WARSAW · NINE’S RESTAURANT & SPORTS BAR\n`;
    text += `SZACUNEK KOSZTÓW WSPÓŁPRACY TECHNICZNEJ\n`;
    text += `Data: ${dateStr} · Kalkulator: https://munja-kalkulator.wesolowski.dev\n`;
    text += `Wszystkie kwoty netto (+ 23% VAT) | Waluta: PLN\n`;
    text += `==============================================================\n\n`;

    // 1. Onetime
    if (calc.onetimeItems.length > 0) {
      text += `1. KOSZTY JEDNORAZOWE NA START:\n`;
      calc.onetimeItems.forEach(item => {
        const netStr = currencyFormatter.format(item.netPrice);
        const grossStr = currencyFormatter.format(item.netPrice * (1 + CONFIG.vatRate));
        text += `   • ${item.name}\n`;
        text += `     Wartość: ${netStr} netto (${grossStr} brutto)\n`;
        text += `     Zakres: ${item.sub}\n\n`;
      });
      text += `   --> SUMA JEDNORAZOWO NA START: ${currencyFormatter.format(calc.onetimeNet)} netto (${currencyFormatter.format(calc.onetimeGross)} brutto)\n`;
      text += `--------------------------------------------------------------\n\n`;
    }

    // 2. Monthly
    if (calc.monthlyItems.length > 0) {
      text += `2. STAŁA OBSŁUGA MIESIĘCZNA (od stycznia 2027 r.):\n`;
      
      const baseItems = calc.monthlyItems.filter(i => i.type === 'base');
      if (baseItems.length > 0) {
        text += `   A. Baza infrastrukturalno-techniczna (ryczałt: ${currencyFormatter.format(calc.baseNet)} netto/mies.):\n`;
        baseItems.forEach(item => {
          text += `      - ${item.name} (${currencyFormatter.format(item.netPrice)} netto)\n`;
        });
      }

      const devItem = calc.monthlyItems.find(i => i.type === 'dev');
      if (devItem) {
        text += `   B. Pula godzin dalszego rozwoju:\n`;
        text += `      - ${devItem.name} (${currencyFormatter.format(devItem.netPrice)} netto/mies.)\n`;
        text += `        (Niewykorzystane godziny przechodzą na kolejny miesiąc)\n`;
      }

      const adhocItem = calc.monthlyItems.find(i => i.type === 'adhoc');
      if (adhocItem) {
        text += `   C. Zlecenia doraźne:\n`;
        text += `      - ${adhocItem.name} (${currencyFormatter.format(adhocItem.netPrice)} netto/mies.)\n`;
      }

      const wsItem = calc.monthlyItems.find(i => i.type === 'workspace');
      if (wsItem) {
        text += `   D. Poczta Google Workspace:\n`;
        text += `      - ${wsItem.name} (${currencyFormatter.format(wsItem.netPrice)} netto/mies.)\n`;
      }

      text += `\n   --> SUMA MIESIĘCZNIE: ${currencyFormatter.format(calc.monthlyNet)} netto/mies. (${currencyFormatter.format(calc.monthlyGross)} brutto/mies.)\n`;
      text += `--------------------------------------------------------------\n\n`;
    }

    // 3. TCO
    text += `3. SZACUNEK I ROKU WSPÓŁPRACY (TCO 2026/2027):\n`;
    text += `   Razem szacunek: ${currencyFormatter.format(calc.tcoNet)} netto (${currencyFormatter.format(calc.tcoGross)} brutto)\n`;
    text += `   (Obejmuje: Start [${currencyFormatter.format(calc.onetimeNet)} netto] + 12 miesięcy stałej opieki)\n\n`;

    text += `==============================================================\n`;
    text += `GŁÓWNE ZASADY OFERTY:\n`;
    text += `• Pilotaż Munji (20h za 3 000 zł) zamawiany jest jako niezależny etap startowy.\n`;
    text += `• Nadzór, CMS i koszty infrastruktury startują najwcześniej od stycznia 2027 r.\n`;
    text += `• Po pilotażu zostanie przedstawiona wiążąca wycena końcowa i konsolidacja w ryczałt.\n`;
    text += `• Konsolidacja 5 domen w modelu hurtowym zdejmuje ryzyko corocznych skoków cen.\n`;
    text += `==============================================================\n`;

    return text;
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

  // --- Event Listeners ---
  function initListeners() {
    // Form change / input
    if (elements.form) {
      elements.form.addEventListener('input', render);
      elements.form.addEventListener('change', render);
    }

    // Tax Mode Toggles (Net / Gross)
    if (elements.taxToggleNet) {
      elements.taxToggleNet.addEventListener('click', () => {
        state.isGross = false;
        render();
        showToast('Widok cen: NETTO');
      });
    }

    if (elements.taxToggleGross) {
      elements.taxToggleGross.addEventListener('click', () => {
        state.isGross = true;
        render();
        showToast('Widok cen: BRUTTO (+23% VAT)');
      });
    }

    // Preset Buttons
    elements.presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const preset = pill.dataset.preset;
        if (preset) {
          applyPreset(preset);
        }
      });
    });

    // Reset Button
    if (elements.btnReset) {
      elements.btnReset.addEventListener('click', () => {
        applyPreset('recommended');
      });
    }

    // Copy Summary Button
    if (elements.btnCopy) {
      elements.btnCopy.addEventListener('click', async () => {
        const text = generateTextSummary();
        try {
          await navigator.clipboard.writeText(text);
          showToast('Podsumowanie skopiowane do schowka!');
        } catch (err) {
          // Fallback textarea
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

    // Print Button
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
