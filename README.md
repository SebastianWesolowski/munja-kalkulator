# Munja · Baila Warsaw · NINE’s — Kalkulator Oferty

Interaktywny, responsywny kalkulator oferty i symulator kosztów opieki technicznej oraz rozwoju serwisów grupy restauracyjnej (**Munja · Baila Warsaw · NINE’s Restaurant & Sports Bar**).

Zbudowany w czystym **HTML5, CSS3 i Vanilla JavaScript** (bez zewnętrznych bibliotek, bez bundlerów, natychmiastowe ładowanie, gotowy na wdrożenie statyczne na Netlify).

- **Domena docelowa:** [munja-kalkulator.wesolowski.dev](https://munja-kalkulator.wesolowski.dev)
- **Hosting:** Netlify (statyczny, szybki, bezpieczny)

---

## 🧭 Założenia i model oferty (26.10.2026 r.)

Kalkulator odwzorowuje strukturę etapów i cennik ze szkicu współpracy:

1. **Krok 1: Pilotaż Munji (XI / XII 2026 r.)**
   - **Pakiet 20 godzin za 3 000 zł netto** (150 zł/h).
   - Osobno zamawiany etap startowy (nie uruchamia automatycznie opłat stałych).
   - Cel: naprawa formularza mobilnego, odciążenie wideo grilla (zostaje na stronie, ale lżejszy plik + poster), skrócenie LCP i TTFB, ekspozycja telefonu i godzin.

2. **Krok 2: Wdrożenie nowej infrastruktury i Setup Fee (od I 2027 r.)**
   - **Setup Fee: 3 000 zł jednorazowo netto**.
   - Dedykowany serwer VPS w DataHouse Warszawa (4 vCPU, 8 GB RAM, 100 GB NVMe).
   - Konsolidacja 5 domen od 4 rejestratorów w hurtowym modelu partnera technologicznego (model win-win bez skoków cen).
   - Konfiguracja zabezpieczeń poczty: SPF, DKIM, DMARC (ochrona zarządu przed CEO spoofingiem).

3. **Krok 3: Stała obsługa miesięczna (od I 2027 r.)**
   - **Baza technologiczna grupy: 1 450 zł/mies. netto**:
     - Nadzór techniczny, monitoring 24/7, kopie i SLA (750 zł/m.)
     - Publikacja treści w CMS do 9h łącznie (500 zł/m.)
     - Dedykowany VPS Warszawa (150 zł/m.)
     - Pakiet 5 domen (50 zł/m.)
   - **Pula rozwoju serwisów grupy**:
     - **Pakiet 20 godzin (Rekomendowany):** 3 200 zł/mies. (160 zł/h, z przenoszeniem godzin na kolejny miesiąc)
     - **Pakiet 10 godzin:** 1 700 zł/mies. (170 zł/h)
     - **Brak stałego pakietu (0h):** 0 zł/mies. (rozliczenia doraźne 200 zł/h)
   - **Opcje dodatkowe**:
     - Licencje pocztowe Google Workspace (np. 9 kont × 35 zł/konto/mies.)
     - Dodatkowe godziny doraźne (200 zł/godz.)

---

## ⚡ Główne funkcjonalności kalkulatora

- **Szybkie profile wyceny (Presets)**:
  - `Rekomendowany`: Baza + Rozwój 20h = 4 650 zł/mies. netto (Start: 6 000 zł)
  - `Zrównoważony`: Baza + Rozwój 10h = 3 150 zł/mies. netto (Start: 6 000 zł)
  - `Sama Baza`: Nadzór + CMS + VPS + Domeny = 1 450 zł/mies. netto (Start: 6 000 zł)
  - `Tylko Pilotaż Munji`: 3 000 zł jednorazowo netto
- **Przełącznik Netto / Brutto**: Błyskawiczny podgląd kwot z podatkiem VAT 23% na kartach i w podsumowaniu.
- **Kopiowanie sformatowanej oferty**: Przycisk generuje czytelny szablon podsumowania gotowy do wklejenia do wiadomości e-mail dla Martyny.
- **Druk / Eksport do PDF**: Dedykowany arkusz `@media print` przygotowujący raport do wydruku lub zapisu w formacie PDF.
- **Baza wiedzy / FAQ**: Rozwijane akordeony wyjaśniające model Win-Win dla domen, dedykowany VPS oraz zasady przenoszenia godzin.

---

## 📁 Struktura Projektu

```text
munja-kalkulator/
├── index.html        # Szablon semantyczny z krokami, presetami i widokiem podsumowania
├── css/
│   └── style.css     # Design system (Plus Jakarta Sans, paleta Slate/Amber/Blue, print styles)
├── js/
│   └── app.js        # Silnik kalkulacji, tryby Netto/Brutto, generowanie tekstu do schowka
├── netlify.toml      # Konfiguracja wdrożenia statycznego i nagłówków bezpieczeństwa
├── .gitignore
└── README.md
```

---

## 🚀 Uruchomienie lokalne

```bash
# Uruchomienie serwera HTTP w katalogu projektu
python3 -m http.server 8080
# lub
npx serve .
```

Otwórz w przeglądarce: `http://localhost:8080`
