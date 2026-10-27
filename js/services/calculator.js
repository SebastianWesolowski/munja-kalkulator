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

  // 2. Setup Fee (zależne od wybranych elementów bazy: VPS 2000 zł, Domeny 1000 zł)
  let setupNet = 0;
  const setupParts = [];

  if (values.setupFee) {
    const hasVps = Boolean(values.vps);
    const hasDomains = Boolean(values.domains);

    if (hasVps) {
      setupNet += OFFER_DATA.setup.vpsPriceNet;
      setupParts.push(`Dedykowany VPS (${formatMoney(OFFER_DATA.setup.vpsPriceNet, isGross, { trimZero: true })})`);
    }

    if (hasDomains) {
      setupNet += OFFER_DATA.setup.domainsPriceNet;
      setupParts.push(`Pakiet domen (${formatMoney(OFFER_DATA.setup.domainsPriceNet, isGross, { trimZero: true })})`);
    }

    if (setupNet > 0) {
      const partsText = setupParts.join(' + ');
      onetimeItems.push({
        id: OFFER_DATA.setup.id,
        name: OFFER_DATA.setup.name,
        sub: `Wdrożenie: ${partsText}`,
        netPrice: setupNet,
        setupParts
      });
      onetimeNet += setupNet;
    }
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
      sub: `${rateFormatted}/h ${taxLabel} · Niewykorzystane godziny przechodzą na kolejny miesiąc`,
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

  // Onetime totals
  const onetimeVat = onetimeNet * CONFIG.vatRate;
  const onetimeGross = onetimeNet + onetimeVat;

  // First Year TCO estimate: Start + (12 * monthly)
  const tcoNet = onetimeNet + (12 * monthlyNet);
  const tcoVat = tcoNet * CONFIG.vatRate;
  const tcoGross = tcoNet + tcoVat;

  return {
    isGross,
    onetimeItems,
    onetimeNet,
    onetimeVat,
    onetimeGross,
    onetimeDisplay: isGross ? onetimeGross : onetimeNet,
    setupNet,

    baseNet,
    monthlyItems,
    monthlyNet,
    monthlyVat,
    monthlyGross,
    monthlyDisplay: isGross ? monthlyGross : monthlyNet,

    adhocHours,
    adhocNet: extraHoursNet,
    workspaceNet,
    workspaceAccounts: accountsCount,
    tcoNet,
    tcoVat,
    tcoGross,
    tcoDisplay: isGross ? tcoGross : tcoNet
  };
}
