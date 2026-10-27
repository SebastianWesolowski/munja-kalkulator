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
    text += `1. OPŁATY JEDNORAZOWE:\n`;
    if (calc.hasPilot) {
      const netStr = currencyFormatter.format(calc.pilotNet);
      const grossStr = currencyFormatter.format(calc.pilotGross);
      text += `   • Krok 2: Pilotaż Munji\n`;
      text += `     Wartość: ${netStr} netto (${grossStr} brutto)\n`;
      text += `     Termin: Listopad / Grudzień 2026 r. (~25 godzin pracy)\n`;
      text += `     Zakres: Szybkie usprawnienia (formularz rezerwacji na telefonach, odciążenie multimediów, zgody cookie / RODO)\n\n`;
    }
    if (calc.hasSetup) {
      const netStr = currencyFormatter.format(calc.setupNet);
      const grossStr = currencyFormatter.format(calc.setupGross);
      text += `   • Krok 4: Nowa infrastruktura\n`;
      text += `     Wartość: ${netStr} netto (${grossStr} brutto)\n`;
      text += `     Termin: Od stycznia 2027 r. (po audycie w Kroku 3)\n`;
      text += `     Zakres: Przygotowanie dedykowanego VPS, migracja 3 stron, transfer 5 domen i konfiguracja poczty\n\n`;
    }
    text += `   --> RAZEM OPŁATY JEDNORAZOWE: ${currencyFormatter.format(calc.onetimeNet)} netto (${currencyFormatter.format(calc.onetimeGross)} brutto)\n`;
    text += `--------------------------------------------------------------\n\n`;
  }

  // 2. Monthly
  if (calc.monthlyItems.length > 0) {
    text += `2. STAŁY ABONAMENT MIESIĘCZNY (od stycznia 2027 r.):\n`;
    
    if (calc.hasTransition) {
      text += `   • ETAP 1 (Miesiące 1–3 — Intensywne wdrożenia i porządkowanie zaległości):\n`;
      text += `     - Wartość: ${currencyFormatter.format(calc.monthlyNet)} netto/mies. (${currencyFormatter.format(calc.monthlyGross)} brutto/mies.)\n`;
      text += `     - Czas pracy IT w miesiącu: ${calc.totalMonthlyHours} godzin (Nadzór 9h + CMS do 9h + Rozwój 20h)\n`;
      text += `     - Średnia efektywna stawka za godzinę: ~${Math.round(calc.hourlyRateNet)} zł/h netto\n`;
      text += `     - Skład: Baza technologiczna (1\u00A0450\u00A0zł) + Rozwój 20h (3\u00A0200\u00A0zł)\n\n`;

      text += `   • ETAP 2 (Od 4. miesiąca — Naturalne przejście na stały stabilny rozwój):\n`;
      text += `     - Wartość: ${currencyFormatter.format(calc.transitionMonthlyNet)} netto/mies. (${currencyFormatter.format(calc.transitionMonthlyGross)} brutto/mies.)\n`;
      text += `     - Stała oszczędność: ${currencyFormatter.format(calc.transitionSavingsNet)} netto co miesiąc!\n`;
      text += `     - Czas pracy IT w miesiącu: ${calc.transitionHours} godzin (Nadzór 9h + CMS do 9h + Rozwój 10h)\n`;
      text += `     - Średnia efektywna stawka za godzinę: ~${Math.round(calc.transitionHourlyRateNet)} zł/h netto\n`;
      text += `     - Zasada: Niewykorzystane godziny rozwoju można wykorzystać do 6 miesięcy w przód od miesiąca, którego dotyczą\n\n`;
    } else {
      text += `   • Stała opieka miesięczna:\n`;
      text += `     - Wartość: ${currencyFormatter.format(calc.monthlyNet)} netto/mies. (${currencyFormatter.format(calc.monthlyGross)} brutto/mies.)\n`;
      text += `     - Czas pracy IT w miesiącu: ${calc.totalMonthlyHours} godzin\n`;
      text += `     - Średnia stawka za godzinę: ~${Math.round(calc.hourlyRateNet)} zł/h netto\n\n`;
    }

    const baseItems = calc.monthlyItems.filter(i => i.type === 'base');
    if (baseItems.length > 0) {
      text += `   Szczegóły Bazy technologicznej (ryczałt: ${currencyFormatter.format(calc.baseNet)} netto/mies.):\n`;
      baseItems.forEach(item => {
        text += `      - ${item.name} (${currencyFormatter.format(item.netPrice)} netto)\n`;
      });
    }

    const wsItem = calc.monthlyItems.find(i => i.type === 'workspace');
    if (wsItem) {
      text += `   Opcje dodatkowe:\n`;
      text += `      - ${wsItem.name} (${currencyFormatter.format(wsItem.netPrice)} netto/mies.)\n`;
    }

    text += `\n   --> BIEŻĄCA STAWKA MIESIĘCZNA: ${currencyFormatter.format(calc.monthlyNet)} netto/mies. (${currencyFormatter.format(calc.monthlyGross)} brutto/mies.)\n`;
    text += `--------------------------------------------------------------\n\n`;
  }

  // 3. TCO
  if (calc.monthlyNet > 0) {
    text += `3. SZACUNEK I ROKU WSPÓŁPRACY (TCO 2026/2027):\n`;
    text += `   Razem szacunek: ${currencyFormatter.format(calc.tcoNet)} netto (${currencyFormatter.format(calc.tcoGross)} brutto)\n`;
    if (calc.hasTransition) {
      text += `   (Obejmuje: Opłaty jednorazowe [${currencyFormatter.format(calc.onetimeNet)} netto] + 3 m-ce po ${currencyFormatter.format(calc.monthlyNet)} + 9 m-cy po ${currencyFormatter.format(calc.transitionMonthlyNet)})\n\n`;
    } else {
      text += `   (Obejmuje: Opłaty jednorazowe [${currencyFormatter.format(calc.onetimeNet)} netto] + 12 miesięcy stałej opieki)\n\n`;
    }
  } else {
    text += `3. CAŁKOWITY KOSZT ETAPU PILOTAŻOWEGO:\n`;
    text += `   Razem: ${currencyFormatter.format(calc.onetimeNet)} netto (${currencyFormatter.format(calc.onetimeGross)} brutto)\n`;
    text += `   (Obejmuje wyłącznie etap pilotażowy bez zobowiązań do stałej obsługi)\n\n`;
  }

  text += `==============================================================\n`;
  text += `GŁÓWNE ZASADY OFERTY:\n`;
  text += `• Pilotaż Munji (4\u00A0000\u00A0zł za ~25h) zamawiany jest jako niezależny etap startowy (szybkie usprawnienia: formularz, wideo, analityka/RODO).\n`;
  text += `• Krok 3: Po pilotażu audyt faktur i umów oraz doprecyzowanie docelowego budżetu.\n`;
  text += `• Krok 4: Przeniesienie i uruchomienie infrastruktury (3\u00A0000\u00A0zł jednorazowo) najwcześniej od stycznia 2027 r.\n`;
  text += `• Krok 5: Nadzór techniczny (750\u00A0zł) z limitem 9h miesięcznie (po 3h na serwis: Munja, Baila, Nine's).\n`;
  text += `• Niewykorzystane godziny rozwoju można wykorzystać do 6 miesięcy w przód od miesiąca, którego dotyczą.\n`;
  text += `• W cenie: Dokumentacja wykonanych prac, problemów i spraw wymagających Waszej decyzji jest w cenie.\n`;
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
