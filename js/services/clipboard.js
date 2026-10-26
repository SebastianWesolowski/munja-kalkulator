/**
 * Clipboard & Email Offer Formatter Service
 */

import { CONFIG, currencyFormatter } from '../config.js';

/**
 * Generate formatted text summary of offer for email pasting
 * @param {Object} calc - Calculation result
 * @returns {string} Formatted text
 */
export function generateOfferText(calc) {
  const dateStr = new Date().toLocaleDateString(CONFIG.locale);

  let text = `==============================================================\n`;
  text += `MUNJA · BAILA WARSAW · NINE’S RESTAURANT & SPORTS BAR\n`;
  text += `SZACUNEK KOSZTÓW WSPÓŁPRACY TECHNICZNEJ\n`;
  text += `Data: ${dateStr} · Kalkulator: https://munja-kalkulator.wesolowski.dev\n`;
  text += `Wszystkie kwoty netto (+ 23% VAT) | Waluta: PLN\n`;
  text += `==============================================================\n\n`;

  // 1. Onetime
  if (calc.onetimeItems.length > 0) {
    text += `1. KOSZTY JEDNORAZOWE NA START:\n`;
    calc.onetimeItems.forEach(item => {
      const netStr = currencyFormatter.format(item.netPrice);
      const grossStr = currencyFormatter.format(item.netPrice * (1 + CONFIG.vatRate));
      text += `   • ${item.name}\n`;
      text += `     Wartość: ${netStr} netto (${grossStr} brutto)\n`;
      text += `     Zakres: ${item.sub}\n\n`;
    });
    text += `   --> SUMA JEDNORAZOWO NA START: ${currencyFormatter.format(calc.onetimeNet)} netto (${currencyFormatter.format(calc.onetimeGross)} brutto)\n`;
    text += `--------------------------------------------------------------\n\n`;
  }

  // 2. Monthly
  if (calc.monthlyItems.length > 0) {
    text += `2. STAŁA OBSŁUGA MIESIĘCZNA (od stycznia 2027 r.):\n`;
    
    const baseItems = calc.monthlyItems.filter(i => i.type === 'base');
    if (baseItems.length > 0) {
      text += `   A. Baza infrastrukturalno-techniczna (ryczałt: ${currencyFormatter.format(calc.baseNet)} netto/mies.):\n`;
      baseItems.forEach(item => {
        text += `      - ${item.name} (${currencyFormatter.format(item.netPrice)} netto)\n`;
      });
    }

    const devItem = calc.monthlyItems.find(i => i.type === 'dev');
    if (devItem) {
      text += `   B. Pula godzin dalszego rozwoju:\n`;
      text += `      - ${devItem.name} (${currencyFormatter.format(devItem.netPrice)} netto/mies.)\n`;
      text += `        (Niewykorzystane godziny przechodzą na kolejny miesiąc)\n`;
    }

    const adhocItem = calc.monthlyItems.find(i => i.type === 'adhoc');
    if (adhocItem) {
      text += `   C. Zlecenia doraźne:\n`;
      text += `      - ${adhocItem.name} (${currencyFormatter.format(adhocItem.netPrice)} netto/mies.)\n`;
    }

    const wsItem = calc.monthlyItems.find(i => i.type === 'workspace');
    if (wsItem) {
      text += `   D. Poczta Google Workspace:\n`;
      text += `      - ${wsItem.name} (${currencyFormatter.format(wsItem.netPrice)} netto/mies.)\n`;
    }

    text += `\n   --> SUMA MIESIĘCZNIE: ${currencyFormatter.format(calc.monthlyNet)} netto/mies. (${currencyFormatter.format(calc.monthlyGross)} brutto/mies.)\n`;
    text += `--------------------------------------------------------------\n\n`;
  }

  // 3. TCO
  text += `3. SZACUNEK I ROKU WSPÓŁPRACY (TCO 2026/2027):\n`;
  text += `   Razem szacunek: ${currencyFormatter.format(calc.tcoNet)} netto (${currencyFormatter.format(calc.tcoGross)} brutto)\n`;
  text += `   (Obejmuje: Start [${currencyFormatter.format(calc.onetimeNet)} netto] + 12 miesięcy stałej opieki)\n\n`;

  text += `==============================================================\n`;
  text += `GŁÓWNE ZASADY OFERTY:\n`;
  text += `• Pilotaż Munji (4 000 zł) zamawiany jest jako niezależny etap startowy (szybkie usprawnienia: formularz, wideo, analityka/RODO).\n`;
  text += `• Nadzór, CMS i koszty infrastruktury startują najwcześniej od stycznia 2027 r.\n`;
  text += `• Po pilotażu zostanie przedstawiona wiążąca wycena końcowa i konsolidacja w ryczałt.\n`;
  text += `• Konsolidacja 5 domen w modelu hurtowym zdejmuje ryzyko corocznych skoków cen.\n`;
  text += `==============================================================\n`;

  return text;
}

/**
 * Copy text to user clipboard with legacy fallback
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    throw new Error('Clipboard API unavailable');
  } catch (err) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}
