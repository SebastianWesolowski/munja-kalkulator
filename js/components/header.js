/**
 * Component: Site Header & Tax Toggle Controller
 */

import { showToast } from './toast.js';

let toggleNetBtn = null;
let toggleGrossBtn = null;

/**
 * Initialize header controls
 * @param {Function} onTaxModeChange - Callback with (isGross)
 */
export function initHeader(onTaxModeChange) {
  toggleNetBtn = document.getElementById('tax-toggle-net');
  toggleGrossBtn = document.getElementById('tax-toggle-gross');

  if (toggleNetBtn) {
    toggleNetBtn.addEventListener('click', () => {
      onTaxModeChange(false);
      showToast('Widok cen: NETTO');
    });
  }

  if (toggleGrossBtn) {
    toggleGrossBtn.addEventListener('click', () => {
      onTaxModeChange(true);
      showToast('Widok cen: BRUTTO (+23% VAT)');
    });
  }
}

/**
 * Update header tax toggle buttons UI
 * @param {boolean} isGross
 */
export function updateHeaderTaxMode(isGross) {
  if (toggleNetBtn) {
    toggleNetBtn.classList.toggle('active', !isGross);
    toggleNetBtn.setAttribute('aria-pressed', String(!isGross));
  }
  if (toggleGrossBtn) {
    toggleGrossBtn.classList.toggle('active', isGross);
    toggleGrossBtn.setAttribute('aria-pressed', String(isGross));
  }
}
