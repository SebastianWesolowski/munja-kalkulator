/**
 * Component: Calculator Steps & Form Sections (Kroki 1–5)
 */

import { formatMoney } from '../config.js';

/**
 * Step 1: Dostępy i przygotowanie Munji (Start organizacyjny)
 * @returns {string}
 */
export function createStep1Html() {
  return `
    <div class="card config-card" id="card-step-onboarding">
      <div class="card-header">
        <div class="card-step-badge">1</div>
        <div class="card-header-content">
          <div class="card-title-row">
            <h2 class="card-title">Krok 1: Dostępy i przygotowanie Munji</h2>
            <span class="status-pill status-pill-info">Start organizacyjny</span>
          </div>
          <p class="card-subtitle">Przekazanie niezbędnych dostępów, zabezpieczenie kopii zapasowej i przygotowanie zaplecza</p>
        </div>
      </div>

      <div class="card-body">
        <p class="onboarding-intro">
          Na start potrzebuję niezbędnych dostępów do Munji, wylistowanych poniżej. Pozwolą mi poznać obecną konfigurację, zabezpieczyć kopię strony i ustalić kolejność drobnych poprawek:
        </p>

        <div class="checklist-grid">
          <div class="checklist-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Dostęp do WordPress (Munja)</strong>
              <div>Konto administratora do analizy wtyczek i motywu</div>
            </div>
          </div>

          <div class="checklist-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Dostęp do hostingu / FTP / serwera</strong>
              <div>Dostęp techniczny do plików i bazy danych MySQL</div>
            </div>
          </div>

          <div class="checklist-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Dostęp do rejestratora domeny / DNS</strong>
              <div>Wgląd w obecną konfigurację rekordów strefy domeny</div>
            </div>
          </div>

          <div class="checklist-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Dostęp do Google Analytics / GTM</strong>
              <div>Weryfikacja zbierania danych i zgód cookie (RODO)</div>
            </div>
          </div>
        </div>

        <div class="info-note-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <span><strong>Koszt etapu: 0 zł</strong> (w ramach pilotażu). Przed wykonaniem jakichkolwiek poprawek tworzę niezależną kopię zapasową serwisu. Prace nie wpływają na bieżące działanie strony dla gości.</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Step 2: Pilotaż Munji (Szybkie usprawnienia)
 * @returns {string}
 */
export function createStep2Html() {
  return `
    <div class="card config-card" id="card-step-pilot">
      <div class="card-header">
        <div class="card-step-badge">2</div>
        <div class="card-header-content">
          <div class="card-title-row">
            <h2 class="card-title">Krok 2: Pilotaż Munji (listopad / grudzień 2026)</h2>
            <span class="status-pill status-pill-start">Start współpracy</span>
          </div>
          <p class="card-subtitle">Szybkie usprawnienia obecnej strony (~25 godzin pracy) i weryfikacja korzyści przed stałą umową</p>
        </div>
      </div>

      <div class="card-body">
        <label class="feature-toggle-card highlighted-card" for="opt-pilot">
          <input type="checkbox" id="opt-pilot" name="pilot_munja" value="pilot" data-price="4000" class="visually-hidden" checked>
          <span class="checkbox-box" aria-hidden="true"></span>
          <div class="toggle-card-content">
            <div class="toggle-header-row">
              <span class="toggle-title">Pilotaż Munji — pakiet szybkich usprawnień (~25h pracy)</span>
              <span class="toggle-price" data-amount-net="4000" data-period="jednorazowo" data-trim-zero="false">4 000,00 zł</span>
            </div>
            <p class="toggle-desc">
              W pakiecie <strong data-amount-net="4000">4 000 zł</strong> za około 25 godzin pracy skupię się na szybkich usprawnieniach obecnej strony:
            </p>
            <ul class="feature-pills-list">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Drobne poprawki obecnego formularza rezerwacji na telefonach (zwłaszcza problem utraty wpisanych danych po dotknięciu tła i wygoda obsługi)</span>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Skrócenie czasu ładowania przez odciążenie multimediów, z zachowaniem filmu z grillem</span>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Załatanie problemu zbierania analityki w kontekście braku zgody cookie (zgodność z RODO / Google Consent Mode)</span>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Szybki dostęp do telefonu i godzin otwarcia dla gości oraz korekta komunikatów językowych</span>
              </li>
            </ul>
            <div class="note-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Pilotaż zamawiany jest jako <strong>osobny etap</strong> (4 000 zł za około 25 godzin pracy). Nie uruchamia automatycznie opłat za nadzór ani serwery.</span>
            </div>
          </div>
        </label>
      </div>
    </div>
  `;
}

/**
 * Step 3: Rozpoznanie potrzeb i rzetelna kalkulacja współpracy
 * @returns {string}
 */
export function createStep3Html() {
  return `
    <div class="card config-card" id="card-step-needs-audit">
      <div class="card-header">
        <div class="card-step-badge">3</div>
        <div class="card-header-content">
          <div class="card-title-row">
            <h2 class="card-title">Krok 3: Rozpoznanie potrzeb i rzetelna kalkulacja współpracy</h2>
            <span class="status-pill status-pill-info">Audyt i dopięcie wyceny</span>
          </div>
          <p class="card-subtitle">Weryfikacja faktycznych potrzeb, analiza faktur i umów oraz ustalenie ostatecznego budżetu po pilotażu</p>
        </div>
      </div>

      <div class="card-body">
        <p class="onboarding-intro">
          Po podsumowaniu pilotażu sprawdzę rzeczywisty zakres obsługi, potrzebny czas pracy i koszty usług. Wgląd w faktury i zakresy obecnych umów pozwoli mi przygotować adekwatną kalkulację oraz wskazać możliwe oszczędności. Następnie wspólnie ustalimy priorytety, odpowiedzialność i budżet dalszych prac:
        </p>

        <div class="checklist-grid">
          <div class="checklist-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Faktury i zakresy obecnych umów</strong>
              <div>Hosting, domeny, poczta i licencje — weryfikacja i obniżenie kosztów odnowień</div>
            </div>
          </div>

          <div class="checklist-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Dostępy do pozostałych serwisów</strong>
              <div>Baila Warsaw, NINE’s Restaurant &amp; Sports Bar oraz podział odpowiedzialności</div>
            </div>
          </div>

          <div class="checklist-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Orientacyjna liczba publikacji w CMS</strong>
              <div>Weryfikacja, czy wspólny pakiet 9h miesięcznie w zupełności wystarczy całej grupie</div>
            </div>
          </div>

          <div class="checklist-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>
              <strong>Dane spółki i kontakt techniczny</strong>
              <div>Jedna osoba do kontaktu technicznego dla wszystkich spółek i spójne rozliczenia</div>
            </div>
          </div>
        </div>

        <div class="info-note-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <span><strong>Koszt etapu: 0 zł</strong> (krok uzgodnieniowy po pilotażu). Kwoty w kolejnych krokach są wstępnymi szacunkami — po audycie w tym kroku wspólnie potwierdzimy ostateczny budżet.</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Step 4: Przeniesienie i uruchomienie infrastruktury (od stycznia 2027)
 * @returns {string}
 */
export function createStep4Html() {
  return `
    <div class="card config-card" id="card-step-setup">
      <div class="card-header">
        <div class="card-step-badge">4</div>
        <div class="card-header-content">
          <div class="card-title-row">
            <h2 class="card-title">Krok 4: Przeniesienie i uruchomienie infrastruktury</h2>
            <span class="status-pill status-pill-prep">Od stycznia 2027</span>
          </div>
          <p class="card-subtitle">Przygotowanie nowego serwera, migracja stron grupy, przejęcie domen i zabezpieczenie poczty</p>
        </div>
      </div>

      <div class="card-body">
        <label class="feature-toggle-card" for="opt-setup-fee">
          <input type="checkbox" id="opt-setup-fee" name="setup_fee" value="setup" data-price="3000" class="visually-hidden" checked>
          <span class="checkbox-box" aria-hidden="true"></span>
          <div class="toggle-card-content">
            <div class="toggle-header-row">
              <span class="toggle-title">Przeniesienie i uruchomienie infrastruktury</span>
              <span class="toggle-price" id="setup-fee-display" data-amount-net="3000" data-period="jednorazowo" data-trim-zero="false">3 000,00 zł</span>
            </div>
            <p class="toggle-desc">
              Po uzgodnieniu zakresu i budżetu w Kroku 3 przygotuję serwer, przeniosę strony i przejmę obsługę domen. Sprawdzę też usługi pocztowe i uporządkuję konfigurację nadawców oraz zabezpieczenia SPF, DKIM i DMARC:
            </p>
            <ul class="feature-pills-list">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span><strong>Uruchomienie nowego serwera:</strong> Przygotowanie dedykowanego środowiska i migracja 3 serwisów (Munja, Baila, Nine’s)</span>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span><strong>Przejęcie obsługi 5 domen grupy:</strong> Konsolidacja u jednego rejestratora w stałym ryczałcie (50 zł/mies. z odnowieniami)</span>
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span><strong>Zabezpieczenie poczty firmowej:</strong> Uporządkowanie konfiguracji nadawców oraz rekordów SPF, DKIM i DMARC (ochrona przed podszywaniem się)</span>
              </li>
            </ul>
            <div class="note-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Przejęcie infrastruktury planuję najwcześniej od stycznia 2027 r. Wstępny koszt tego osobnego etapu to <strong>jednorazowo 3 000 zł</strong> (łączna kwota do doprecyzowania w kroku 3).</span>
            </div>
          </div>
        </label>
      </div>
    </div>
  `;
}

/**
 * Step 5: Stała opieka i rozwój (abonament) (od stycznia 2027)
 * @returns {string}
 */
export function createStep5Html() {
  return `
    <div class="card config-card" id="card-step-monthly">
      <div class="card-header">
        <div class="card-step-badge">5</div>
        <div class="card-header-content">
          <div class="card-title-row">
            <h2 class="card-title">Krok 5: Stała opieka i rozwój (abonament)</h2>
            <span class="status-pill status-pill-recurring">Abonament miesięczny</span>
          </div>
          <p class="card-subtitle">Nadzór nad stabilnością, aktualizacje, publikacja treści i stała pula rozwoju grupy (od stycznia 2027)</p>
        </div>
      </div>

      <div class="card-body">
        <!-- Sekcja A: Baza technologiczna grupy -->
        <div class="form-subsection">
          <div class="subsection-header">
            <div>
              <h3 class="subsection-title">A. Baza infrastrukturalno-techniczna</h3>
              <p class="subsection-desc">Fundament bezpieczeństwa, bezawaryjności i obsługi treści stron grupy</p>
            </div>
            <div class="base-bundle-badge">
              <span>Baza pakietu:</span>
              <strong id="base-bundle-total">1 450 zł/mies.</strong>
            </div>
          </div>

          <div class="sub-checkboxes-grid">
            <!-- Nadzór techniczny (9h) -->
            <label class="custom-checkbox-card" for="opt-supervision">
              <input type="checkbox" id="opt-supervision" name="base_items" value="supervision" data-price="750" class="visually-hidden" checked>
              <span class="checkbox-box" aria-hidden="true"></span>
              <div class="checkbox-content">
                <div class="checkbox-title-row">
                  <span class="checkbox-title">Nadzór techniczny (9h miesięcznie)</span>
                  <span class="checkbox-item-price" data-amount-net="750" data-suffix="/mies.">750 zł/mies.</span>
                </div>
                <p class="checkbox-desc">
                  9 godzin łącznie, po 3 godziny na serwis (Munja, Baila, Nine's): utrzymanie, zarządzanie infrastrukturą, aktualizacje, kopie zapasowe, monitoring i reakcja w uzgodnionych godzinach wsparcia. Przegląd i podstawowa obsługa należą do nadzoru, a zmiany kodu do puli rozwoju.
                </p>
              </div>
            </label>

            <!-- Publikacja treści CMS (do 9h) -->
            <label class="custom-checkbox-card" for="opt-cms">
              <input type="checkbox" id="opt-cms" name="base_items" value="cms" data-price="500" class="visually-hidden" checked>
              <span class="checkbox-box" aria-hidden="true"></span>
              <div class="checkbox-content">
                <div class="checkbox-title-row">
                  <span class="checkbox-title">Publikacja treści w CMS (do 9h/mies.)</span>
                  <span class="checkbox-item-price" data-amount-net="500" data-suffix="/mies.">500 zł/mies.</span>
                </div>
                <p class="checkbox-desc">
                  Do 9 godzin łącznie dla trzech serwisów: uzgodnienia publikacji oraz wprowadzanie dostarczonych, gotowych tekstów, menu i zdjęć w panelach administracyjnych.
                </p>
              </div>
            </label>

            <!-- VPS -->
            <label class="custom-checkbox-card" for="opt-vps">
              <input type="checkbox" id="opt-vps" name="base_items" value="vps" data-price="150" class="visually-hidden" checked>
              <span class="checkbox-box" aria-hidden="true"></span>
              <div class="checkbox-content">
                <div class="checkbox-title-row">
                  <span class="checkbox-title">Dedykowany serwer VPS</span>
                  <span class="checkbox-item-price" data-amount-net="150" data-suffix="/mies.">150 zł/mies.</span>
                </div>
                <p class="checkbox-desc">
                  Dedykowana instancja serwerowa bez obcych projektów · Szybki czas odpowiedzi (TTFB) i bezpieczny zapas pod 5. lokal.
                </p>
              </div>
            </label>

            <!-- Pakiet 5 domen -->
            <label class="custom-checkbox-card" for="opt-domains">
              <input type="checkbox" id="opt-domains" name="base_items" value="domains" data-price="50" class="visually-hidden" checked>
              <span class="checkbox-box" aria-hidden="true"></span>
              <div class="checkbox-content">
                <div class="checkbox-title-row">
                  <span class="checkbox-title">Pakiet 5 domen (stały ryczałt)</span>
                  <span class="checkbox-item-price" data-amount-net="50" data-suffix="/mies.">50 zł/mies.</span>
                </div>
                <p class="checkbox-desc">
                  Uporządkowanie odnowień w stałym ryczałcie (50 zł/mies. zamiast dotychczasowych ~81 zł) · Transfer, utrzymanie i ochrona przed wygaśnięciem domen.
                </p>
              </div>
            </label>
          </div>
        </div>

        <!-- Sekcja B: Dalszy rozwój serwisów -->
        <div class="form-subsection">
          <div class="subsection-header">
            <div>
              <h3 class="subsection-title">B. Pula godzin na dalszy rozwój serwisów</h3>
              <p class="subsection-desc">Doradztwo nastawione na zysk: analiza ścieżek rezerwacji, wdrożenia usprawnień i ocena efektów</p>
            </div>
          </div>

          <div class="radio-cards-group" role="radiogroup" aria-label="Pakiet godzin na dalszy rozwój">
            <!-- Opcja 20h -->
            <label class="custom-radio-card" for="dev-plan-20">
              <input type="radio" id="dev-plan-20" name="dev_plan" value="20" data-price="3200" data-hours="20" data-rate="160" class="visually-hidden" checked>
              <span class="radio-box" aria-hidden="true"></span>
              <div class="radio-card-content">
                <div class="radio-header-row">
                  <div>
                    <span class="radio-title">Dalszy rozwój: Pakiet 20 godzin</span>
                    <span class="badge-rec">Rekomendowany na pierwsze 3 miesiące</span>
                  </div>
                  <span class="radio-price" data-amount-net="3200" data-suffix="/mies.">3 200 zł/mies.</span>
                </div>
                <p class="radio-desc">
                  Stawka <strong data-amount-net="160" data-format="{price}/godz. {tax}">160 zł/godz. netto</strong>. Wspólna pula dla Munji, Baila i Nine’s, aby uporządkować najważniejsze zaległości. 
                  <strong>Niewykorzystane godziny rozwoju można wykorzystać do 6 miesięcy w przód od miesiąca, którego dotyczą!</strong>
                </p>
              </div>
            </label>

            <!-- Opcja 10h -->
            <label class="custom-radio-card" for="dev-plan-10">
              <input type="radio" id="dev-plan-10" name="dev_plan" value="10" data-price="1700" data-hours="10" data-rate="170" class="visually-hidden">
              <span class="radio-box" aria-hidden="true"></span>
              <div class="radio-card-content">
                <div class="radio-header-row">
                  <span class="radio-title">Dalszy rozwój: Pakiet 10 godzin</span>
                  <span class="radio-price" data-amount-net="1700" data-suffix="/mies.">1 700 zł/mies.</span>
                </div>
                <p class="radio-desc">
                  Stawka <strong data-amount-net="170" data-format="{price}/godz. {tax}">170 zł/godz. netto</strong>. Docelowa mniejsza pula po uporządkowaniu zaległości (po pierwszych 2–3 miesiącach).
                  <strong>Niewykorzystane godziny rozwoju można wykorzystać do 6 miesięcy w przód od miesiąca, którego dotyczą!</strong>
                </p>
              </div>
            </label>

            <!-- Opcja 0h (Brak stałego pakietu) -->
            <label class="custom-radio-card" for="dev-plan-0">
              <input type="radio" id="dev-plan-0" name="dev_plan" value="0" data-price="0" data-hours="0" data-rate="0" class="visually-hidden">
              <span class="radio-box" aria-hidden="true"></span>
              <div class="radio-card-content">
                <div class="radio-header-row">
                  <span class="radio-title">Brak stałego pakietu rozwoju (0 godzin)</span>
                  <span class="radio-price" data-amount-net="0" data-suffix="/mies.">0 zł/mies.</span>
                </div>
                <p class="radio-desc">
                  Tylko opieka bazowa nad stabilnością. Zmiany programistyczne rozliczane wyłącznie jako zlecenia dodatkowe (<span data-amount-net="200" data-suffix="/h">200 zł/h</span>).
                </p>
              </div>
            </label>
          </div>

          <!-- Dodatkowe godziny ad-hoc -->
          <div class="extra-hours-card">
            <div class="form-row-between">
              <label for="extra-adhoc-hours" class="form-label mb-0">
                Dodatkowe godziny doraźne ponad pakiet
                <span class="label-info-tag" data-amount-net="200" data-suffix="/h">200 zł/h</span>
              </label>
              <span class="range-live-val" id="extra-hours-display">0 godz. (0 zł)</span>
            </div>
            <input 
              type="range" 
              id="extra-adhoc-hours" 
              name="extra_adhoc_hours" 
              class="form-range" 
              min="0" 
              max="20" 
              value="0" 
              step="1"
              data-rate="200"
            >
            <div class="range-labels" aria-hidden="true">
              <span>0 h</span>
              <span>5 h</span>
              <span>10 h</span>
              <span>15 h</span>
              <span>20 h</span>
            </div>
            <p class="form-hint">
              Wyłącznie po wcześniejszym uzgodnieniu i akceptacji zapotrzebowania.
            </p>
          </div>
        </div>

        <!-- Sekcja C: Google Workspace -->
        <div class="form-subsection border-top-sub">
          <div class="subsection-header">
            <div>
              <h3 class="subsection-title">C. Poczta firmowa (Google Workspace)</h3>
              <p class="subsection-desc">Orientacyjny koszt licencji skrzynek pocztowych (przedział <span data-amount-net="30">30 zł</span>–<span data-amount-net="40" data-format="{price}/konto/mies. {tax}">40 zł/konto/mies. netto</span>)</p>
            </div>
          </div>

          <label class="feature-toggle-card minimal-toggle" for="toggle-workspace">
            <input type="checkbox" id="toggle-workspace" name="use_workspace" value="1" class="visually-hidden">
            <span class="checkbox-box" aria-hidden="true"></span>
            <div class="toggle-card-content">
              <div class="toggle-header-row">
                <span class="toggle-title">Uwzględnij koszt licencji poczty w symulacji</span>
                <span class="badge-optional">Opcjonalnie</span>
              </div>
            </div>
          </label>

          <div id="workspace-config-panel" class="nested-panel collapsed">
            <div class="form-row-between">
              <label for="workspace-accounts-range" class="form-label mb-0">
                Liczba płatnych kont pocztowych:
              </label>
              <span class="range-live-val" id="workspace-accounts-display">9 kont (315 zł/mies.)</span>
            </div>
            <input 
              type="range" 
              id="workspace-accounts-range" 
              name="workspace_accounts" 
              class="form-range" 
              min="1" 
              max="20" 
              value="9" 
              step="1"
              data-cost-per-account="35"
            >
            <div class="range-labels" aria-hidden="true">
              <span>1 konto</span>
              <span>9 kont (wg audytu)</span>
              <span>20 kont</span>
            </div>
            <p class="form-hint">
              Przyjęto średnią stawkę <strong data-amount-net="35" data-format="{price}/konto/mies. {tax}">35 zł/konto/mies. netto</strong>. W materiałach rozpoznano 9 adresów e-mail; faktyczną liczbę płatnych licencji (względem bezpłatnych aliasów) zweryfikujemy w konsoli administracyjnej w Kroku 3.
            </p>
            <div class="security-note-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span><strong>Zabezpieczenia poczty:</strong> Pełna konfiguracja rekordów SPF, DKIM i DMARC oraz ochrona zarządu przed podszywaniem się jest realizowana w przypadku przejęcia opieki nad pocztą i domenami pocztowymi.</span>
            </div>
          </div>
        </div>

        <!-- Ramka informacyjna: Dokumentacja w cenie -->
        <div class="documentation-note-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <div>
            <strong>W cenie abonamentu:</strong> Dokumentacja wykonanych prac, problemów i spraw wymagających Waszej decyzji jest w cenie. Otrzymujecie pełną transparentność i jedną osobę do kontaktu technicznego dla całej grupy.
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Future Steps Informative Collapsed Banner (shown in Pilot-only mode)
 * @returns {string}
 */
export function createFutureStepsBannerHtml() {
  return `
    <div class="future-steps-banner hidden" id="future-steps-banner">
      <div class="future-banner-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <div class="future-banner-content">
        <div class="future-banner-header">
          <h3 class="future-banner-title">Kolejne etapy: Audyt, nowa infrastruktura i stała opieka (od stycznia 2027)</h3>
          <span class="status-pill status-pill-optional">Po pilotażu</span>
        </div>
        <p class="future-banner-desc">
          W wariancie <strong>Tylko Pilotaż</strong> nie ponosisz opłat abonamentowych ani kosztów wdrożenia. Decyzję o przejęciu serwerów, audycie i stałej opiece podejmujecie po sprawdzeniu rezultatów pilotażu.
        </p>
        <button type="button" id="btn-unlock-future-steps" class="btn-unlock-steps">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <span>Pokaż i skonfiguruj opcje dalszej współpracy (Kroki 3–5)</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Form Bottom Actions (Reset)
 * @returns {string}
 */
export function createFormActionsHtml() {
  return `
    <div class="form-actions">
      <button type="button" id="btn-reset" class="btn btn-secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
        </svg>
        <span>Przywróć rekomendowane ustawienia</span>
      </button>
    </div>
  `;
}

/**
 * Render all 5 steps into target form container
 * @param {HTMLFormElement} formElement
 */
export function renderSteps(formElement) {
  if (!formElement) return;

  formElement.innerHTML = `
    ${createStep1Html()}
    ${createStep2Html()}
    <div class="future-steps-container" id="future-steps-container">
      ${createFutureStepsBannerHtml()}
      <div class="future-steps-content" id="future-steps-content">
        ${createStep3Html()}
        ${createStep4Html()}
        ${createStep5Html()}
      </div>
    </div>
    ${createFormActionsHtml()}
  `;
}

/**
 * Toggle the collapsed state of the 2027 future steps section
 * @param {boolean} isCollapsed - True to collapse into the banner, false to expand
 */
export function setFutureStepsCollapsed(isCollapsed) {
  const banner = document.getElementById('future-steps-banner');
  const content = document.getElementById('future-steps-content');

  if (banner) {
    banner.classList.toggle('hidden', !isCollapsed);
  }
  if (content) {
    content.classList.toggle('collapsed', isCollapsed);
  }
}
