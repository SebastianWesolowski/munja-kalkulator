/**
 * Application Configuration & Formatting Utilities
 */

export const CONFIG = {
  vatRate: 0.23, // 23% VAT
  currency: 'PLN',
  locale: 'pl-PL'
};

// Standard currency formatter
export const currencyFormatter = new Intl.NumberFormat(CONFIG.locale, {
  style: 'currency',
  currency: CONFIG.currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

/**
 * Format money with optional Gross (+23% VAT) calculation
 * @param {number} amount - Net amount in PLN
 * @param {boolean} isGross - Whether to calculate and display gross amount
 * @returns {string} Formatted currency string
 */
export function formatMoney(amount, isGross = false) {
  const finalAmount = isGross ? amount * (1 + CONFIG.vatRate) : amount;
  return currencyFormatter.format(finalAmount);
}

/**
 * Escape string for safe HTML injection
 * @param {string} str - Raw string
 * @returns {string} Sanitized HTML string
 */
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
