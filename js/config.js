/**
 * Application Configuration & Formatting Utilities
 */

export const CONFIG = {
  vatRate: 0.23, // 23% VAT
  currency: 'PLN',
  locale: 'pl-PL'
};

const rawCurrencyFormatter = new Intl.NumberFormat(CONFIG.locale, {
  style: 'currency',
  currency: CONFIG.currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

// Standard currency formatter (with guaranteed thousand space and non-breaking spaces)
export const currencyFormatter = {
  format(amount) {
    const raw = rawCurrencyFormatter.format(amount);
    return raw
      .replace(/(\d)(?=(\d{3})+(?:[,.]\d+)?(?:\s| )*(?:zł|PLN))/g, '$1\u00A0')
      .replace(/[\s\u202F]+/g, '\u00A0');
  }
};

/**
 * Format money with optional Gross (+23% VAT) calculation
 * @param {number} amount - Net amount in PLN
 * @param {boolean} isGross - Whether to calculate and display gross amount
 * @param {Object} [options] - Formatting options
 * @param {boolean} [options.trimZero=false] - If true, remove decimals when whole number (.00)
 * @returns {string} Formatted currency string
 */
export function formatMoney(amount, isGross = false, options = {}) {
  const { trimZero = false } = options;
  const finalAmount = isGross ? amount * (1 + CONFIG.vatRate) : amount;
  const rounded = Math.round((finalAmount + Number.EPSILON) * 100) / 100;

  let formatted;
  if (trimZero && rounded % 1 === 0) {
    const intFormatter = new Intl.NumberFormat(CONFIG.locale, {
      style: 'currency',
      currency: CONFIG.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    formatted = intFormatter.format(rounded);
  } else {
    formatted = currencyFormatter.format(rounded);
  }

  // Ensure thousand separator space exists if missing and all spaces are non-breaking (\u00A0)
  formatted = formatted.replace(/(\d)(?=(\d{3})+(?:[,.]\d+)?(?:\s| )*(?:zł|PLN))/g, '$1\u00A0');
  return formatted.replace(/[\s\u202F]+/g, '\u00A0');
}

/**
 * Get tax label in lowercase or uppercase
 * @param {boolean} isGross
 * @returns {string}
 */
export function getTaxLabel(isGross) {
  return isGross ? 'brutto' : 'netto';
}


/**
 * Escape string for safe HTML injection (Universal, zero DOM allocations)
 * @param {string} str - Raw string
 * @returns {string} Sanitized HTML string
 */
export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
