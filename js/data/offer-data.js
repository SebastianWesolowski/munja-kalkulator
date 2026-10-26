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

  // Step 2: Setup Fee
  setup: {
    id: 'setup',
    priceNet: 3000,
    name: 'Wdrożenie infrastruktury (Setup Fee)',
    sub: 'Jednorazowa konfiguracja dedykowanego VPS, migracja 3 serwisów, konsolidacja 5 domen, SPF/DKIM/DMARC'
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
      name: 'Dedykowany serwer VPS',
      sub: '4 vCPU, 8 GB RAM, 100 GB NVMe · Szybki TTFB, bez obcych projektów, z buforem pod 5. lokal'
    },
    domains: {
      id: 'domains',
      priceNet: 50,
      name: 'Pakiet 5 domen grupy (stały ryczałt)',
      sub: 'Konsolidacja w modelu hurtowym: bez ryzyka wygaśnięcia i bez skoków cenowych'
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
    tag: '4 650 zł/m. (od 4. m-ca: 3 150 zł)',
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
    tag: '3 150 zł/m.',
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
    tag: '1 450 zł/m.',
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
