// Bereitet Till Heidrichs Fotos auf: aus kern/fotos/original/ (Download aus der eigenen Mediathek)
// werden saubere Quellen in src/fotos/ (max. 2400 px, ohne EXIF/GPS/ICC-Reste außer sRGB) und
// 1920-px-JPGs für die Präsentation in kern/fotos/praesi/.
// Aufruf: node scripts/fotos.mjs   (braucht sharp aus node_modules)
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ORIG = new URL('../../fotos/original/', import.meta.url).pathname;
const QUELLE = new URL('../src/fotos/', import.meta.url).pathname;
const PRAESI = new URL('../../fotos/praesi/', import.meta.url).pathname;
mkdirSync(QUELLE, { recursive: true });
mkdirSync(PRAESI, { recursive: true });

// id -> [Dateiname, Ausschnitt (Anteile links, oben, Breite, Höhe) oder null, für Präsentation?]
const liste = {
  2184: ['seebruecke-lubmin', null, true],
  2176: ['seebruecke-lubmin-laterne', null, false],
  1939: ['kueste-nienhagen', null, true],
  2717: ['kueste-nienhagen-herbst', null, true],
  2722: ['strand-nienhagen-hoch', null, false],
  1928: ['ostsee-abend', null, false],
  4568: ['strand-daenemark-handy', null, false],
  3424: ['gewaechshaus-greifswald', null, true],
  1619: ['gewaechshaus-greifswald-gang', null, true],
  3068: ['tropenhaus-hamburg', null, false],
  3029: ['farn-hamburg', null, false],
  2258: ['berggarten-hannover', null, false],
  1387: ['samenernte-saecke', null, true],
  1383: ['samenernte-zapfen', null, false],
  2831: ['haus-sunne', null, true],
  2825: ['fenster-sunne', null, false],
  2823: ['kueche-sunne', null, false],
  1547: ['gewaechshaus-archivscan', null, false],
  // Rechenzentrum: oberen Rand mit dem Herstellerschild abschneiden.
  2779: ['rechenzentrum-greifswald', [0, 0.27, 1, 0.73], true],
  2777: ['rechenzentrum-licht', null, false],
  2769: ['rechenzentrum-unschaerfe', null, false],
  1458: ['sternwarte', null, true],
  4974: ['tostedt-winter-luft', null, false],
  5000: ['tostedt-winternacht', null, true],
  5010: ['tostedt-winternacht-2', null, false],
};

for (const datei of readdirSync(ORIG)) {
  const id = Number(datei.split('-')[0]);
  const eintrag = liste[id];
  if (!eintrag) continue;
  const [name, aus, praesi] = eintrag;
  let bild = sharp(join(ORIG, datei)).rotate();
  if (aus) {
    const m = await sharp(join(ORIG, datei)).metadata();
    bild = bild.extract({ left: Math.round(aus[0] * m.width), top: Math.round(aus[1] * m.height), width: Math.round(aus[2] * m.width), height: Math.round(aus[3] * m.height) });
  }
  const puffer = await bild.toBuffer();
  // sharp schreibt ohne .withMetadata() keine EXIF-, GPS- oder XMP-Daten.
  await sharp(puffer).resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).toColourspace('srgb').jpeg({ quality: 88, mozjpeg: true }).toFile(join(QUELLE, `${name}.jpg`));
  if (praesi) await sharp(puffer).resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true }).toColourspace('srgb').jpeg({ quality: 90, mozjpeg: true }).toFile(join(PRAESI, `${name}.jpg`));
  console.log(id, name, praesi ? '+praesi' : '');
}
