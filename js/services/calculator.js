/**
 * Financial Calculation Service
 */

import { CONFIG, formatMoney, getTaxLabel } from '../config.js';
import { OFFER_DATA } from '../data/offer-data.js';

/**
 * Calculates complete offer financials from input values
 * @param {Object} values - Current form input values
 * @param {boolean} isGross - Whether to calculate gross values
 * @returns {Object} Comprehensive calculation result
 */
export function calculateOffer(values, isGross = false) {
  const taxLabel = getTaxLabel(isGross);
  const onetimeItems = [];
  let onetimeNet = 0;

  // 1. Pilotaż Munji
  if (values.pilot) {
    onetimeItems.push({
      id: OFFER_DATA.pilot.id,
      name: OFFER_DATA.pilot.name,
      sub: OFFER_DATA.pilot.sub,
      netPrice: OFFER_DATA.pilot.priceNet
    });
    onetimeNet += OFFER_DATA.pilot.priceNet;
  }

  // 2. Przeniesienie i uruchomienie infrastruktury (jednolita kwota 3 000 zł)
  let setupNet = 0;

  if (values.setupFee) {
    setupNet = OFFER_DATA.setup.priceNet;
    onetimeItems.push({
      id: OFFER_DATA.setup.id,
      name: OFFER_DATA.setup.name,
      sub: OFFER_DATA.setup.sub,
      netPrice: setupNet
    });
    onetimeNet += setupNet;
  }

  // 3. Monthly items
  const monthlyItems = [];
  let baseNet = 0;

  // 3A. Base Items
  if (values.supervision) {
    const item = OFFER_DATA.baseItems.supervision;
    monthlyItems.push({ id: item.id, name: item.name, sub: item.sub, netPrice: item.priceNet, type: 'base' });
    baseNet += item.priceNet;
  }

  if (values.cms) {
    const item = OFFER_DATA.baseItems.cms;
    monthlyItems.push({ id: item.id, name: item.name, sub: item.sub, netPrice: item.priceNet, type: 'base' });
    baseNet += item.priceNet;
  }

  if (values.vps) {
    const item = OFFER_DATA.baseItems.vps;
    monthlyItems.push({ id: item.id, name: item.name, sub: item.sub, netPrice: item.priceNet, type: 'base' });
    baseNet += item.priceNet;
  }

  if (values.domains) {
    const item = OFFER_DATA.baseItems.domains;
    monthlyItems.push({ id: item.id, name: item.name, sub: item.sub, netPrice: item.priceNet, type: 'base' });
    baseNet += item.priceNet;
  }

  // 3B. Development Plan
  let devNet = 0;
  const devPlan = OFFER_DATA.devPlans[values.devPlan] || OFFER_DATA.devPlans['0'];
  if (devPlan && devPlan.priceNet > 0) {
    const rateFormatted = formatMoney(devPlan.rateNet, isGross, { trimZero: true });
    monthlyItems.push({
      id: 'dev_plan',
      name: devPlan.name,
      sub: `${rateFormatted}/h ${taxLabel} · Niewykorzystane godziny rozwoju można wykorzystać do 6 miesięcy w przód od miesiąca, którego dotyczą`,
      netPrice: devPlan.priceNet,
      type: 'dev'
    });
    devNet += devPlan.priceNet;
  }

  // 3C. Extra Ad-hoc Hours
  let extraHoursNet = 0;
  const adhocHours = parseInt(values.extraHours || '0', 10) || 0;
  if (adhocHours > 0) {
    extraHoursNet = adhocHours * OFFER_DATA.adhocRate;
    const rateFormatted = formatMoney(OFFER_DATA.adhocRate, isGross, { trimZero: true });
    monthlyItems.push({
      id: 'extra_hours',
      name: `Dodatkowe godziny doraźne (${adhocHours} h)`,
      sub: `${rateFormatted}/godz. ${taxLabel} · Rozliczane po wcześniejszym uzgodnieniu`,
      netPrice: extraHoursNet,
      type: 'adhoc'
    });
  }

  // 3D. Google Workspace
  let workspaceNet = 0;
  const accountsCount = parseInt(values.workspaceAccounts || '9', 10) || 9;
  if (values.workspace) {
    workspaceNet = accountsCount * OFFER_DATA.workspaceCostPerAccount;
    const costFormatted = formatMoney(OFFER_DATA.workspaceCostPerAccount, isGross, { trimZero: true });
    const minFormatted = formatMoney(30, isGross, { trimZero: true });
    const maxFormatted = formatMoney(40, isGross, { trimZero: true });
    monthlyItems.push({
      id: 'workspace',
      name: `Poczta Google Workspace (${accountsCount} kont)`,
      sub: `Średnio ${costFormatted}/konto/mies. ${taxLabel} (plan ${minFormatted}–${maxFormatted}/mies.)`,
      netPrice: workspaceNet,
      type: 'workspace'
    });
  }

  // Monthly totals
  const monthlyNet = baseNet + devNet + extraHoursNet + workspaceNet;
  const monthlyVat = monthlyNet * CONFIG.vatRate;
  const monthlyGross = monthlyNet + monthlyVat;

  // Work hours calculation
  const supervisionHours = values.supervision ? 9 : 0;
  const cmsHours = values.cms ? 9 : 0;
  const devHours = devPlan ? devPlan.hours : 0;
  const totalMonthlyHours = supervisionHours + cmsHours + devHours + adhocHours;

  const hourlyRateNet = totalMonthlyHours > 0 ? (monthlyNet / totalMonthlyHours) : 0;
  const hourlyRateGross = totalMonthlyHours > 0 ? (monthlyGross / totalMonthlyHours) : 0;

  // Transition to 10h development after initial 2-3 months (if 20h plan selected)
  const hasTransition = values.devPlan === '20';
  let transitionMonthlyNet = 0;
  let transitionMonthlyVat = 0;
  let transitionMonthlyGross = 0;
  let transitionHours = 0;
  let transitionHourlyRateNet = 0;
  let transitionHourlyRateGross = 0;
  let transitionSavingsNet = 0;
  let transitionSavingsGross = 0;

  if (hasTransition) {
    const devPlan10 = OFFER_DATA.devPlans['10'];
    transitionMonthlyNet = baseNet + devPlan10.priceNet + extraHoursNet + workspaceNet;
    transitionMonthlyVat = transitionMonthlyNet * CONFIG.vatRate;
    transitionMonthlyGross = transitionMonthlyNet + transitionMonthlyVat;
    transitionHours = supervisionHours + cmsHours + 10 + adhocHours;
    transitionHourlyRateNet = transitionHours > 0 ? (transitionMonthlyNet / transitionHours) : 0;
    transitionHourlyRateGross = transitionHours > 0 ? (transitionMonthlyGross / transitionHours) : 0;
    transitionSavingsNet = monthlyNet - transitionMonthlyNet;
    transitionSavingsGross = monthlyGross - transitionMonthlyGross;
  }

  // Onetime totals
  const onetimeVat = onetimeNet * CONFIG.vatRate;
  const onetimeGross = onetimeNet + onetimeVat;
  const pilotNet = values.pilot ? OFFER_DATA.pilot.priceNet : 0;

  // First Year TCO estimate:
  // If transition active: Onetime + 3 months initial + 9 months transitioned
  // Else: Onetime + 12 * monthly
  const tcoNet = hasTransition
    ? (onetimeNet + (3 * monthlyNet) + (9 * transitionMonthlyNet))
    : (onetimeNet + (12 * monthlyNet));
  const tcoVat = tcoNet * CONFIG.vatRate;
  const tcoGross = tcoNet + tcoVat;

  return {
    isGross,

    // Onetime blocks
    hasPilot: !!values.pilot,
    hasSetup: !!values.setupFee,
    pilotNet,
    pilotVat: pilotNet * CONFIG.vatRate,
    pilotGross: pilotNet * (1 + CONFIG.vatRate),
    setupNet,
    setupVat: setupNet * CONFIG.vatRate,
    setupGross: setupNet * (1 + CONFIG.vatRate),
    onetimeItems,
    onetimeNet,
    onetimeVat,
    onetimeGross,
    onetimeDisplay: isGross ? onetimeGross : onetimeNet,

    // Monthly
    baseNet,
    monthlyItems,
    monthlyNet,
    monthlyVat,
    monthlyGross,
    monthlyDisplay: isGross ? monthlyGross : monthlyNet,

    // Hours & Rates
    supervisionHours,
    cmsHours,
    devHours,
    adhocHours,
    totalMonthlyHours,
    hourlyRateNet,
    hourlyRateGross,
    hourlyRateDisplay: isGross ? hourlyRateGross : hourlyRateNet,

    // Transition (Miesiące 1–3 vs Od 4. miesiąca)
    hasTransition,
    transitionMonthlyNet,
    transitionMonthlyVat,
    transitionMonthlyGross,
    transitionMonthlyDisplay: isGross ? transitionMonthlyGross : transitionMonthlyNet,
    transitionHours,
    transitionHourlyRateNet,
    transitionHourlyRateGross,
    transitionHourlyRateDisplay: isGross ? transitionHourlyRateGross : transitionHourlyRateNet,
    transitionSavingsNet,
    transitionSavingsGross,
    transitionSavingsDisplay: isGross ? transitionSavingsGross : transitionSavingsNet,

    adhocNet: extraHoursNet,
    workspaceNet,
    workspaceAccounts: accountsCount,

    // TCO
    tcoNet,
    tcoVat,
    tcoGross,
    tcoDisplay: isGross ? tcoGross : tcoNet
  };
}
