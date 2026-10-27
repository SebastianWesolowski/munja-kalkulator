/**
 * Component: Sticky Mobile Bottom Bar (Najniższa cena miesięczna)
 */

import { formatMoney } from '../config.js';

let barElement = null;
let infoContainer = null;
let actionBtn = null;
let actionBtnText = null;
let actionBtnIcon = null;

let isPastSummary = false;

/**
 * Smoothly scroll to summary card or back to top
 */
function scrollToTarget() {
  const summaryEl = document.getElementById('calc-summary-column');
  const mainEl = document.getElementById('main-content');

  if (isPastSummary && mainEl) {
    mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (summaryEl) {
    summaryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Check if the user has scrolled down into the summary section
 */
function updateButtonState(past) {
  if (!actionBtnText || !actionBtnIcon) return;
  if (past !== isPastSummary) {
    isPastSummary = past;
    if (isPastSummary) {
      actionBtnText.textContent = 'Do góry';
      actionBtnIcon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
      actionBtn.setAttribute('aria-label', 'Przewiń do początku formularza');
    } else {
      actionBtnText.textContent = 'Podsumowanie';
      actionBtnIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
      actionBtn.setAttribute('aria-label', 'Przejdź do pełnego podsumowania wyceny');
    }
  }
}

/**
 * Initialize Mobile Bottom Bar
 */
export function initMobileBar() {
  barElement = document.getElementById('mobile-bottom-bar');
  infoContainer = document.getElementById('mobile-bar-info');
  actionBtn = document.getElementById('mobile-bar-btn');

  if (actionBtn) {
    actionBtnText = actionBtn.querySelector('.mobile-btn-text');
    actionBtnIcon = actionBtn.querySelector('.mobile-btn-icon');
  }

  if (infoContainer) {
    infoContainer.addEventListener('click', () => {
      scrollToTarget();
    });
  }

  if (actionBtn) {
    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      scrollToTarget();
    });
  }

  // High-performance IntersectionObserver (Zero forced reflow, 0 main-thread scroll overhead)
  const summaryEl = document.getElementById('calc-summary-column');
  if ('IntersectionObserver' in window && summaryEl) {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const past = entry.isIntersecting || entry.boundingClientRect.top < 220;
        updateButtonState(past);
      },
      {
        rootMargin: '-200px 0px 0px 0px',
        threshold: [0, 0.1, 0.5]
      }
    );
    observer.observe(summaryEl);
  }
}

/**
 * Update the mobile bottom bar with current calculation and tax mode
 * @param {Object} calc - Calculation result from calculateOffer
 * @param {Object} values - Current form values
 * @param {boolean} isGross - Whether in gross mode
 */
export function updateMobileBar(calc, values, isGross) {
  if (!infoContainer) return;

  const taxLabel = isGross ? 'brutto' : 'netto';

  if (calc.monthlyNet === 0) {
    // 0 zł stałego abonamentu (Wariant: Tylko Pilotaż)
    infoContainer.innerHTML = `
      <div class="mobile-bar-tag-row">
        <span class="mobile-bar-phase-badge default-phase">0 zł stałych opłat</span>
        <span class="mobile-bar-note">Tylko pilotaż Munji</span>
      </div>
      <div class="mobile-bar-price-wrap">
        <span class="mobile-bar-price-val">${formatMoney(0, isGross)}</span>
        <span class="mobile-bar-suffix">/mies.</span>
        <span class="mobile-bar-tax-badge">${taxLabel}</span>
      </div>
    `;
  } else if (calc.hasTransition) {
    // 2-fazowy abonament (Miesiące 1–3 -> Od 4. miesiąca)
    // Prezentujemy najniższą cenę za miesiąc (cena od 4. miesiąca, z uwagą że to już od 3. miesiąca)
    const targetPriceFormatted = formatMoney(calc.transitionMonthlyDisplay, isGross);

    infoContainer.innerHTML = `
      <div class="mobile-bar-tag-row">
        <span class="mobile-bar-phase-badge">Od 4. miesiąca</span>
        <span class="mobile-bar-note">(już od 3. miesiąca)</span>
      </div>
      <div class="mobile-bar-price-wrap">
        <span class="mobile-bar-price-val">${targetPriceFormatted}</span>
        <span class="mobile-bar-suffix">/mies.</span>
        <span class="mobile-bar-tax-badge">${taxLabel}</span>
      </div>
    `;
  } else {
    // Stała jednofazowa kwota abonamentu (np. wariant 10h lub 0h bez pilotażu)
    const monthlyPriceFormatted = formatMoney(calc.monthlyDisplay, isGross);

    infoContainer.innerHTML = `
      <div class="mobile-bar-tag-row">
        <span class="mobile-bar-phase-badge default-phase">Stały abonament</span>
        <span class="mobile-bar-note">od 1. dnia umowy</span>
      </div>
      <div class="mobile-bar-price-wrap">
        <span class="mobile-bar-price-val">${monthlyPriceFormatted}</span>
        <span class="mobile-bar-suffix">/mies.</span>
        <span class="mobile-bar-tax-badge">${taxLabel}</span>
      </div>
    `;
  }
}
