---
titel: "Was dein Kontext nach Tag 1, Woche 2 und Monat 3 wert ist"
beschreibung: "Ein KI-Wissensordner ist am ersten Tag wenig wert und nach drei Monaten viel. Woran du den Unterschied messen kannst, ohne dass jemand mitzählt."
datum: 2026-10-24
position: 1
zielgruppen: [betriebe, it]
stufen: [1, 2, 3]
foto: gewaechshaus-greifswald
fotoAlt: "Blick durch ein Gewächshaus: dicht bewachsene Beete, ein mit Kletterpflanzen bedeckter Pfeiler, hinten eine weiße Tür und Glasdach."
fotoOrt: "Gewächshaus, Botanischer Garten Greifswald"
fokus: "50% 40%"
---

Die meisten Angebote rund um „AI Brain“ verkaufen den ersten Tag. Dokumente hochladen, Frage stellen, staunen. Das funktioniert, und es ist auch der Anfang bei Kenwarf. Interessant wird es aber erst danach: Was hast du nach zwei Wochen, nach drei Monaten, und was bleibt, wenn jemand den Betrieb verlässt?

Wir beschreiben das in sechs Stufen. Hier geht es um die ersten drei, weil man sie heute schon ausprobieren kann. Bei jeder steht, woran du selbst merkst, ob sie erreicht ist.

## Tag 1 bis 5: Erfassen

Am ersten Tag legst du ein paar Dateien in den Ordner: ein Preisblatt, die Notiz zur Reklamation, die Mail mit der neuen Lieferfrist. Kenwarf beantwortet Fragen dazu nur mit einem Zitat, das wörtlich in der Datei steht. Findet es nichts Passendes, sagt es „steht nicht drin“.

Das klingt bescheiden. Der Wert liegt woanders: Du siehst zum ersten Mal schwarz auf weiß, was dein Betrieb schon aufgeschrieben hat und was nur im Kopf von zwei Leuten existiert. Jede Antwort „steht nicht drin“ ist eine Lücke, die du jetzt kennst.

Selbst messen: die Zeit bis zur ersten belegten Antwort. Gezählt wird auf deinem Gerät.

## Woche 2 bis 6: Es weiß Bescheid

Nach ein paar Wochen ist genug im Ordner, dass Kolleginnen und Kollegen den Ordner fragen statt einander. Dafür muss die Suche mehr können als Stichwörter. Sie muss deutsche Wortformen und zusammengesetzte Wörter verstehen („Lieferzeit“ findet auch „Lieferzeiten für Beschläge“), Fakten mit Gültigkeit kennen (Preis gilt bis 31.12.) und vor der Suche prüfen, was jemand sehen darf.

Warum nicht einfach alles in ein großes Modell kippen? Weil lange Eingaben die Antworten verschlechtern. Die Firma Chroma hat 18 Modelle getestet und gemessen, dass die Zuverlässigkeit mit der Länge der Eingabe sinkt, auch bei einfachen Aufgaben ([Chroma, „Context Rot“, 14.07.2025](https://trychroma.com/research/context-rot)). Chroma verkauft eine Vektordatenbank und hat also ein Interesse an diesem Ergebnis, legt die Methode aber offen. Unabhängig davon kommt die Studie NoLiMa auf der ICML 2025 zum selben Bild: 10 von 12 Modellen fielen bei 32.000 Tokens unter die Hälfte ihres Werts bei kurzen Eingaben ([Modarressi u. a., NoLiMa](https://proceedings.mlr.press/v267/modarressi25a.html)).

Für dich heißt das: Ein gepflegter Ordner mit kleinen, belegten Abschnitten ist mehr wert als ein riesiger Stapel, den man dem Modell auf einmal gibt.

Selbst messen: den Anteil „beantwortet mit Beleg“ gegenüber „steht nicht drin“, Woche für Woche. Steigt der erste Wert, wächst der Ordner an den richtigen Stellen.

## Ab Monat 2: Es bemerkt

Wissen veraltet. Ein Preis läuft ab, eine Zuständigkeit wechselt, zwei Dokumente sagen Verschiedenes zur Gewährleistung. Ab dieser Stufe meldet Kenwarf solche Stellen: Widersprüche zwischen Fakten, abgelaufene Fristen, Fundstellen, die nicht mehr existieren, und Artikel, deren Prüftermin überschritten ist.

Was heute läuft und was noch nicht, sagen wir offen. Widersprüche zwischen Fakten mit festem Feld (Preis, Frist, Zuständigkeit) erkennt Kenwarf heute. Widersprüche zwischen frei geschriebenen Artikeln, mit Beleg beider Seiten, stehen auf dem Fahrplan. Die Heute-Seite mit Ampel ist im Bau.

Wichtig ist, wer entscheidet. Die KI darf melden und vorschlagen. Welche Fassung gilt, entscheidet ein Mensch, und die Entscheidung steht mit Namen und Grund im Verlauf.

Selbst messen: gefundene Widersprüche und Fristen je Monat, und wie viele davon ein Mensch bestätigt hat. Werden die meisten Meldungen abgelehnt, ist die Prüfung zu empfindlich eingestellt.

## Warum das mehr wert wird und nicht weniger

Modelle werden jedes Jahr billiger und lassen sich austauschen. Was in deinem Ordner steht, lässt sich nicht kaufen: wie ihr kalkuliert, wer über Kulanz entscheidet, warum der Lackraum zehn Minuten nachlüftet. Je länger ihr pflegt, desto mehr Fragen beantwortet der Ordner, und desto teurer wäre es, ihn zu verlieren. Deshalb liegt alles als Textdatei mit Verlauf in einem Ordner, den du jederzeit exportierst.

Die Stufen 4 bis 6 (es arbeitet zu, Kontext für jede KI, es bleibt) beschreiben wir in eigenen Beiträgen. Eine Übersicht mit Kennzeichnung, was heute läuft, steht auf der Seite [So funktioniert es](/so-funktionierts/).

## Quellen

- Chroma Research, „Context Rot: How Increasing Input Tokens Impacts LLM Performance“, 14.07.2025. Hersteller einer Vektordatenbank, Methode offen. [trychroma.com/research/context-rot](https://trychroma.com/research/context-rot)
- Modarressi u. a., „NoLiMa: Long-Context Evaluation Beyond Literal Matching“, ICML 2025, begutachtet. [proceedings.mlr.press/v267/modarressi25a.html](https://proceedings.mlr.press/v267/modarressi25a.html)
