/**
 * Component: Strategic Variants & Presets Cards Grid (Ścieżki rozwoju grupy)
 */

import { PRESETS, PRESET_CARDS } from '../data/offer-data.js';
import { formatMoney } from '../config.js';
import { showToast } from './toast.js';

let presetElements = [];

/**
 * Generate Header markup for the Presets Component
 * @returns {string}
 */
export function createPresetsHeaderHtml() {
  return `
    <div class="presets-header">
      <div class="presets-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span>Ścieżki rozwoju grupy</span>
      </div>
      <h2 class="presets-heading">Wybierz strategiczny wariant współpracy</h2>
      <p class="presets-subheading">Kliknij wariant, aby wczytać pełną ścieżkę do symulatora. Każdy profil odpowiada konkretnemu etapowi i dynamice rozwoju grupy.</p>
    </div>
  `;
}

/**
 * Generate HTML markup for a single preset card button
 * @param {Object} card - Card data from PRESET_CARDS
 * @returns {string}
 */
export function createPresetCardHtml(card) {
  const highlightClass = card.highlighted ? ' highlighted-preset' : '';
  const badgeClass = card.badgeClass ? ` ${card.badgeClass}` : '';
  const suffixAttr = card.priceSuffix ? ` data-suffix="${card.priceSuffix}"` : '';
  const initialPriceText = `${formatMoney(card.priceNet, false, { trimZero: true })}${card.priceSuffix}`;

  const stepsHtml = card.steps.map(step => `
    <div class="path-step">
      <span class="step-dot">${step.dot}</span>
      <span>${step.html}</span>
    </div>
  `).join('');

  return `
    <button type="button" class="preset-card${highlightClass}" id="preset-${card.id}" data-preset="${card.id}">
      <div class="preset-card-header">
        <div class="preset-card-title-wrap">
          <span class="preset-card-tag${badgeClass}">${card.badgeTag}</span>
          <h3 class="preset-card-title">${card.title}</h3>
        </div>
        <div class="preset-card-price">
          <span class="preset-price-label">${card.priceLabel}</span>
          <strong class="preset-price-val" data-amount-net="${card.priceNet}"${suffixAttr}>${initialPriceText}</strong>
          <span class="preset-price-evolution">${card.priceEvolutionHtml}</span>
        </div>
      </div>
      <div class="preset-card-body">
        <p class="preset-card-target">
          <strong>Dla kogo:</strong> ${card.target}
        </p>
        <div class="preset-path-steps">
          ${stepsHtml}
        </div>
      </div>
    </button>
  `;
}

/**
 * Render complete Presets component into container
 * @param {HTMLElement} [container] - Target container element
 */
export function renderPresets(container) {
  const target = container || document.getElementById('presets-section');
  if (!target) return;

  const headerHtml = createPresetsHeaderHtml();
  const cardsHtml = PRESET_CARDS.map(card => createPresetCardHtml(card)).join('');

  target.innerHTML = `
    ${headerHtml}
    <div class="presets-cards-grid" role="group" aria-label="Warianty współpracy">
      ${cardsHtml}
    </div>
  `;
}

/**
 * Initialize preset cards and buttons
 * @param {Function} onSelectPreset - Callback with (presetId)
 * @param {HTMLElement} [container] - Target container element
 */
export function initPresets(onSelectPreset, container) {
  const target = container || document.getElementById('presets-section');
  if (target && !target.querySelector('.presets-cards-grid')) {
    renderPresets(target);
  }

  presetElements = Array.from(document.querySelectorAll('.preset-card, .preset-pill'));

  presetElements.forEach(el => {
    el.addEventListener('click', () => {
      const presetId = el.dataset.preset;
      if (presetId && PRESETS[presetId]) {
        onSelectPreset(presetId);
        showToast(`Włączono wariant: ${PRESETS[presetId].name}`);
      }
    });
  });
}

/**
 * Determine which preset matches current form values and update active class
 * @param {Object} values - Current form values
 */
export function updateActivePresetIndicator(values) {
  const isPilot = Boolean(values.pilot);
  const isSetup = Boolean(values.setupFee);
  const isAllBase = Boolean(values.supervision && values.cms && values.vps && values.domains);
  const devPlan = values.devPlan;
  const extraHours = parseInt(values.extraHours || '0', 10);
  const workspaceOn = Boolean(values.workspace);

  let matchingPreset = null;

  if (isPilot && isSetup && isAllBase && devPlan === '20' && extraHours === 0 && !workspaceOn) {
    matchingPreset = 'recommended';
  } else if (isPilot && isSetup && isAllBase && devPlan === '10' && extraHours === 0 && !workspaceOn) {
    matchingPreset = 'balanced';
  } else if (isPilot && isSetup && isAllBase && devPlan === '0' && extraHours === 0 && !workspaceOn) {
    matchingPreset = 'base';
  } else if (isPilot && !isSetup && !values.supervision && !values.cms && !values.vps && !values.domains && devPlan === '0' && extraHours === 0 && !workspaceOn) {
    matchingPreset = 'pilot-only';
  }

  presetElements.forEach(el => {
    if (el.dataset.preset === matchingPreset) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
