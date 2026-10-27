/**
 * Component: Summary Card & Cost Breakdown Controller (Symulator Oferty)
 */

import { formatMoney, escapeHtml, currencyFormatter } from '../config.js';
import { showToast } from './toast.js';

let summaryTaxIndicator = null;
let blockPilot = null;
let pilotPriceDisplay = null;
let blockSetup = null;
let setupPriceDisplay = null;
let blockOnetimeEmpty = null;
let onetimeTotalBadge = null;
let monthlyDynamicContent = null;
let summaryNetMonthly = null;
let summaryVatMonthly = null;
let summaryGrossMonthly = null;
let taxBanner = null;
let breakdownList = null;
let btnCopy = null;
let btnPrint = null;
let summaryLegal = null;

let currentCalc = null;

/**
 * Generate semantic HTML markup for the Summary Card (Symulator Oferty)
 * @returns {string}
 */
export function createSummaryCardHtml() {
  return `
    <div class="card summary-card sticky-card">
      <div class="summary-header">
        <div class="summary-header-top">
          <span class="summary-eyebrow">Symulator Oferty</span>
          <span class="badge-mode-indicator" id="summary-tax-indicator">NETTO</span>
        </div>
        <h2 class="summary-title">Podsumowanie Kosztów</h2>
      </div>

      <!-- SEKCJA 1: OPŁATY JEDNORAZOWE (ODDZIELNE KLOCUSZKI) -->
      <div class="summary-section onetime-section" id="onetime-section">
        <div class="section-title-row">
          <span class="section-eyebrow">Opłaty jednorazowe</span>
          <span class="section-badge" id="onetime-total-badge">Razem: 7 000,00 zł</span>
        </div>

        <div class="onetime-blocks-grid" id="onetime-blocks-grid">
          <!-- Klocuszek 1: Pilotaż Munji -->
          <div class="summary-block onetime-block" id="block-pilot">
            <div class="block-top">
              <span class="block-tag badge-tag-pilot">Opłata jednorazowa</span>
              <span class="block-timing">Listopad / Grudzień 2026</span>
            </div>
            <h3 class="block-title">Krok 2: Pilotaż Munji</h3>
            <div class="block-price-val" id="pilot-price-display">4 000,00 zł</div>
            <div class="block-chips">
              <span class="chip-item">~25h pracy</span>
              <span class="chip-item">Szybkie usprawnienia</span>
            </div>
            <p class="block-subtext">Formularz rezerwacji na telefonach, odciążenie multimediów, zgody cookie / RODO.</p>
          </div>

          <!-- Klocuszek 2: Nowa infrastruktura -->
          <div class="summary-block onetime-block" id="block-setup">
            <div class="block-top">
              <span class="block-tag badge-tag-setup">Opłata jednorazowa</span>
              <span class="block-timing">W styczniu 2027 r.</span>
            </div>
            <h3 class="block-title">Krok 4: Nowa infrastruktura</h3>
            <div class="block-price-val" id="setup-price-display">3 000,00 zł</div>
            <div class="block-chips">
              <span class="chip-item">Migracja 3 stron</span>
              <span class="chip-item">5 domen grupy</span>
            </div>
            <p class="block-subtext">Dedykowany serwer VPS, transfer domen, zabezpieczenia poczty (po audycie w Kroku 3).</p>
          </div>

          <!-- Komunikat gdy brak opłat jednorazowych -->
          <div class="onetime-empty-card hidden" id="block-onetime-empty">
            Brak opłat jednorazowych w wybranej konfiguracji.
          </div>
        </div>
      </div>

      <!-- SEKCJA 2: STAŁY ABONAMENT MIESIĘCZNY -->
      <div class="summary-section monthly-section" id="monthly-section">
        <div class="section-title-row">
          <span class="section-eyebrow">Stały abonament miesięczny</span>
          <span class="section-timing-badge">od stycznia 2027 r.</span>
        </div>

        <div class="monthly-dynamic-content" id="monthly-dynamic-content">
          <!-- Renderowane dynamicznie przez renderSummary w summary.js -->
        </div>
      </div>

      <!-- SEKCJA 3: PODSUMOWANIE PODATKU VAT -->
      <div class="summary-tax-banner" id="tax-banner">
        <div class="tax-line">
          <span>Razem netto miesięcznie:</span>
          <strong id="summary-net-monthly">4 650,00 zł</strong>
        </div>
        <div class="tax-line">
          <span>Podatek VAT (23%):</span>
          <span id="summary-vat-monthly">1 069,50 zł</span>
        </div>
        <div class="tax-line total-line">
          <span>Razem brutto miesięcznie:</span>
          <strong id="summary-gross-monthly">5 719,50 zł</strong>
        </div>
      </div>

      <!-- SEKCJA 4: SKŁADNIKI WYCENY -->
      <div class="breakdown-wrapper">
        <h3 class="breakdown-heading">Składniki wyceny</h3>
        <ul class="breakdown-list" id="breakdown-list">
          <!-- Dynamicznie wypełniane przez JS -->
        </ul>
      </div>

      <!-- SEKCJA 5: PRZYCISKI AKCJI -->
      <div class="summary-actions">
        <button type="button" id="btn-copy-summary" class="btn btn-primary btn-block">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Kopiuj wycenę do maila</span>
        </button>

        <button type="button" id="btn-print-summary" class="btn btn-outline btn-block">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          <span>Drukuj / Zapisz jako PDF</span>
        </button>
      </div>

      <p class="summary-legal" id="summary-legal-note">
        Wszystkie ceny w ofercie są kwotami netto (+23% VAT). Pilotaż zamawiany jest osobno. Docelowe stawki stałej opieki doprecyzujemy po pilotażu i zbadaniu zaplecza.
      </p>
    </div>
  `;
}

/**
 * Render the summary card HTML markup into target container
 * @param {HTMLElement} container
 */
export function renderSummaryCard(container) {
  if (!container) return;
  container.innerHTML = createSummaryCardHtml();
}

/**
 * Initialize summary card action buttons and render component if needed
 * @param {HTMLElement|null} [container]
 */
export function initSummary(container) {
  const targetContainer = container || document.getElementById('calc-summary-column');
  if (targetContainer && !targetContainer.querySelector('.summary-card')) {
    renderSummaryCard(targetContainer);
  }

  summaryTaxIndicator = document.getElementById('summary-tax-indicator');
  blockPilot = document.getElementById('block-pilot');
  pilotPriceDisplay = document.getElementById('pilot-price-display');
  blockSetup = document.getElementById('block-setup');
  setupPriceDisplay = document.getElementById('setup-price-display');
  blockOnetimeEmpty = document.getElementById('block-onetime-empty');
  onetimeTotalBadge = document.getElementById('onetime-total-badge');
  monthlyDynamicContent = document.getElementById('monthly-dynamic-content');
  summaryNetMonthly = document.getElementById('summary-net-monthly');
  summaryVatMonthly = document.getElementById('summary-vat-monthly');
  summaryGrossMonthly = document.getElementById('summary-gross-monthly');
  taxBanner = document.getElementById('tax-banner');
  breakdownList = document.getElementById('breakdown-list');
  btnCopy = document.getElementById('btn-copy-summary');
  btnPrint = document.getElementById('btn-print-summary');
  summaryLegal = document.getElementById('summary-legal-note');

  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      if (!currentCalc) return;
      try {
        const { generateOfferText, copyToClipboard } = await import('../services/clipboard.js');
        const text = generateOfferText(currentCalc);
        const ok = await copyToClipboard(text);
        if (ok) {
          showToast('Podsumowanie skopiowane do schowka!');
        }
      } catch (err) {
        console.error('Błąd kopiowania do schowka:', err);
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

  // 1. Mode badge
  if (summaryTaxIndicator) {
    summaryTaxIndicator.textContent = isGross ? 'BRUTTO (+23% VAT)' : 'NETTO';
  }

  // 2. Onetime Blocks (Pilotaż Munji & Nowa infrastruktura)
  if (blockPilot && pilotPriceDisplay) {
    blockPilot.classList.toggle('hidden', !calc.hasPilot);
    pilotPriceDisplay.textContent = formatMoney(calc.pilotNet, isGross);
  }

  if (blockSetup && setupPriceDisplay) {
    blockSetup.classList.toggle('hidden', !calc.hasSetup);
    setupPriceDisplay.textContent = formatMoney(calc.setupNet, isGross);
  }

  if (blockOnetimeEmpty) {
    blockOnetimeEmpty.classList.toggle('hidden', calc.hasPilot || calc.hasSetup);
  }

  if (onetimeTotalBadge) {
    if (calc.hasPilot && calc.hasSetup) {
      onetimeTotalBadge.textContent = `Razem opłaty jednorazowe: ${formatMoney(calc.onetimeNet, isGross)}`;
    } else if (calc.hasPilot) {
      onetimeTotalBadge.textContent = `Pilotaż: ${formatMoney(calc.pilotNet, isGross)}`;
    } else if (calc.hasSetup) {
      onetimeTotalBadge.textContent = `Infrastruktura: ${formatMoney(calc.setupNet, isGross)}`;
    } else {
      onetimeTotalBadge.textContent = '0 zł opłat jednorazowych';
    }
  }

  // 3. Monthly Blocks with Periods, Hours, and Average Hourly Rate
  if (monthlyDynamicContent) {
    if (calc.monthlyNet === 0) {
      // 0 zł monthly (Tylko Pilotaż)
      monthlyDynamicContent.innerHTML = `
        <div class="summary-subcard monthly-zero-card">
          <div class="subcard-header">
            <span class="subcard-tag">Stały abonament</span>
            <span class="badge-zero-pill">0 zł stałych opłat</span>
          </div>
          <div class="subcard-price-wrap">
            <div class="block-price-val">0,00 zł<small>/mies.</small></div>
          </div>
          <p class="subcard-desc">
            W wariancie pilotażowym nie ponosisz opłat abonamentowych ani kosztów infrastruktury. Decyzję o przejęciu serwerów i stałej opiece podejmujecie po sprawdzeniu rezultatów pilotażu.
          </p>
        </div>
      `;
    } else if (calc.hasTransition) {
      // 2-Phase Transition (Miesiące 1–3 -> Od 4. miesiąca)
      const initialPriceFormatted = formatMoney(calc.monthlyNet, isGross);
      const initialHourlyRateFormatted = formatMoney(Math.round(calc.hourlyRateDisplay), isGross, { trimZero: true });
      const transitionPriceFormatted = formatMoney(calc.transitionMonthlyNet, isGross);
      const transitionHourlyRateFormatted = formatMoney(Math.round(calc.transitionHourlyRateDisplay), isGross, { trimZero: true });
      const savingsFormatted = formatMoney(calc.transitionSavingsDisplay, isGross, { trimZero: true });

      monthlyDynamicContent.innerHTML = `
        <div class="monthly-phases-container">
          <!-- Faza 1: Miesiące 1–3 -->
          <div class="summary-subcard monthly-phase-card phase-initial">
            <div class="subcard-header">
              <span class="subcard-tag phase-tag-start">Miesiące 1–3</span>
              <span class="badge-rec-pill">Intensywne wdrożenia</span>
            </div>
            <div class="phase-title">Pakiet 20h rozwoju + Baza technologiczna</div>
            <div class="phase-price-wrap">
              <div class="hero-value accent-value">${initialPriceFormatted}<small>/mies.</small></div>
            </div>

            <!-- Godziny pracy i średnia stawka -->
            <div class="work-metrics-box">
              <div class="metric-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div class="metric-col">
                  <span class="metric-label">Godziny pracy IT:</span>
                  <strong class="metric-value">${calc.totalMonthlyHours} h / mies.</strong>
                </div>
              </div>
              <div class="metric-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <div class="metric-col">
                  <span class="metric-label">Średnia stawka za h:</span>
                  <strong class="metric-value">~${initialHourlyRateFormatted} / h</strong>
                </div>
              </div>
            </div>

            <p class="phase-subtext">
              Nadzór (9h) + CMS (do 9h) + Rozwój (20h) + Dedykowany VPS i 5 domen grupy.
            </p>
          </div>

          <!-- Przejście ze strzałką informacyjną -->
          <div class="transition-banner">
            <div class="transition-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="7 13 12 18 17 13"></polyline>
                <polyline points="7 6 12 11 17 6"></polyline>
              </svg>
            </div>
            <div class="transition-text">
              <strong>Naturalne przejście po zrealizowaniu priorytetów:</strong>
              <span>Po uporządkowaniu zaległości w pierwszych 3 miesiącach, następuje przejście na stały tryb 10h rozwoju:</span>
            </div>
          </div>

          <!-- Faza 2: Od 4. miesiąca -->
          <div class="summary-subcard monthly-phase-card phase-transitioned">
            <div class="subcard-header">
              <span class="subcard-tag phase-tag-target">Od 4. miesiąca</span>
              <span class="badge-savings-pill">Niższa kwota (-${savingsFormatted}/mies.)</span>
            </div>
            <div class="phase-title">Docelowy stały rozwój (10h) + Baza</div>
            <div class="phase-price-wrap">
              <div class="hero-value text-success">${transitionPriceFormatted}<small>/mies.</small></div>
            </div>

            <!-- Godziny pracy i średnia stawka po przejściu -->
            <div class="work-metrics-box">
              <div class="metric-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div class="metric-col">
                  <span class="metric-label">Godziny pracy IT:</span>
                  <strong class="metric-value">${calc.transitionHours} h / mies.</strong>
                </div>
              </div>
              <div class="metric-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <div class="metric-col">
                  <span class="metric-label">Średnia stawka za h:</span>
                  <strong class="metric-value">~${transitionHourlyRateFormatted} / h</strong>
                </div>
              </div>
            </div>

            <p class="phase-subtext">
              Nadzór (9h) + CMS (do 9h) + Rozwój (10h) + Dedykowany VPS i 5 domen grupy. Niewykorzystane godziny rozwoju przechodzą do 6 miesięcy w przód!
            </p>
          </div>
        </div>
      `;
    } else {
      // Single monthly configuration (e.g. 10h plan or 0h base)
      const monthlyPriceFormatted = formatMoney(calc.monthlyNet, isGross);
      const hourlyRateFormatted = formatMoney(Math.round(calc.hourlyRateDisplay), isGross, { trimZero: true });
      const devItem = calc.monthlyItems.find(i => i.type === 'dev');
      const devText = devItem ? ` + ${devItem.name}` : ' (tylko nadzór i CMS)';

      monthlyDynamicContent.innerHTML = `
        <div class="summary-subcard monthly-single-card">
          <div class="subcard-header">
            <span class="subcard-tag phase-tag-target">Stały abonament</span>
            <span class="subcard-time-pill">Od 1. dnia stałej umowy</span>
          </div>
          <div class="phase-title">Baza technologiczna${escapeHtml(devText)}</div>
          <div class="phase-price-wrap">
            <div class="hero-value accent-value">${monthlyPriceFormatted}<small>/mies.</small></div>
          </div>

          <!-- Godziny pracy i średnia stawka -->
          <div class="work-metrics-box">
            <div class="metric-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <div class="metric-col">
                <span class="metric-label">Godziny pracy IT:</span>
                <strong class="metric-value">${calc.totalMonthlyHours} h / mies.</strong>
              </div>
            </div>
            <div class="metric-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              <div class="metric-col">
                <span class="metric-label">Średnia stawka za h:</span>
                <strong class="metric-value">~${hourlyRateFormatted} / h</strong>
              </div>
            </div>
          </div>

          <p class="phase-subtext">
            ${calc.devHours > 0
              ? 'Przewidywalny, stały budżet od pierwszego miesiąca. Niewykorzystane godziny rozwoju przechodzą do 6 miesięcy w przód.'
              : 'Opieka bazowa nad stabilnością i obsługa CMS. Zmiany programistyczne rozliczane wyłącznie doraźnie (200 zł/h).'}
          </p>
        </div>
      `;
    }
  }

  // 4. Tax Table
  if (summaryNetMonthly) {
    summaryNetMonthly.textContent = currencyFormatter.format(calc.monthlyNet);
  }
  if (summaryVatMonthly) {
    summaryVatMonthly.textContent = currencyFormatter.format(calc.monthlyVat);
  }
  if (summaryGrossMonthly) {
    summaryGrossMonthly.textContent = currencyFormatter.format(calc.monthlyGross);
  }

  if (taxBanner) {
    taxBanner.classList.toggle('mode-gross', isGross);
    taxBanner.classList.toggle('mode-net', !isGross);
  }

  // 5. Itemized Breakdown List
  if (breakdownList) {
    let html = '';

    if (calc.onetimeItems.length > 0) {
      html += `<li class="breakdown-category">🚀 Opłaty jednorazowe</li>`;
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
      html += `<li class="breakdown-category">🔄 Stały abonament miesięczny (od stycznia 2027)</li>`;
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

      html += `
        <li class="breakdown-item breakdown-included-item">
          <div>
            <div class="breakdown-item-name">W cenie abonamentu: Dokumentacja i dedykowany kontakt</div>
            <div class="breakdown-item-sub">Dokumentacja wykonanych prac, problemów i spraw wymagających Waszej decyzji jest w cenie. Otrzymujecie pełną transparentność i jedną osobę do kontaktu technicznego dla całej grupy.</div>
          </div>
          <div class="breakdown-item-price"><span class="badge-included">W cenie</span></div>
        </li>
      `;
    }

    if (calc.onetimeItems.length === 0 && calc.monthlyItems.length === 0) {
      html = `<li class="breakdown-empty">Brak zaznaczonych pozycji w wycenie.</li>`;
    }

    breakdownList.innerHTML = html;
  }

  // 6. Legal Note
  if (summaryLegal) {
    summaryLegal.textContent = isGross
      ? 'Wszystkie kwoty w wycenie są wartościami brutto (zawierają 23% VAT). Pilotaż zamawiany jest osobno. Docelowe stawki stałej opieki doprecyzujemy po pilotażu i zbadaniu zaplecza.'
      : 'Wszystkie kwoty w wycenie są wartościami netto (+23% VAT). Pilotaż zamawiany jest osobno. Docelowe stawki stałej opieki doprecyzujemy po pilotażu i zbadaniu zaplecza.';
  }
}
