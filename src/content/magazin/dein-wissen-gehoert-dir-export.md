---
titel: "Dein Wissen gehört dir: Export als Grundprinzip"
beschreibung: "Seit September 2025 verpflichtet der EU Data Act Cloud-Anbieter, den Wechsel zu ermöglichen. Ab Januar 2027 darf der Wechsel nichts mehr kosten. Was das für einen Wissensordner heißt."
datum: 2026-10-24
position: 3
zielgruppen: [betriebe, it, schule-verein]
stufen: [6]
foto: haus-sunne
fotoAlt: "Ein altes, rot gestrichenes Holzhaus mit weißen Fensterrahmen auf einer Wiese, dahinter Birken."
fotoOrt: "Altes Haus bei Sunne, Schweden"
fokus: "50% 42%"
---

Wer sein Betriebswissen in ein Werkzeug steckt, sollte vorher eine Frage beantworten können: Wie bekomme ich es wieder heraus, vollständig und in einer Form, die ich ohne dieses Werkzeug lesen kann?

Bei vielen KI-Diensten ist die ehrliche Antwort: gar nicht oder nur in Teilen. Der Kontext steckt im Konto des Anbieters. Wechselt der Anbieter seine Preise, stellt er einen Dienst ein oder kaufst du woanders ein, fängst du von vorn an.

## Was der Data Act vorschreibt

Die EU-Datenverordnung (Verordnung (EU) 2023/2854, „Data Act“) regelt in Kapitel VI den Wechsel zwischen Datenverarbeitungsdiensten, also Cloud- und SaaS-Angeboten. Die Bundesnetzagentur fasst die Pflichten der Anbieter so zusammen ([Bundesnetzagentur, Data Act, Pflichten der Anbieter](https://bundesnetzagentur.de/EN/Areas/Digitalisation/DataAct/background/3-provider/start.html)):

- Anbieter müssen Hindernisse für einen Wechsel beseitigen (Art. 23).
- Nach einem Wechselwunsch gilt eine Übergangszeit von höchstens 30 Kalendertagen (Art. 25 Abs. 2 Buchst. a). Ist das technisch nicht machbar, muss der Anbieter das binnen 14 Arbeitstagen begründen und darf auf höchstens sieben Monate verlängern.
- Nach dem Wechsel müssen die Daten noch mindestens 30 Tage abrufbar sein.
- Vom 11. Januar 2024 bis 11. Januar 2027 dürfen Anbieter für den Wechsel nur die direkten Kosten berechnen. Ab dem 12. Januar 2027 darf der Wechsel nichts mehr kosten (Art. 29 Abs. 1).
- Kapitel VI gilt seit dem 12. September 2025, für neue und bestehende Verträge.

Den Verordnungstext gibt es bei [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2023/2854/oj). Diese Zusammenfassung ist keine Rechtsberatung. Ob und wie die Pflichten für einen bestimmten Dienst gelten, prüft im Zweifel eine Anwältin.

## Was wir daraus machen

Bei Kenwarf ist der Export im Aufbau angelegt. Quellen, Artikel und Fakten liegen als Markdown-Dateien in einem Ordner, und du öffnest jede Datei mit jedem Editor, auch ohne Kenwarf. Jede Freigabe ist ein Eintrag in git, mit Name, Datum und Grund.

Exportieren kannst du jederzeit, als ZIP mit vollständigem Verlauf oder im offenen Format OKF. Der Import zurück läuft mit einem Rundlauf-Test, der prüft, ob nach dem Import dasselbe herauskommt. Den Suchindex baut Kenwarf bei Bedarf aus den Dateien neu. Geht die Datenbank kaputt, ist nichts verloren.

Wer beim Managed-Betrieb anfängt, zieht über denselben Weg in die eigene Cloud oder auf einen Server im Haus um: Export, Import, Prüfung, alte Instanz abschalten. Das geht auch zurück.

## Wann man es braucht

Selten wegen eines Anbieterstreits. Häufiger, weil sich Menschen ändern: Die Inhaberin geht in den Ruhestand, das Systemhaus wechselt, der Vorstand im Verein wird neu gewählt. Dann zählt, ob das Wissen in einer Form vorliegt, die auch in fünf Jahren noch jemand lesen kann.

Auf dem Fahrplan steht deshalb eine Ausstiegsprobe als Knopf: Export, leere Instanz, Import und Prüfsuite in einem Lauf. Kommt dasselbe Ergebnis heraus, weißt du, dass der Ausstieg funktioniert, bevor du ihn brauchst.

## Quellen

- Verordnung (EU) 2023/2854 (Data Act), Amtsblatt der EU. Primärquelle. [eur-lex.europa.eu/eli/reg/2023/2854/oj](https://eur-lex.europa.eu/eli/reg/2023/2854/oj)
- Bundesnetzagentur, „Data Act: Obligations of providers of data processing services“, abgerufen 24.10.2026. Behörde, Zusammenfassung mit Artikelangaben. [bundesnetzagentur.de](https://bundesnetzagentur.de/EN/Areas/Digitalisation/DataAct/background/3-provider/start.html)
