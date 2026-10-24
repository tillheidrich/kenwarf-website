// Screenshots 390/1440 für alle oder ausgewählte Seiten. Aufruf: node scripts/shots.mjs [pfad ...]
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const BASIS = process.env.BASIS || 'http://127.0.0.1:4303';
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const alle = ['/', '/so-funktionierts/', '/start/', '/systemhaus/', '/kanzlei/', '/schule-verein/', '/open-source/', '/magazin/', '/magazin/kontext-tag-1-woche-2-monat-3/', '/magazin/warum-wir-zitate-maschinell-pruefen/', '/magazin/dein-wissen-gehoert-dir-export/', '/magazin/lokale-ki-oder-eu-modell-kanzleien/', '/magazin/fuer/kanzleien/', '/magazin/stufe/6/', '/impressum/', '/datenschutz/'];
const seiten = process.argv.slice(2).length ? process.argv.slice(2) : alle;
const ziel = process.env.ZIEL || 'shots';
mkdirSync(ziel, { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME });
for (const breite of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: breite < 500 ? 844 : 900 }, deviceScaleFactor: breite < 500 ? 2 : 1 });
  const page = await ctx.newPage();
  for (const s of seiten) {
    await page.goto(BASIS + s, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: '.js [data-zeige]{opacity:1!important;transform:none!important;transition:none!important}' });
    await page.evaluate(() => document.querySelectorAll('[data-zeige],[data-zieh]').forEach((e) => e.classList.add('sichtbar')));
    await page.evaluate(async () => { document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')); await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))); });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); await Promise.all([...document.images].map((i) => i.decode().catch(() => 0))); });
    await page.waitForTimeout(900);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    if (sw > breite) console.log(`QUER-SCROLL ${s} @${breite}: ${sw}px`);
    const name = (s.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home') + `-${breite}.png`;
    await page.screenshot({ path: `${ziel}/${name}`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
console.log('fertig', seiten.length * 2);
