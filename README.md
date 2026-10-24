# Kenwarf – Website (Vorschau)

Marketing-Website für [Kenwarf](https://github.com/tillheidrich/kenwarf), einen Wissensordner für Betriebe, der nur mit Beleg antwortet und dir gehört.

**Stand: Vorschau, noch nicht gestartet.** Alle Seiten tragen `noindex`. Managed-Dienst, Testphase und Preise gibt es noch nicht.

Live: https://tillheidrich.github.io/kenwarf-website/ (sobald GitHub Pages eingeschaltet ist)

## Bauen

```sh
npm ci
npm run build      # astro build + scripts/basis.mjs (Basis-Pfad /kenwarf-website)
```

Prüfen (axe, fremde Anfragen, Cookies, Links, RSS) gegen eine laufende Adresse:

```sh
BASIS=https://tillheidrich.github.io/kenwarf-website node scripts/pruefen.mjs
```

Produktname, Befehle und Schalter stehen zentral in `src/inhalt.ts`. Veröffentlicht wird per GitHub Actions (`.github/workflows/pages.yml`).

## Rechte

Code der Website: © Till Heidrich. Fotos: Till Heidrich, alle Rechte vorbehalten. Schriften: Archivo und Martian Mono (SIL Open Font License) über Fontsource.

Der Quellcode des Produkts liegt in einem eigenen Repo unter AGPL-3.0-only.
