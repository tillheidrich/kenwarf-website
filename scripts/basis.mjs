// Nach `astro build`: wurzel-relative Links und Bildpfade in dist/ um den Basis-Pfad ergänzen.
// Astro setzt base nur für eigene Assets (/_astro/), nicht für handgeschriebene href="/…" und src="/…".
// Aufruf: node scripts/basis.mjs (läuft in `npm run build` automatisch).
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BASIS = '/kenwarf-website';
const DIST = 'dist';
const attr = new RegExp(String.raw`(\s(?:href|src|action|poster)=["'])/(?!/|${BASIS.slice(1)}/)`, 'g');
const srcset = /(\ssrcset=["'])([^"']*)(["'])/g;
let dateien = 0, ersetzt = 0;

function lauf(ordner) {
  for (const name of readdirSync(ordner)) {
    const pfad = join(ordner, name);
    if (statSync(pfad).isDirectory()) { lauf(pfad); continue; }
    if (!name.endsWith('.html')) continue;
    const alt = readFileSync(pfad, 'utf8');
    let neu = alt.replace(attr, (m, a) => { ersetzt++; return `${a}${BASIS}/`; });
    neu = neu.replace(srcset, (m, a, liste, z) => a + liste.split(',').map((t) => {
      const s = t.trim();
      if (s.startsWith('/') && !s.startsWith('//') && !s.startsWith(BASIS + '/')) { ersetzt++; return ' ' + BASIS + s; }
      return ' ' + s;
    }).join(',').trim() + z);
    if (neu !== alt) { writeFileSync(pfad, neu); dateien++; }
  }
}
lauf(DIST);
console.log(`basis.mjs: ${ersetzt} Pfade in ${dateien} Dateien um ${BASIS} ergänzt`);
