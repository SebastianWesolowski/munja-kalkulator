# Munja — Kalkulator Oferty

Ultra prosty, przejrzysty i responsywny kalkulator oferty przygotowany w czystym HTML5, CSS3 i Vanilla JavaScript (bez zewnętrznych zależności i bez skomplikowanego builda).

- **Domena docelowa:** [munja-kalkulator.wesolowski.dev](https://munja-kalkulator.wesolowski.dev)
- **Hosting:** Netlify (statyczny, gotowy do wdrożenia)

---

## 📁 Struktura Projektu

```text
munja-kalkulator/
├── index.html        # Główny szablon z semantyczną strukturą HTML5
├── css/
│   └── style.css     # Nowoczesny, czysty design system (CSS Variables, Flexbox/Grid)
├── js/
│   └── app.js        # Logika obliczeń, formatowanie walut, live update, kopiowanie do schowka
├── netlify.toml      # Konfiguracja wdrożenia i nagłówków bezpieczeństwa na Netlify
├── .gitignore        # Pliki ignorowane w repozytorium
└── README.md
```

---

## 🚀 Uruchomienie lokalne

Ponieważ projekt to czysty HTML/JS/CSS, wystarczy otworzyć `index.html` w przeglądarce lub skorzystać z dowolnego lokalnego serwera HTTP:

```bash
# Python 3
python3 -m http.server 8080

# Lub npx serve
npx serve .
```

---

## ⚡ Wdrożenie na Netlify

1. Wystarczy podpiąć repozytorium pod Netlify lub użyć Netlify CLI:
   ```bash
   npx netlify deploy --prod
   ```
2. Podpiąć domenę niestandardową: `munja-kalkulator.wesolowski.dev`.
