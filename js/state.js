/**
 * Application State Store
 */

const state = {
  isGross: false // false = Netto, true = Brutto (+23% VAT)
};

const listeners = new Set();

/**
 * Subscribe to state changes
 * @param {Function} callback
 * @returns {Function} Unsubscribe function
 */
export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notify() {
  for (const listener of listeners) {
    listener(getState());
  }
}

/**
 * Get current application state
 * @returns {Object} Clone of state
 */
export function getState() {
  return { ...state };
}

/**
 * Check if current view is Gross (Brutto)
 * @returns {boolean}
 */
export function isGross() {
  return state.isGross;
}

/**
 * Set Tax Presentation Mode
 * @param {boolean} value - true for Gross (Brutto), false for Net (Netto)
 */
export function setTaxMode(value) {
  if (state.isGross !== value) {
    state.isGross = Boolean(value);
    notify();
  }
}
