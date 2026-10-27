/**
 * Business Offer Pricing & Preset Scenarios
 * Offer data as of 26.10.2026
 */

export const OFFER_DATA = {
  // Step 1: Pilot
  pilot: {
    id: 'pilot',
    priceNet: 4000,
    name: 'Pilotaż Munji (XI/XII 2026)',
    sub: 'Szybkie usprawnienia obecnej strony: formularz rezerwacji na telefonach, odciążenie multimediów, analityka / RODO'
  },

  // Step 2: Setup Fee (zależny od bazy infrastruktury: VPS 2 000 zł, Domeny 1 000 zł)
  setup: {
    id: 'setup',
    vpsPriceNet: 2000,
    domainsPriceNet: 1000,
    priceNet: 3000,
    name: 'Wdrożenie infrastruktury (Setup Fee)',
    sub: 'Jednorazowa konfiguracja dedykowanego VPS (2 000 zł) oraz konsolidacja 5 domen (1 000 zł w pakiecie)'
  },

  // Step 3A: Base items
  baseItems: {
    supervision: {
      id: 'supervision',
      priceNet: 750,
      name: 'Nadzór techniczny, monitoring 24/7 i kopie zapasowe',
      sub: 'Bieżące aktualizacje WP i wtyczek · Czasy reakcji: P1 <= 4h, P2 <= 1d, P3 <= 3d'
    },
    cms: {
      id: 'cms',
      priceNet: 500,
      name: 'Publikacja treści w CMS (do 9h/miesięcznie)',
      sub: 'Wprowadzanie gotowych, zatwierdzonych tekstów, aktualizacji menu i zdjęć dla lokali'
    },
    vps: {
      id: 'vps',
      priceNet: 150,
      setupPriceNet: 2000,
      name: 'Dedykowany serwer VPS',
      sub: '4 vCPU, 8 GB RAM, 100 GB NVMe · Szybki TTFB, bez obcych projektów, z buforem pod 5. lokal · Setup: 2 000 zł'
    },
    domains: {
      id: 'domains',
      priceNet: 50,
      setupPriceNet: 1000,
      name: 'Pakiet 5 domen grupy (stały ryczałt)',
      sub: 'Konsolidacja w modelu hurtowym: bez ryzyka wygaśnięcia · W pakiecie jednorazowy setup obniżony do 1 000 zł'
    }
  },

  // Step 3B: Development Plans
  devPlans: {
    '20': {
      hours: 20,
      priceNet: 3200,
      rateNet: 160,
      name: 'Dalszy rozwój: Pakiet 20 godzin',
      sub: '160 zł/h netto · Niewykorzystane godziny przechodzą na kolejny miesiąc'
    },
    '10': {
      hours: 10,
      priceNet: 1700,
      rateNet: 170,
      name: 'Dalszy rozwój: Pakiet 10 godzin',
      sub: '170 zł/h netto · Niewykorzystane godziny przechodzą na kolejny miesiąc'
    },
    '0': {
      hours: 0,
      priceNet: 0,
      rateNet: 0,
      name: 'Brak stałego pakietu rozwoju (0h)',
      sub: 'Tylko opieka bazowa nad stabilnością'
    }
  },

  // Extra hourly rate
  adhocRate: 200,

  // Google Workspace average cost per paid user
  workspaceCostPerAccount: 35
};

/**
 * Predefined pricing presets
 */
export const PRESETS = {
  recommended: {
    id: 'recommended',
    name: 'Rekomendowany (Pełna Transformacja)',
    tag: '4 650 zł/mies. (od 4. m-ca: 3 150 zł)',
    pilot: true,
    setupFee: true,
    supervision: true,
    cms: true,
    vps: true,
    domains: true,
    devPlan: '20',
    extraHours: 0,
    workspace: false
  },
  balanced: {
    id: 'balanced',
    name: 'Zrównoważony (Stałe Wsparcie: 10h)',
    tag: '3 150 zł/mies.',
    pilot: true,
    setupFee: true,
    supervision: true,
    cms: true,
    vps: true,
    domains: true,
    devPlan: '10',
    extraHours: 0,
    workspace: false
  },
  base: {
    id: 'base',
    name: 'Sama Baza (Nadzór + CMS + VPS + Domeny)',
    tag: '1 450 zł/mies.',
    pilot: true,
    setupFee: true,
    supervision: true,
    cms: true,
    vps: true,
    domains: true,
    devPlan: '0',
    extraHours: 0,
    workspace: false
  },
  'pilot-only': {
    id: 'pilot-only',
    name: 'Tylko Pilotaż Munji',
    tag: '4 000 zł jednorazowo',
    pilot: true,
    setupFee: false,
    supervision: false,
    cms: false,
    vps: false,
    domains: false,
    devPlan: '0',
    extraHours: 0,
    workspace: false
  }
};

/**
 * Detailed configuration for the 4 Strategic Development Paths (Ścieżki rozwoju grupy)
 */
export const PRESET_CARDS = [
  {
    id: 'recommended',
    title: 'Pełna Transformacja i Skalowanie',
    badgeTag: '★ Rekomendowany',
    badgeClass: 'badge-star',
    highlighted: true,
    priceLabel: 'Miesiące 1–3:',
    priceNet: 4650,
    priceSuffix: '/mies.',
    priceEvolutionHtml: 'od 4. m-ca: <span data-amount-net="3150" data-suffix="/mies.">3 150 zł/mies.</span>',
    target: 'Dla grupy planującej szybki skok jakościowy w pierwszych 3 miesiącach, wdrożenie kluczowych zmian na wszystkich 3 stronach, a następnie obniżenie budżetu do stabilnego rozwoju.',
    steps: [
      {
        dot: '1',
        html: '<strong>Start:</strong> Pilotaż Munji (<span data-amount-net="4000">4 000 zł</span>) — naprawa rezerwacji na telefonach, odciążenie wideo, RODO'
      },
      {
        dot: '2',
        html: '<strong>Setup:</strong> Przejęcie infrastruktury (<span data-amount-net="3000">3 000 zł</span>) — nowy dedykowany serwer VPS i 5 domen (<span data-amount-net="200" data-suffix="/mies.">200 zł/mies.</span>)'
      },
      {
        dot: '3',
        html: '<strong>Miesiące 1–3:</strong> 20h R&amp;D + Baza (Nadzór <span data-amount-net="750">750 zł</span> + Serwer/Domeny <span data-amount-net="200">200 zł</span> + CMS <span data-amount-net="500">500 zł</span>) = <span data-amount-net="4650" data-suffix="/mies.">4 650 zł/mies.</span>'
      },
      {
        dot: '4',
        html: '<strong>Od 4. miesiąca:</strong> Zmniejszenie puli do 10h R&amp;D + Baza = <span data-amount-net="3150" data-suffix="/mies.">3 150 zł/mies.</span>'
      }
    ]
  },
  {
    id: 'balanced',
    title: 'Stałe Wsparcie i Ewolucja',
    badgeTag: 'Zrównoważony',
    badgeClass: '',
    highlighted: false,
    priceLabel: 'Stały abonament:',
    priceNet: 3150,
    priceSuffix: '/mies.',
    priceEvolutionHtml: 'stały budżet od 1. dnia',
    target: 'Dla zarządu oczekującego w 100% równego, przewidywalnego kosztu co miesiąc, ze stałą i bezpieczną pulą 10 godzin na bieżące ulepszenia (godziny przechodzą na kolejny miesiąc).',
    steps: [
      {
        dot: '1',
        html: '<strong>Start:</strong> Pilotaż Munji (<span data-amount-net="4000">4 000 zł</span>) — szybkie usunięcie wąskich gardeł'
      },
      {
        dot: '2',
        html: '<strong>Setup:</strong> Setup Fee (<span data-amount-net="3000">3 000 zł</span>) — migracja na dedykowany serwer VPS i domeny'
      },
      {
        dot: '3',
        html: '<strong>Stała obsługa (od 2027 r.):</strong> Baza (<span data-amount-net="1450">1 450 zł</span>) + 10h R&amp;D (<span data-amount-net="1700">1 700 zł</span>) = <span data-amount-net="3150" data-suffix="/mies.">3 150 zł/mies.</span>'
      }
    ]
  },
  {
    id: 'base',
    title: 'Sama Baza (Bez R&D)',
    badgeTag: 'Fundament Techniczny',
    badgeClass: '',
    highlighted: false,
    priceLabel: 'Stały ryczałt:',
    priceNet: 1450,
    priceSuffix: '/mies.',
    priceEvolutionHtml: 'Nadzór + CMS + Serwer + Domeny',
    target: 'Dla grupy skupionej wyłącznie na bezawaryjności, bezpieczeństwie serwerów i bieżących zmianach w menu/treściach, bez stałego miesięcznego abonamentu na programistę.',
    steps: [
      {
        dot: '1',
        html: '<strong>Setup:</strong> Setup Fee (<span data-amount-net="3000">3 000 zł</span>) — uruchomienie dedykowanego serwera i transfer domen'
      },
      {
        dot: '2',
        html: '<strong>Stała Baza:</strong> Nadzór 24/7 (<span data-amount-net="750">750 zł</span>) + CMS (<span data-amount-net="500">500 zł</span>) + Serwer i Domeny (<span data-amount-net="200">200 zł</span>) = <span data-amount-net="1450" data-suffix="/mies.">1 450 zł/mies.</span>'
      },
      {
        dot: '3',
        html: '<strong>Prace programistyczne:</strong> Tylko doraźne zlecenia w razie potrzeby (<span data-amount-net="200" data-suffix="/h">200 zł/h</span>)'
      }
    ]
  },
  {
    id: 'pilot-only',
    title: 'Tylko Pilotaż Munji',
    badgeTag: 'Start bez ryzyka',
    badgeClass: 'badge-start-tag',
    highlighted: false,
    priceLabel: 'Jednorazowo:',
    priceNet: 4000,
    priceSuffix: '',
    priceEvolutionHtml: '<span data-amount-net="0" data-suffix=" stałego abonamentu">0 zł stałego abonamentu</span>',
    target: 'Szybki test jakości współpracy przed sezonem świątecznym. Natychmiastowe rozwiązanie problemu formularza mobilnego i multimediów bez wiązania się stałą umową.',
    steps: [
      {
        dot: '1',
        html: '<strong>Zakres prac:</strong> Naprawa formularza rezerwacji, odciążenie wideo, RODO / analityka'
      },
      {
        dot: '2',
        html: '<strong>Brak dalszych kosztów:</strong> Decyzja o stałej opiece dopiero po weryfikacji efektów'
      }
    ]
  }
];
