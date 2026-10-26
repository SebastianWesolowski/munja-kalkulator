/**
 * Component: Presets Toolbar Controller
 */

import { PRESETS } from '../data/offer-data.js';
import { showToast } from './toast.js';

let presetPills = [];

/**
 * Initialize preset pill buttons
 * @param {Function} onSelectPreset - Callback with (presetId)
 */
export function initPresets(onSelectPreset) {
  presetPills = Array.from(document.querySelectorAll('.preset-pill'));

  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const presetId = pill.dataset.preset;
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

  presetPills.forEach(pill => {
    if (pill.dataset.preset === matchingPreset) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
}
