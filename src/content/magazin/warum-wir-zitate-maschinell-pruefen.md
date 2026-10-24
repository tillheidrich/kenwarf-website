---
titel: "Warum wir jedes Zitat maschinell prüfen"
beschreibung: "Eine KI-Antwort mit Quellenangabe wirkt belegt. Studien zeigen, wie oft der Beleg die Aussage nicht trägt. Was eine Zitatprüfung leistet und was nicht."
datum: 2026-10-24
position: 2
zielgruppen: [betriebe, it, kanzleien]
stufen: [1, 2]
foto: sternwarte
fotoAlt: "Blick nach oben in die Holzkuppel einer Sternwarte, durch den offenen Spalt der Nachthimmel, davor ein Fernrohr."
fotoOrt: "Kuppel einer Sternwarte bei einer Führung"
fokus: "50% 35%"
---

Eine Antwort mit kleiner Fußnote sieht vertrauenswürdig aus. Ob die Fußnote die Aussage wirklich stützt, prüft kaum jemand nach. Genau da liegt das Problem.

## Was die Forschung gemessen hat

Eine Gruppe der Stanford University hat 2023 vier generative Suchmaschinen von Menschen prüfen lassen. Im Schnitt waren nur 51,5 % der erzeugten Sätze vollständig durch die angegebenen Quellen gedeckt, und nur 74,5 % der Quellenangaben stützten den Satz, an dem sie standen ([Liu, Zhang, Liang, arXiv 2304.09848](https://arxiv.org/abs/2304.09848)). Die geprüften Dienste gibt es teils nicht mehr in dieser Form, die Zahlen sind also eine Momentaufnahme. Die Methode ist trotzdem lehrreich: Menschen haben jeden Satz gegen seine Quelle gelesen.

2024 hat eine Gruppe um Jonas Wallat eine zweite Frage gestellt. Nicht nur „stützt die Quelle die Aussage?“, sondern „hat das Modell die Quelle überhaupt benutzt?“. Ergebnis: Bis zu 57 % der Zitate waren nachträglich passend gemacht. Das Modell hatte die Antwort aus seinem eigenen Vorwissen geschrieben und danach eine Quelle gesucht, die dazu passt ([Wallat u. a., „Correctness is not Faithfulness in RAG Attributions“, arXiv 2412.18004](https://arxiv.org/abs/2412.18004)). Die Messung betrifft ein Modell und einen Datensatz. Sie zeigt aber, dass „richtig zitiert“ und „ehrlich zitiert“ zwei verschiedene Dinge sind.

## Was Kenwarf prüft

Bei Kenwarf bekommt das Modell nur die gefundenen Abschnitte aus deinem Ordner, jeweils mit Nummer. Jeder Punkt der Antwort muss einer Nummer zugeordnet sein und ein Zitat enthalten. Dann prüft Kenwarf ohne KI, ob dieses Zitat wörtlich im angegebenen Zeilenbereich der Datei steht. Steht es dort nicht, fliegt der Beleg raus und mit ihm der Punkt. Bleibt kein belegter Punkt übrig, lautet die Antwort „steht nicht drin“.

Die Prüfung ist bewusst stur. Sie vergleicht Text mit Text. Ein Modell kann sie nicht überreden.

## Was die Prüfung nicht leistet

Die Zitatprüfung beweist, dass der Beleg existiert und wörtlich stimmt. Sie beweist nicht, dass das Modell seine Antwort aus diesem Beleg abgeleitet hat. Das ist genau die Lücke, die Wallat beschreibt. Ein Modell kann einen echten Satz aus deiner Datei zitieren, der nur so ähnlich klingt wie die Antwort.

Deshalb gilt zweierlei:

- Du siehst bei jeder Antwort die Fundstelle mit Datei und Zeile und kannst sie öffnen. Bei wichtigen Fragen solltest du das tun.
- Ins Wissen kommt nichts ohne Freigabe durch einen Menschen. Die KI schlägt vor, ein Mensch entscheidet.

Auf dem Fahrplan steht eine Erweiterung der Prüfsuite um Fälle, in denen ein naheliegender Abschnitt die Antwort gerade nicht stützt. Damit lässt sich messen, wie oft ein Modell auf den „falschen Nachbarn“ hereinfällt.

## Wie wir messen

Kenwarf bringt eine Prüfsuite mit, die drei Dinge ohne KI-Richter zählt: ob die erwartete Fundstelle unter den ersten fünf Treffern ist, ob das Zitat wörtlich im Zeilenbereich steht, und ob bei einer Fangfrage „steht nicht drin“ kommt. Dazu zählt sie, ob jemand einen Abschnitt zu sehen bekam, den er nicht sehen darf.

Die Werte, die wir bisher haben, stammen aus dem Testmodus ohne echtes Modell. Sie zeigen, dass die Mechanik funktioniert, nicht, wie gut ein bestimmtes Modell mit deinen Unterlagen ist. Das misst du am besten selbst: 20 bis 30 eigene Fragen mit erwarteter Fundstelle anlegen und zwei Modelle vergleichen, bevor du dich festlegst.

## Quellen

- Nelson F. Liu, Tianyi Zhang, Percy Liang, „Evaluating Verifiability in Generative Search Engines“, Findings of EMNLP 2023. Menschliche Bewertung, vier Dienste, Stand 2023. [arxiv.org/abs/2304.09848](https://arxiv.org/abs/2304.09848)
- Jonas Wallat, Maria Heuss, Maarten de Rijke, Avishek Anand, „Correctness is not Faithfulness in RAG Attributions“, 2024. Ein Modell, ein Datensatz; Aussage „bis zu 57 %“ laut Zusammenfassung. [arxiv.org/abs/2412.18004](https://arxiv.org/abs/2412.18004)
