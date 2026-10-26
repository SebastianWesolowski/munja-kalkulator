/**
 * Component: Calculator Form & Steps Controller
 */

import { formatMoney } from '../config.js';
import { PRESETS } from '../data/offer-data.js';

let formElement = null;
let btnReset = null;

// Form inputs
let optPilot = null;
let optSetupFee = null;
let optSupervision = null;
let optCms = null;
let optVps = null;
let optDomains = null;
let devRadios = [];
let extraAdhocHours = null;
let extraHoursDisplay = null;
let toggleWorkspace = null;
let workspacePanel = null;
let workspaceAccountsRange = null;
let workspaceAccountsDisplay = null;
let baseBundleTotal = null;

/**
 * Initialize form listeners and references
 * @param {Function} onFormChange - Callback when form values change
 */
export function initForm(onFormChange) {
  formElement = document.getElementById('offer-calc-form');
  btnReset = document.getElementById('btn-reset');

  optPilot = document.getElementById('opt-pilot');
  optSetupFee = document.getElementById('opt-setup-fee');
  optSupervision = document.getElementById('opt-supervision');
  optCms = document.getElementById('opt-cms');
  optVps = document.getElementById('opt-vps');
  optDomains = document.getElementById('opt-domains');
  devRadios = Array.from(document.querySelectorAll('input[name="dev_plan"]'));
  extraAdhocHours = document.getElementById('extra-adhoc-hours');
  extraHoursDisplay = document.getElementById('extra-hours-display');
  toggleWorkspace = document.getElementById('toggle-workspace');
  workspacePanel = document.getElementById('workspace-config-panel');
  workspaceAccountsRange = document.getElementById('workspace-accounts-range');
  workspaceAccountsDisplay = document.getElementById('workspace-accounts-display');
  baseBundleTotal = document.getElementById('base-bundle-total');

  if (formElement) {
    formElement.addEventListener('input', () => onFormChange());
    formElement.addEventListener('change', () => onFormChange());
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      applyPresetValues('recommended');
      onFormChange();
    });
  }
}

/**
 * Get current form values as an object
 * @returns {Object}
 */
export function getFormValues() {
  let devPlan = '20';
  for (const radio of devRadios) {
    if (radio.checked) {
      devPlan = radio.value;
      break;
    }
  }

  return {
    pilot: Boolean(optPilot?.checked),
    setupFee: Boolean(optSetupFee?.checked),
    supervision: Boolean(optSupervision?.checked),
    cms: Boolean(optCms?.checked),
    vps: Boolean(optVps?.checked),
    domains: Boolean(optDomains?.checked),
    devPlan,
    extraHours: parseInt(extraAdhocHours?.value || '0', 10),
    workspace: Boolean(toggleWorkspace?.checked),
    workspaceAccounts: parseInt(workspaceAccountsRange?.value || '9', 10)
  };
}

/**
 * Apply preset configuration to the form inputs
 * @param {string} presetId - Preset key ('recommended', 'balanced', etc.)
 */
export function applyPresetValues(presetId) {
  const preset = PRESETS[presetId];
  if (!preset) return;

  if (optPilot) optPilot.checked = preset.pilot;
  if (optSetupFee) optSetupFee.checked = preset.setupFee;
  if (optSupervision) optSupervision.checked = preset.supervision;
  if (optCms) optCms.checked = preset.cms;
  if (optVps) optVps.checked = preset.vps;
  if (optDomains) optDomains.checked = preset.domains;

  const targetRadio = document.querySelector(`input[name="dev_plan"][value="${preset.devPlan}"]`);
  if (targetRadio) targetRadio.checked = true;

  if (extraAdhocHours) extraAdhocHours.value = preset.extraHours;
  if (toggleWorkspace) toggleWorkspace.checked = preset.workspace;
}

/**
 * Update inline prices and slider labels based on tax mode and values
 * @param {Object} values - Current form values
 * @param {Object} calc - Calculation result
 * @param {boolean} isGross - Whether in gross mode
 */
export function updateFormUI(values, calc, isGross) {
  // Update all [data-amount-net] tags across cards
  document.querySelectorAll('[data-amount-net]').forEach(el => {
    const netVal = parseFloat(el.dataset.amountNet || '0');
    const period = el.dataset.period;
    const displayPrice = formatMoney(netVal, isGross);
    el.textContent = period === 'jednorazowo' ? displayPrice : `${displayPrice}/m.`;
  });

  // Base bundle badge total
  if (baseBundleTotal) {
    baseBundleTotal.textContent = `${formatMoney(calc.baseNet, isGross)}/m.`;
  }

  // Extra hours slider live value
  if (extraHoursDisplay && extraAdhocHours) {
    const hrs = parseInt(extraAdhocHours.value, 10);
    const val = hrs * 200;
    extraHoursDisplay.textContent = `${hrs} godz. (${formatMoney(val, isGross)})`;
  }

  // Workspace panel visibility & accounts live value
  if (workspacePanel && toggleWorkspace) {
    workspacePanel.classList.toggle('collapsed', !toggleWorkspace.checked);
  }

  if (workspaceAccountsDisplay && workspaceAccountsRange) {
    const count = parseInt(workspaceAccountsRange.value, 10);
    const cost = count * 35;
    workspaceAccountsDisplay.textContent = `${count} kont (${formatMoney(cost, isGross)}/m.)`;
  }
}
