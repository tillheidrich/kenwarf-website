// Erzeugt public/og.jpg (1200x630): Foto von Till Heidrich links, Name und Botschaft rechts.
// Name kommt aus src/inhalt.ts. Aufruf: node scripts/og.mjs
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
const daten = (pfad, typ) => `data:${typ};base64,${readFileSync(new URL(pfad, import.meta.url)).toString('base64')}`;
const src = readFileSync('src/inhalt.ts', 'utf8');
const name = (src.match(/const NAME = '([^']+)'/) || [])[1] || 'Kern';
const font = daten('../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2', 'font/woff2');
const mono = daten('../node_modules/@fontsource-variable/martian-mono/files/martian-mono-latin-wght-normal.woff2', 'font/woff2');
const foto = `data:image/jpeg;base64,${(await sharp(new URL('../src/fotos/seebruecke-lubmin.jpg', import.meta.url).pathname).resize({ height: 700 }).jpeg({ quality: 82 }).toBuffer()).toString('base64')}`;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:A;src:url(${font}) format('woff2');font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:M;src:url(${mono}) format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;display:grid;grid-template-columns:500px 1fr;background:#f3f5f8;color:#1b2333;font-family:A}
.bild{background:url(${foto}) 38% 60%/cover}
.text{padding:64px 64px 56px;display:flex;flex-direction:column;justify-content:space-between}
.marke{display:flex;align-items:center;gap:14px;font-size:40px;font-weight:800;font-stretch:125%;letter-spacing:-.03em}
.marke i{width:16px;height:44px;border:3px solid #1b2333;border-radius:3px;position:relative}
.marke i:after{content:'';position:absolute;left:2px;right:2px;top:6px;height:8px;background:#d6ef4a}
h1{font-size:62px;line-height:1.02;font-weight:760;font-stretch:118%;letter-spacing:-.03em}
h1 span{background:linear-gradient(transparent 14%,#d6ef4a 14%,#d6ef4a 90%,transparent 90%);padding:0 .06em}
p{font-family:M;font-size:17px;color:#4a5466;display:flex;justify-content:space-between}
</style></head><body>
<div class="bild"></div>
<div class="text">
<div class="marke"><i></i>${name}</div>
<h1>Dein Betriebswissen antwortet. <span>Mit Fundstelle.</span></h1>
<p><span>Ordner, der dir gehört</span><span>Foto: Till Heidrich</span></p>
</div>
</body></html>`;
const b = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
await p.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 86 });
await b.close();
console.log('public/og.jpg', name);
