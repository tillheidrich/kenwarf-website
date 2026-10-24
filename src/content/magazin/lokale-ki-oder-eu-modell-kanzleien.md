---
titel: "Lokale KI oder EU-Modell: Was Kanzleien wissen müssen"
beschreibung: "Kanzleiwissen mit KI befragen, ohne die Verschwiegenheit zu gefährden. Zwei Fragen, drei Aufbauten und die Vorschriften, die dabei zählen."
datum: 2026-10-24
position: 4
zielgruppen: [kanzleien, it]
stufen: [2, 5]
foto: rechenzentrum-greifswald
fotoAlt: "Serverschränke mit grün leuchtenden Statuslichtern in einem abgedunkelten Raum, vorne ein Rollwagen mit Laptop."
fotoOrt: "Rechenzentrum der Universität Greifswald, Foto: Till Heidrich"
fokus: "40% 50%"
---

Viele Kanzleien würden ihr Kanzleiwissen gern mit KI befragen: Abläufe, Vorlagen, Fristenregeln, das Kanzleihandbuch. Die Sorge ist berechtigt. Wer Mandatsgeheimnisse an eine Stelle gibt, die nicht zur Verschwiegenheit verpflichtet ist, riskiert mehr als eine Datenpanne.

Dieser Beitrag ist keine Rechtsberatung. Er ordnet, welche Fragen Sie vor dem Einsatz klären sollten.

## Zwei Fragen, die oft vermischt werden

Erstens: Wo liegt das Wissen? Bei Kenwarf in einem Datenordner auf einem Server, den Sie bestimmen: im Büro, bei Ihrem Systemhaus oder als eigene Instanz bei einem Hoster in Deutschland.

Zweitens: Wohin geht eine Frage? An das KI-Modell, das in Kenwarf eingestellt ist. Mitgeschickt werden die Frage und nur die Abschnitte, die die fragende Person sehen darf. Kenwarf zeigt unter Einstellungen, an welchen Anbieter und welchen Endpunkt die Daten gehen.

Jede Stelle, die dabei Klartext sehen kann, zählt.

## Die Vorschriften

- **§ 203 StGB** stellt das unbefugte Offenbaren von Mandatsgeheimnissen unter Strafe. Absatz 3 erlaubt, Geheimnisse Personen zugänglich zu machen, die an der beruflichen Tätigkeit mitwirken, soweit das erforderlich ist. Absatz 4 macht auch die Kanzlei strafbar, die nicht für die Verpflichtung dieser Personen gesorgt hat ([§ 203 StGB](https://www.gesetze-im-internet.de/stgb/__203.html)).
- **§ 43e BRAO** und **§ 62a StBerG** sind gleich aufgebaut: Dienstleister sorgfältig auswählen, Vertrag in Textform, Verpflichtung zur Verschwiegenheit mit Belehrung über die strafrechtlichen Folgen, Zugang nur soweit nötig. Für Dienstleistungen im Ausland muss der Schutz vergleichbar sein ([§ 43e BRAO](https://www.gesetze-im-internet.de/brao/__43e.html), [§ 62a StBerG](https://www.gesetze-im-internet.de/stberg/__62a.html)).
- Nach Lesart der Bundesrechtsanwaltskammer genügt schon die bloße Möglichkeit der Kenntnisnahme (BRAK, Leitfaden zum Einsatz von KI, Stand Dezember 2024).
- Die **DSGVO** gilt daneben, insbesondere Art. 28 (Auftragsverarbeitung) und Art. 32 (technische und organisatorische Maßnahmen).

Daraus folgt eine einfache Regel: Je weniger Stellen Klartext sehen können, desto weniger Verträge brauchen Sie und desto kleiner ist das Risiko.

## Drei Aufbauten

**1. Vollständig lokal.** Kenwarf und das Modell laufen im Netz der Kanzlei, das Modell zum Beispiel über Ollama auf eigener Hardware. Solange keine Webseiten beobachtet werden, verlässt nichts das Haus. Der Preis: kleinere Modelle, Hardware, Pflege. Ob ein kleines Modell für Ihre Fragen gut genug ist, sollten Sie vorher messen, nicht glauben.

**2. EU-Modellanbieter.** Kenwarf läuft bei Ihnen oder Ihrem Systemhaus, das Modell kommt von einem Anbieter in der EU, zum Beispiel IONOS, STACKIT oder Mistral mit EU-Endpunkt. Hier brauchen Sie einen Vertrag mit dem Anbieter, der die Verschwiegenheit nach § 43e BRAO beziehungsweise § 62a StBerG abdeckt. Lassen Sie sich Speicherung, Training und Unterauftragnehmer schriftlich bestätigen, statt sich auf Werbeseiten zu verlassen.

**3. Managed mit EU-Modell.** Kenwarf läuft als eigene Instanz der Kanzlei bei einem Hoster in Deutschland, betrieben von Heidrich Digital. Das ist für Kanzleien ohne eigene IT der einfachste Weg, hat aber die längste Kette: Kanzlei, Betreiber, Hoster, Modellanbieter. Wir empfehlen, den Modellvertrag direkt zwischen Kanzlei und Anbieter zu schließen. Ob das Standard-AV-Vertragswerk eines Hosters für § 203 StGB reicht, ist eine offene Frage für die anwaltliche Prüfung.

Die Kanzleiseite fasst die drei Aufbauten mit Empfehlung zusammen: [Kanzleien](/kanzlei/).

## Ein ehrlicher Haken

Wer zusätzlich ein KI-Programm wie Claude oder ChatGPT über MCP an den Wissensordner anschließt, schickt Suchtreffer an dessen Anbieter, auch wenn Kenwarf selbst lokal läuft. Ohne Verschwiegenheitsvereinbarung mit diesem Anbieter gehört so eine Verbindung höchstens an einen Bereich ohne Bezug zu Mandaten.

Und eine Hausregel gilt für alle drei Aufbauten: Mandatsakten, Mandantennamen in Beispielen und Fristen einzelner Mandate kommen nicht in den Ordner. Das senkt das Risiko, hebt die Pflichten aber nicht auf.

## Quellen

- § 203 StGB, § 43e BRAO, § 62a StBerG, Gesetze im Internet (Bundesministerium der Justiz). Primärquellen; Wiedergabe sinngemäß, für Zitate den Originaltext nehmen.
- Bundesrechtsanwaltskammer, Leitfaden zum Einsatz von KI-Systemen, Stand 12/2024. Kammer, Sekundärquelle.
- Verordnung (EU) 2016/679 (DSGVO), Art. 28 und 32. [eur-lex.europa.eu/eli/reg/2016/679/oj](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
