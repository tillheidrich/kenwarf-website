// Erzeugt public/og.jpg (1200x630) im System „Beleg und Zettel“: Foto von Till Heidrich links,
// rechts Wortmarke, Heldentext und ein Etikett mit Fundstelle. Name kommt aus src/inhalt.ts. Aufruf: node scripts/og.mjs
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
const daten = (pfad, typ) => `data:${typ};base64,${readFileSync(new URL(pfad, import.meta.url)).toString('base64')}`;
const src = readFileSync('src/inhalt.ts', 'utf8');
const name = (src.match(/const NAME = '([^']+)'/) || [])[1] || 'Kenwarf';
const font = daten('../src/fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2', 'font/woff2');
const mono = daten('../src/fonts/atkinson-hyperlegible-mono-latin-wght-normal.woff2', 'font/woff2');
const foto = `data:image/jpeg;base64,${(await sharp(new URL('../src/fotos/seebruecke-lubmin.jpg', import.meta.url).pathname).resize({ height: 700 }).jpeg({ quality: 82 }).toBuffer()).toString('base64')}`;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:A;src:url(${font}) format('woff2');font-weight:200 800}
@font-face{font-family:M;src:url(${mono}) format('woff2');font-weight:200 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;display:grid;grid-template-columns:460px 1fr;background:oklch(0.928 0.004 230);color:oklch(0.21 0.008 60);font-family:A}
.bild{background:url(${foto}) 38% 60%/cover}
.text{padding:60px 64px 56px;display:flex;flex-direction:column;justify-content:space-between}
.marke{display:flex;align-items:center;gap:14px;font-size:38px;font-weight:700;letter-spacing:-.01em}
.marke svg{width:60px;height:28px}
h1{font-size:62px;line-height:1.0;font-weight:650;letter-spacing:-.03em;max-width:12em}
.etikett{align-self:flex-end;width:520px;border:1px solid oklch(0.21 0.008 60 / .42);background:oklch(0.992 0.002 95);font-size:18px;box-shadow:8px 8px 0 oklch(0.895 0.005 230)}
.etikett div{display:grid;grid-template-columns:110px 1fr;padding:9px 14px}
.etikett div+div{border-top:1px solid oklch(0.21 0.008 60 / .16)}
.etikett span{color:oklch(0.49 0.008 60)}
.etikett b{font-family:M;font-weight:400;font-size:16px}
.etikett em{font-style:normal;font-weight:700;color:oklch(0.52 0.2 29)}
</style></head><body>
<div class="bild"></div>
<div class="text">
<div class="marke"><svg viewBox="0 0 34 16"><path d="M0 16 L8 7 H26 L34 16 Z" fill="currentColor"/><rect x="14" y="1" width="6" height="6" fill="oklch(0.52 0.2 29)"/></svg>${name}</div>
<h1>Modelle wechseln. Dein Kontext bleibt, und er gehört dir.</h1>
<div class="etikett"><div><span>Fundstelle</span><b>preisblatt-und-fristen-2026.md, <em>Zeile 24</em></b></div><div><span>Foto</span>Till Heidrich</div></div>
</div>
</body></html>`;
const b = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
await p.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 86 });
await b.close();
console.log('public/og.jpg', name);
