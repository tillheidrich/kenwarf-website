// Erzeugt src/demo.json aus der echten Engine (Testmodus ohne KI, Beispieldaten Tischlerei Wendt).
import { Kern, seedDemo } from '../../repo/packages/core/dist/index.js';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const dir = mkdtempSync(join(tmpdir(), 'kern-demo-'));
const heute = () => new Date('2026-10-24T10:00:00Z');
await seedDemo(dir, { heute });
const k = await Kern.open({ dataDir: dir, provider: { art: 'mock' }, betrieb: 'Tischlerei Wendt', sprache: 'de', heute });
const lena = await k.benutzer.pruefe('Lena Meyer', 'demo-passwort');
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
    belege.push({ ...b, geprueft: await k.zitatStehtDrin(b), umgebung });
  }
  out.push({ frage: f, ...a, belege });
}
writeFileSync(new URL('../src/demo.json', import.meta.url), JSON.stringify({ erzeugt: '24.10.2026', betrieb: 'Tischlerei Wendt GmbH (erfunden)', modus: 'Testmodus ohne KI', fragen: out }, null, 1));
console.log(JSON.stringify(out.map(o=>[o.frage,o.status,o.belege.map(b=>[b.geprueft,b.umgebung.length])])));
await k.schliesse();
