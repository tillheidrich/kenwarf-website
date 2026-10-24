/**
 * Zentrale Schalter der Marketing-Site (site2).
 *
 * Der Produktname steht NUR hier. Alle Seiten lesen ihn über `inhalt.name`.
 * Name: Kenwarf (Empfehlung N2, 24.10.2026; Arbeitstitel war „Kern“).
 * Zum Umstellen: NAME und CLI ändern, neu bauen. Die Produkt-Screenshots in
 * public/produkt/ zeigen noch „Kern“ und müssen nach dem Namenswechsel neu
 * aus packages/web erzeugt werden.
 */
const NAME = 'Kenwarf';
const CLI = 'kenwarf';
/** Vorschau auf GitHub Pages: Projektseite unter /kenwarf-website/. Muss zu astro.config.mjs (base) passen. */
export const BASIS = '/kenwarf-website';
export const ORIGIN = 'https://tillheidrich.github.io';

export type Modell = 'opensource' | 'lizenz';
export type Stand = 'heute' | 'teilweise' | 'fahrplan';

export const inhalt = {
  name: NAME,
  cli: CLI,
  /** Öffentliche Adresse inklusive Basis-Pfad, ohne Schrägstrich am Ende. */
  domain: `${ORIGIN}${BASIS}`,
  /**
   * Befehl, Umgebungsvariablen und MCP-Werkzeuge heißen im Code noch `kern` (Paketname wird umbenannt).
   * Alle Befehle auf der Website nutzen diese Werte, damit sie mit dem veröffentlichten Code funktionieren.
   */
  befehl: 'kern',
  datenVariable: 'KERN_DATA',
  /** Noch kein veröffentlichtes Image: gebaut wird lokal aus dem Repo. */
  image: `${CLI}:vorschau`,
  /** Link zum Code-Repo. null, solange das Repo nicht öffentlich ist. */
  repoUrl: 'https://github.com/tillheidrich/kenwarf' as string | null,
  repo: `https://github.com/tillheidrich/${CLI}`,
  /** Lizenz ist Tills Entscheidung. Bis dahin wird sie als „vorgesehen“ gekennzeichnet. */
  lizenzName: 'AGPL-3.0-only',
  lizenzEntschieden: true,
  modell: 'opensource' as Modell,

  /**
   * Checkout für den Managed-Weg. Solange null, führt der Knopf zu einer Mail.
   * Später: Mollie-Checkout-URL eintragen, Knopftext bleibt.
   */
  checkoutUrl: null as string | null,
  /** Managed-Betrieb ist entschieden (Till, 24.10.2026, 05:42), aber noch nicht gebaut. */
  managedStatus: 'in Vorbereitung',
  testTage: 14,

  noindex: true,
  prototypHinweis: true,

  kontaktMail: 'info@tillheidrich.de',
  anbieter: 'Heidrich Digital',
  anbieterOrt: 'Tostedt',
  anbieterUrl: 'https://heidrich-digital.de',
} as const;

/** Pfad mit Basis-Pfad versehen (für Stellen, die nicht durch scripts/basis.mjs laufen). */
export const mitBasis = (p: string) => (p.startsWith('/') && !p.startsWith(BASIS + '/') ? BASIS + p : p);
/** Pfad ohne Basis, z. B. für den Vergleich mit Navigationszielen. */
export const ohneBasis = (p: string) => (p.startsWith(BASIS + '/') ? p.slice(BASIS.length) : p);

export const mail = (betreff: string, text: string) =>
  `mailto:${inhalt.kontaktMail}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(text)}`;

export const testphaseHref =
  inhalt.checkoutUrl ??
  mail(
    `Testphase ${NAME}`,
    `Hallo,\n\nich möchte ${NAME} ${inhalt.testTage} Tage testen.\n\nBetrieb:\nWomit anfangen (eigene KI anbinden oder Dateien hochladen):\n\nViele Grüße`,
  );

export const navigation = [
  { href: '/so-funktionierts/', text: 'So funktioniert es' },
  { href: '/start/', text: 'Start in 5 Minuten' },
  { href: '/systemhaus/', text: 'IT und Systemhaus' },
  { href: '/kanzlei/', text: 'Kanzleien' },
  { href: '/schule-verein/', text: 'Schulen und Vereine' },
  { href: '/open-source/', text: 'Quellcode' },
  { href: '/magazin/', text: 'Magazin' },
];

/**
 * Die sechs Stufen (Tills Leitgedanke 05:36, Stufenmodell aus R4).
 * `stand` folgt der Kennzeichnung in research/vision/R4.md: heute | teilweise | fahrplan.
 */
export const stufen = [
  {
    zeit: 'Tag 1 bis 5',
    kurz: 'Tag 1',
    name: 'Erfassen',
    satz: 'Drei Dokumente hinein, die erste Antwort mit Fundstelle heraus.',
    wert: 'Du siehst zum ersten Mal schwarz auf weiß, was dein Betrieb schon weiß, und wo.',
    heute: ['Dateien, Text, Webseiten, PDF und Word hinzufügen', 'Antworten mit wörtlich geprüftem Zitat', '„Steht nicht drin“, wenn nichts passt', 'Import aus Obsidian, Notion, Outline, Confluence, Markdown'],
    fahrplan: ['Import aus ChatGPT- und Claude-Exporten', 'Startassistent für die erste Frage'],
    messen: 'Zeit bis zur ersten belegten Antwort. Gezählt auf deinem Gerät, sichtbar nur für dich.',
    stand: 'heute' as Stand,
    dicke: 1,
  },
  {
    zeit: 'Woche 2 bis 6',
    kurz: 'Woche 2',
    name: 'Es weiß Bescheid',
    satz: 'Du fragst den Ordner statt den Kollegen.',
    wert: 'Fragen werden beantwortet, ohne dass jemand seine Arbeit unterbricht.',
    heute: ['Suche, die deutsche Wortformen und zusammengesetzte Wörter versteht', 'Fakten mit Gültigkeit: Preise, Fristen, Zuständigkeiten', 'Rechte werden vor der Suche geprüft', 'Prüfsuite misst Treffer, Belegtreue und Enthaltung'],
    fahrplan: ['Anzeige, welche Bereiche gut abgedeckt sind', 'Liste der Fragen ohne Antwort'],
    messen: 'Anteil „beantwortet mit Beleg“ gegen „steht nicht drin“, Woche für Woche.',
    stand: 'heute' as Stand,
    dicke: 2,
  },
  {
    zeit: 'Ab Monat 2',
    kurz: 'Monat 2',
    name: 'Es bemerkt',
    satz: 'Der Ordner sagt dir, was veraltet ist oder sich widerspricht.',
    wert: 'Fehler fallen auf, bevor ein Kunde sie bemerkt.',
    heute: ['Widersprüche zwischen Fakten, abgelaufene Fristen, kaputte Fundstellen', 'Prüftermine je Artikel', 'Beobachtete Webseiten melden Änderungen als Vorschlag'],
    fahrplan: ['Widersprüche zwischen Artikeln ohne Faktenfeld, mit Beleg beider Seiten', 'Heute-Seite mit Ampel (im Bau)'],
    messen: 'Gefundene Widersprüche und Fristen je Monat, und wie viele davon ein Mensch bestätigt.',
    stand: 'teilweise' as Stand,
    dicke: 3,
  },
  {
    zeit: 'Ab Monat 3',
    kurz: 'Monat 3',
    name: 'Es arbeitet zu',
    satz: 'Entwurf und Vorgeschichte liegen bereit, du gibst frei.',
    wert: 'Neue Leute arbeiten sich mit dem Ordner ein, nicht mit dem Chef.',
    heute: ['KI schlägt Artikel aus neuen Quellen vor, als Vergleich', 'Zusammenfassung oder Entscheidungsvorlage, nach Wahl'],
    fahrplan: ['Entscheidungen mit ihrer Vorgeschichte', 'Einarbeitungsmappe', 'Entwürfe aus Vorlagen mit Belegen'],
    messen: 'Freigabequote der Vorschläge und die Einarbeitungszeit, die ihr selbst eintragt.',
    stand: 'teilweise' as Stand,
    dicke: 4,
  },
  {
    zeit: 'Ab dem ersten Agenten',
    kurz: 'Jede KI',
    name: 'Kontext für jede KI',
    satz: 'Egal welches Modell: Es arbeitet mit eurem Wissen und euren Rechten.',
    wert: 'Ein Modellwechsel kostet nichts, weil das Wissen nicht im Modell steckt.',
    heute: ['MCP-Server mit Schlüssel je Person', 'KI-Werkzeuge dürfen nur vorschlagen, nie direkt schreiben', 'Anbieter frei wählbar: Claude, ChatGPT/Codex, Gemini (über OpenAI-kompatible Schnittstelle), EU-Anbieter oder lokal', 'Anzeige, welche Daten an welchen Anbieter gehen'],
    fahrplan: ['Anmeldung per OAuth für ChatGPT, Claude und andere ohne Handarbeit', 'Lokales MCP für Installationen hinter VPN', 'Prüfsuite je Modell im Vergleich'],
    messen: 'Prüfsuite-Ergebnis je Modell nebeneinander, Datenweg je Anfrage.',
    stand: 'teilweise' as Stand,
    dicke: 5,
  },
  {
    zeit: 'Bei der Übergabe',
    kurz: 'Übergabe',
    name: 'Es bleibt',
    satz: 'Wenn jemand geht, bleibt sein Wissen lesbar da.',
    wert: 'Ruhestand, Kündigung, Nachfolge: Das Wissen wechselt nicht den Besitzer.',
    heute: ['Markdown-Dateien mit git-Verlauf als einzige Wahrheit', 'Export als ZIP mit Verlauf und im offenen Format OKF', 'Import zurück, mit Rundlauf-Test', 'Endgültiges Löschen nach Art. 17 DSGVO'],
    fahrplan: ['Übergabepaket für Nachfolge und Vertretung', 'Ausstiegsprobe als Knopf'],
    messen: 'Ausstiegsprobe: Export, leere Instanz, Import, gleiches Prüfergebnis.',
    stand: 'heute' as Stand,
    dicke: 6,
  },
];

export const standText: Record<Stand, string> = {
  heute: 'läuft heute',
  teilweise: 'teilweise',
  fahrplan: 'Fahrplan',
};
