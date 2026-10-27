# Munja · Baila Warsaw · NINE’s — Kalkulator Oferty

Interaktywny, responsywny kalkulator oferty i symulator kosztów opieki technicznej oraz rozwoju serwisów grupy restauracyjnej (**Munja · Baila Warsaw · NINE’s Restaurant & Sports Bar**).

Zbudowany w czystym **HTML5, CSS3 i Vanilla JavaScript** (bez zewnętrznych bibliotek, bez bundlerów, natychmiastowe ładowanie, gotowy na wdrożenie statyczne na Netlify).

- **Domena docelowa:** [munja-kalkulator.wesolowski.dev](https://munja-kalkulator.wesolowski.dev)
- **Hosting:** Netlify (statyczny, szybki, bezpieczny)

---

## 🧭 Założenia i model oferty (26.10.2026 r.)

Kalkulator odwzorowuje strukturę etapów i cennik ze szkicu współpracy:

1. **Krok 1: Pilotaż Munji (XI / XII 2026 r.)**
   - **Pakiet szybkich usprawnień za 4 000 zł netto** (bez zobowiązań abonamentowych).
   - Osobno zamawiany etap startowy przed decyzją o stałej umowie.
   - Zakres: poprawka formularza rezerwacji na telefonach (utrata wpisanych danych), skrócenie czasu ładowania przez odciążenie multimediów (zostaje wideo z grillem), załatanie analityki pod kątem zgód cookie / RODO.

2. **Krok 2: Wdrożenie nowej infrastruktury i Setup Fee (od I 2027 r.)**
   - **Setup Fee: zależny od bazy infrastruktury (do 3 000 zł jednorazowo netto)**:
     - Dedykowany serwer VPS: 2 000 zł jednorazowo (uruchomienie 4 vCPU, 8 GB RAM, 100 GB NVMe i migracja 3 serwisów).
     - Pakiet 5 domen: setup fee obniżony do 1 000 zł jednorazowo w pakiecie z ryczałtem domen (konsolidacja od 4 rejestratorów).
   - Zabezpieczenia poczty (SPF, DKIM, DMARC chroniące zarząd przed CEO spoofingiem) konfigurowane są w ramach opieki nad pocztą (Krok 4C).

3. **Krok 3: Stała obsługa miesięczna (od I 2027 r.)**
   - **Baza technologiczna grupy: 1 450 zł/mies. netto**:
     - Nadzór techniczny, monitoring 24/7, kopie i SLA (750 zł/mies.)
     - Publikacja treści w CMS do 9h łącznie (500 zł/mies.)
     - Dedykowany serwer VPS (150 zł/mies.)
     - Pakiet 5 domen (50 zł/mies.)
   - **Pula rozwoju serwisów grupy**:
     - **Pakiet 20 godzin (Rekomendowany na start):** 3 200 zł/mies. (z przenoszeniem godzin)
     - **Pakiet 10 godzin (Docelowy od 4. miesiąca):** 1 700 zł/mies.
     - **Brak stałego pakietu (0h):** 0 zł/mies. (rozliczenia doraźne 200 zł/h)
   - **Opcje dodatkowe**:
     - Licencje pocztowe Google Workspace (np. 9 kont × 35 zł/konto/mies.)
     - Dodatkowe godziny doraźne (200 zł/godz.)

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
├── css/
│   ├── style.css                 # Główny arkusz importujący moduły komponentów
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
│       ├── summary.js            # Kontroler panelu podsumowania i akcji (PDF, schowek)
│       └── toast.js              # Wyświetlanie powiadomień
├── package.json                  # Konfiguracja skryptów npm i serwera lokalnego
├── netlify.toml                  # Konfiguracja wdrożenia statycznego i nagłówków bezpieczeństwa
├── .gitignore
└── README.md
```

---

## 🚀 Uruchomienie lokalne

```bash
# Uruchomienie serwera lokalnego przez npm
npm run dev
# lub npm start

# Alternatywnie bezpośrednio przez Python
python3 -m http.server 8080
```

Otwórz w przeglądarce: `http://localhost:8080`
