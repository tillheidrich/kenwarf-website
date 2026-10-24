// Seitengewicht beim ersten Laden (mobil 390 px, DPR 2, ohne Scrollen) und nach komplettem Scrollen.
// Aufruf: node scripts/gewicht.mjs [pfad ...]
import { chromium } from 'playwright-core';
const BASIS = process.env.BASIS || 'http://127.0.0.1:4303';
const seiten = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/so-funktionierts/', '/start/', '/systemhaus/', '/kanzlei/', '/schule-verein/', '/magazin/', '/magazin/kontext-tag-1-woche-2-monat-3/'];
const b = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const breite of [390, 1440]) {
  for (const s of seiten) {
    const ctx = await b.newContext({ viewport: { width: breite, height: breite < 500 ? 844 : 900 }, deviceScaleFactor: breite < 500 ? 2 : 1 });
    const p = await ctx.newPage();
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Network.enable');
    let summe = 0; const groesste = [];
    cdp.on('Network.loadingFinished', (e) => { summe += e.encodedDataLength; });
    cdp.on('Network.responseReceived', (e) => groesste.push(e.response.url));
    await p.goto(BASIS + s, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    const erst = summe;
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } });
    await p.waitForLoadState('networkidle');
    await p.waitForTimeout(500);
    console.log(`${breite} ${s.padEnd(44)} erst ${(erst / 1024).toFixed(0).padStart(5)} KB   gescrollt ${(summe / 1024).toFixed(0).padStart(5)} KB`);
    await ctx.close();
  }
}
await b.close();
