# Munja · Baila Warsaw · NINE’s — Kalkulator Oferty

Interaktywny, responsywny kalkulator oferty i symulator kosztów opieki technicznej oraz rozwoju serwisów grupy restauracyjnej (**Munja · Baila Warsaw · NINE’s Restaurant & Sports Bar**).

Zbudowany w czystym **HTML5, CSS3 i Vanilla JavaScript** (bez zewnętrznych bibliotek, bez bundlerów, natychmiastowe ładowanie, gotowy na wdrożenie statyczne na Netlify).

- **Domena docelowa:** [munja-kalkulator.wesolowski.dev](https://munja-kalkulator.wesolowski.dev)
- **Hosting:** Netlify (statyczny, szybki, bezpieczny)

---

## 🧭 Założenia i model oferty (26.10.2026 r.)

Kalkulator odwzorowuje strukturę 5 etapów i cennik ze szkicu współpracy z maila:

1. **Krok 1: Dostępy i przygotowanie Munji (Start organizacyjny)**
   - **Koszt: 0 zł** (w ramach pilotażu).
   - Przekazanie dostępów technicznych (WP, hosting, domeny, analityka) i wykonanie niezależnej kopii zapasowej.

2. **Krok 2: Pilotaż Munji (listopad / grudzień 2026 r.)**
   - **Pakiet szybkich usprawnień za 4 000 zł netto (~25 godzin pracy)** (bez zobowiązań abonamentowych).
   - Osobno zamawiany etap startowy przed decyzją o stałej umowie.
   - Zakres: poprawka formularza rezerwacji na telefonach, odciążenie multimediów, załatanie analityki pod kątem zgód cookie / RODO.

3. **Krok 3: Rozpoznanie potrzeb i rzetelna kalkulacja współpracy**
   - **Koszt: 0 zł** (etap analityczny po pilotażu).
   - Wgląd w faktury i umowy (hosting, domeny, poczta), ustalenie priorytetów dla serwisów Baila i NINE’s oraz zatwierdzenie docelowego budżetu.

4. **Krok 4: Przeniesienie i uruchomienie infrastruktury (w styczniu 2027 r.)**
   - **Jednorazowy etap: 3 000 zł netto** (łączna kwota do doprecyzowania w kroku 3).
   - Przygotowanie dedykowanej instancji serwerowej, migracja 3 serwisów, konsolidacja 5 domen oraz zabezpieczenia poczty (SPF, DKIM, DMARC).

5. **Krok 5: Stała opieka i rozwój (abonament) (od stycznia 2027 r.)**
   - **Baza technologiczna grupy: 1 450 zł/mies. netto**:
     - Nadzór techniczny (9h miesięcznie, po 3h na serwis: Munja, Baila, Nine's): 750 zł/mies.
     - Publikacja treści w CMS do 9h łącznie: 500 zł/mies.
     - Dedykowany serwer VPS (zapas pod 5. lokal): 150 zł/mies.
     - Pakiet 5 domen grupy (stały ryczałt): 50 zł/mies.
   - **Pula rozwoju serwisów grupy**:
     - **Pakiet 20 godzin (Rekomendowany na start):** 3 200 zł/mies. (160 zł/h)
     - **Pakiet 10 godzin (Docelowy od 4. miesiąca):** 1 700 zł/mies. (170 zł/h)
     - **Brak stałego pakietu (0h):** 0 zł/mies. (rozliczenia doraźne 200 zł/h)
     - **Zasada przenoszenia godzin:** niewykorzystane godziny można wykorzystać do 6 miesięcy w przód od miesiąca, którego dotyczą!
   - **W cenie:** Dokumentacja wykonanych prac, problemów i spraw wymagających Waszej decyzji jest w cenie abonamentu.
   - **Opcje dodatkowe:** Licencje pocztowe Google Workspace, dodatkowe godziny doraźne (200 zł/h).

---

## ⚡ Główne funkcjonalności kalkulatora

- **Strategiczne ścieżki rozwoju (Warianty)**:
  - `Rekomendowany (Pełna Transformacja)`: Start: Pilotaż (4 000 zł) + Setup (3 000 zł). M-ce 1–3: 20h R&D + Baza = 4 650 zł/mies. Od 4. m-ca: 10h R&D + Baza = 3 150 zł/mies.
  - `Zrównoważony`: Start: 7 000 zł. Stała obsługa: Baza + Rozwój 10h = 3 150 zł/mies. netto od 1. dnia.
  - `Sama Baza`: Start: Setup (3 000 zł). Nadzór + CMS + VPS + Domeny = 1 450 zł/mies. netto (programista doraźnie).
  - `Tylko Pilotaż Munji`: 4 000 zł jednorazowo netto (0 zł abonamentu).
- **Przełącznik Netto / Brutto**: Błyskawiczny podgląd kwot z podatkiem VAT 23% na kartach i w podsumowaniu.
- **Kopiowanie sformatowanej oferty**: Przycisk generuje czytelny szablon podsumowania gotowy do wklejenia do wiadomości e-mail dla Martyny.
- **Druk / Eksport do PDF**: Dedykowany arkusz `@media print` przygotowujący raport do wydruku lub zapisu w formacie PDF.
- **Baza wiedzy / FAQ**: Rozwijane akordeony wyjaśniające model Win-Win dla domen, dedykowany VPS oraz zasady przenoszenia godzin.

---

## 📁 Struktura Projektu (Modułowa architektura)

```text
munja-kalkulator/
├── index.html                    # Semantyczny szkielet aplikacji z podziałem na obszary
├── public/
│   └── fonts/                    # Samodzielnie hostowane fonty Plus Jakarta Sans (Variable woff2)
├── css/
│   ├── style.css                 # Główny arkusz importujący moduły komponentów
│   ├── fonts.css                 # Deklaracje @font-face dla lokalnego fontu
│   ├── variables.css             # Tokeny stylów (kolory, typografia, cienie, promienie)
│   ├── base.css                  # Reset, layout siatki (.calculator-layout), przyciski
│   ├── responsive.css            # Adaptacje mobilne (< 768px, < 460px, < 360px)
│   ├── print.css                 # Dedykowany arkusz wydruku / eksportu PDF
│   └── components/
│       ├── header.css            # Pasek nawigacji, brand i przełącznik Netto/Brutto
│       ├── hero.css              # Wprowadzenie, tytuł i opis kalkulatora
│       ├── presets.css           # Pasek szybkich wariantów (Rekomendowany, Baza, etc.)
│       ├── cards.css             # Wspólne style kart, kroków i statusów
│       ├── steps.css             # Formularz: Krok 1 (Pilot), Krok 2 (Setup), Krok 3 (Baza/Rozwój)
│       ├── summary.css           # Podsumowanie oferty, bohaterowie kwot, tabela VAT, lista, TCO
│       ├── faq.css               # Akordeony z bazą wiedzy i założeń biznesowych
│       ├── footer.css            # Stopka serwisu
│       └── toast.css             # Powiadomienia schowka
├── js/
│   ├── main.js                   # Główny orchestrator aplikacji ES Module
│   ├── app.js                    # Kompatybilny wstecznie punkt wejścia
│   ├── config.js                 # Konfiguracja stawek VAT i formatowania walutowego PLN
│   ├── state.js                  # Reaktywny stan aplikacji (tryb Netto/Brutto, subskrypcje)
│   ├── data/
│   │   └── offer-data.js         # Stałe cenowe, pakiety i definicje wariantów
│   ├── services/
│   │   ├── calculator.js         # Czysty silnik obliczeń finansowych (jednorazowe, abonament, TCO)
│   │   └── clipboard.js          # Generator i formater treści oferty do wiadomości e-mail
│   └── components/
│       ├── header.js             # Kontroler przełącznika cen Netto/Brutto
│       ├── presets.js            # Komponent widoku i kontroler kart wariantów (Ścieżki rozwoju grupy)
│       ├── form.js               # Kontroler pól formularza, suwaków i etykiet cen
│       ├── summary.js            # Komponent widoku i kontroler karty podsumowania (Symulator Oferty, akcje PDF/schowek)
│       └── toast.js              # Wyświetlanie powiadomień
├── vite.config.js             # Konfiguracja bundlera Vite, minifikacji i kompresji Brotli/Gzip
├── nginx.conf.example            # Wzorzec konfiguracji Nginx pod serwer VPS (gzip_static, brotli, caching)
├── package.json                  # Skrypty npm (dev, build, preview, serve) i zależności
├── netlify.toml                  # Konfiguracja wdrożenia statycznego, nagłówków bezpieczeństwa i cache
├── .gitignore
└── README.md
```

---

## 🚀 Uruchomienie lokalne i budowanie produkcyjne

```bash
# 1. Środowisko deweloperskie (szybki serwer z HMR na porcie 8080)
npm run dev

# 2. Budowanie produkcyjne (bundler Vite + kompresja Gzip i Brotli do folderu dist/)
npm run build

# 3. Podgląd wersji produkcyjnej (preview wygenerowanego folderu dist/)
npm run preview

# 4. Alternatywnie podgląd statyczny przez serwer serve
npm run serve
```

Otwórz w przeglądarce: `http://localhost:8080`
