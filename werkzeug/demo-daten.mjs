// Erzeugt src/demo.json aus der echten Engine (Testmodus ohne KI, Beispieldaten Tischlerei Wendt).
// Aufruf aus kern/site2: node werkzeug/demo-daten.mjs "<Frage>" …   (braucht repo/packages/core/dist)
// Neben der Antwort schreibt das Skript für jeden Beleg den passenden Fakt (Gültigkeit) und den
// git-Verlauf der Datei, die den Beleg trägt. Daraus entstehen Etikett und Zettel des Belegbogens.
import { Kern, seedDemo } from '../../repo/packages/core/dist/index.js';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const jetzt = new Date();
const datum = (d) => new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin' });
const dir = mkdtempSync(join(tmpdir(), 'kenwarf-demo-'));
const heute = () => jetzt;
await seedDemo(dir, { heute, passwort: 'nur-fuer-die-demo' });
const k = await Kern.open({ dataDir: dir, provider: { art: 'mock' }, betrieb: 'Tischlerei Wendt', sprache: 'de', heute });
const lena = await k.benutzer.pruefe('Lena Meyer', 'nur-fuer-die-demo');
if (!lena) throw new Error('Demo-Anmeldung fehlgeschlagen');
const fakten = await k.fakten(lena, {});
const verlauf = async (pfad) => (await k.verlauf(pfad)).map((v) => ({ commit: v.commit.slice(0, 7), von: v.von, am: datum(v.am), grund: v.grund }));

const fragen = process.argv.slice(2);
const out = [];
for (const f of fragen) {
  const a = await k.frage(lena, f);
  const belege = [];
  for (const b of a.belege) {
    const zeilen = readFileSync(join(dir, b.quelle), 'utf8').split('\n');
    const von = Math.max(1, b.zeilen[0] - 2), bis = Math.min(zeilen.length, b.zeilen[1] + 2);
    const umgebung = [];
    for (let i = von; i <= bis; i++) umgebung.push({ nr: i, text: zeilen[i - 1], treffer: i >= b.zeilen[0] && i <= b.zeilen[1] });
    const fakt = fakten.find((x) => x.beleg && x.beleg.quelle === b.quelle && x.beleg.zeilen[0] <= b.zeilen[1] && x.beleg.zeilen[1] >= b.zeilen[0]) ?? null;
    // Verlauf: Artikel, der den Fakt trägt; sonst die Datei des Belegs selbst.
    const traeger = fakt ? fakt.artikel : b.quelle;
    belege.push({
      ...b,
      geprueft: await k.zitatStehtDrin(b),
      umgebung,
      fakt: fakt && { id: fakt.id, art: fakt.art, gegenstand: fakt.gegenstand, gilt_ab: fakt.gilt_ab ?? null, gilt_bis: fakt.gilt_bis ?? null, gueltig: fakt.gueltig, artikel: fakt.artikel },
      traeger,
      verlauf: await verlauf(traeger),
    });
  }
  out.push({ frage: f, ...a, belege });
}
writeFileSync(new URL('../src/demo.json', import.meta.url), JSON.stringify({ erzeugt: datum(jetzt), betrieb: 'Tischlerei Wendt GmbH (erfunden)', modus: 'Testmodus ohne KI', fragen: out }, null, 1));
console.log(JSON.stringify(out.map((o) => [o.frage, o.status, o.belege.map((b) => [b.quelle, b.zeilen, b.geprueft, b.fakt?.id ?? null, b.verlauf.length])])));
await k.schliesse();
