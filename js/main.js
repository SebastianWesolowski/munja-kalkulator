/**
 * Munja · Baila Warsaw · NINE’s Restaurant & Sports Bar
 * Kalkulator Oferty — Main Application Entry Point
 */

import { subscribe, getState, setTaxMode, isGross } from './state.js';
import { calculateOffer } from './services/calculator.js';
import { initHeader, updateHeaderTaxMode } from './components/header.js';
import { initPresets, updateActivePresetIndicator } from './components/presets.js';
import { initForm, getFormValues, applyPresetValues, updateFormUI } from './components/form.js';
import { initSummary, renderSummary } from './components/summary.js';
import { initMobileBar, updateMobileBar } from './components/mobile-bar.js';

/**
 * Re-calculate and render the full application UI
 */
export function updateApp() {
  const values = getFormValues();
  const grossMode = isGross();
  const calc = calculateOffer(values, grossMode);

  // 1. Update header controls
  updateHeaderTaxMode(grossMode);

  // 2. Update form inline labels & dynamic prices
  updateFormUI(values, calc, grossMode);

  // 3. Update summary card
  renderSummary(calc, values, grossMode);

  // 4. Update preset pill active indicator
  updateActivePresetIndicator(values);

  // 5. Update mobile bottom bar
  updateMobileBar(calc, values, grossMode);
}

/**
 * Bootstrap the application
 */
export function initApp() {
  // 1. Initialize Header
  initHeader((newGrossState) => {
    setTaxMode(newGrossState);
  });

  // 2. Initialize Presets Toolbar
  initPresets((presetId) => {
    applyPresetValues(presetId);
    updateApp();
  });

  // 3. Initialize Form & Steps
  initForm(() => {
    updateApp();
  });

  // 4. Initialize Summary actions (copy, print)
  initSummary();

  // 5. Initialize Mobile Bottom Bar
  initMobileBar();

  // 6. Subscribe to state changes (Tax mode Netto / Brutto)
  subscribe(() => {
    updateApp();
  });

  // Initial render
  updateApp();
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Register high-performance Service Worker on HTTPS or production hosts
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
