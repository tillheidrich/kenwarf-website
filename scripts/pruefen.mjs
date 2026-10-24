// axe (WCAG 2.2 AA), fremde Anfragen, Cookies, Konsolenfehler, kaputte interne Links. Aufruf: node scripts/pruefen.mjs
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync } from 'node:fs';
// BASIS: Adresse inklusive Basis-Pfad, z. B. https://tillheidrich.github.io/kenwarf-website
const BASIS = (process.env.BASIS || 'http://127.0.0.1:4303/kenwarf-website').replace(/\/$/, '');
const ORIGIN = new URL(BASIS).origin;
import { mkdirSync } from 'node:fs';
mkdirSync('shots', { recursive: true });
const axe = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const seiten = ['/', '/so-funktionierts/', '/start/', '/systemhaus/', '/kanzlei/', '/schule-verein/', '/open-source/', '/magazin/', '/magazin/kontext-tag-1-woche-2-monat-3/', '/magazin/warum-wir-zitate-maschinell-pruefen/', '/magazin/dein-wissen-gehoert-dir-export/', '/magazin/lokale-ki-oder-eu-modell-kanzleien/', '/magazin/kontext-ist-mehr-als-transkripte/', '/magazin/fuer/kanzleien/', '/magazin/stufe/6/', '/impressum/', '/datenschutz/'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ergebnis = { axe: [], fremd: [], konsole: [], links: new Set(), kaputt: [], cookies: 0 };
for (const breite of [390, 1440]) {
  const ctx = await b.newContext({ viewport: { width: breite, height: 900 } });
  const p = await ctx.newPage();
  p.on('request', (r) => { if (!r.url().startsWith(ORIGIN) && !r.url().startsWith('data:')) ergebnis.fremd.push(r.url()); });
  p.on('console', (m) => { if (m.type() === 'error') ergebnis.konsole.push(m.text()); });
  for (const s of seiten) {
    await p.goto(BASIS + s, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.querySelectorAll('[data-zeige],[data-zieh]').forEach((e) => e.classList.add('sichtbar')));
    await p.waitForTimeout(1000);
    await p.addScriptTag({ content: axe });
    const r = await p.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] })).violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, ziel: v.nodes.slice(0, 3).map((x) => x.target.join(' ')) })));
    r.forEach((v) => ergebnis.axe.push({ seite: s, breite, ...v }));
    const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')));
    hrefs.filter((h) => h.startsWith('/')).forEach((h) => ergebnis.links.add(h.split('#')[0]));
  }
  ergebnis.cookies += (await ctx.cookies()).length;
  await ctx.close();
}
for (const l of ergebnis.links) {
  const res = await fetch(ORIGIN + l);
  if (res.status !== 200) ergebnis.kaputt.push(`${l} ${res.status}`);
}
// RSS und Sitemap: abrufbar, wohlgeformt, Pflichtfelder vorhanden
for (const pfad of ['/magazin/rss.xml', '/sitemap.xml']) {
  const res = await fetch(BASIS + pfad);
  const text = await res.text();
  const p2 = await b.newPage();
  const fehler = await p2.evaluate((t) => { const d = new DOMParser().parseFromString(t, 'application/xml'); return d.querySelector('parsererror') ? d.querySelector('parsererror').textContent : ''; }, text);
  await p2.close();
  if (res.status !== 200 || fehler) ergebnis.kaputt.push(`${pfad} ${res.status} ${fehler}`);
  if (pfad.endsWith('rss.xml')) {
    const items = (text.match(/<item>/g) || []).length;
    const pflicht = ['<title>', '<link>', '<description>', '<guid', '<pubDate>'].every((t) => (text.split(t).length - 1) >= items);
    ergebnis.rss = { items, pflicht, typ: res.headers.get('content-type') };
  }
}
await b.close();
const aus = { ...ergebnis, links: ergebnis.links.size, fremd: [...new Set(ergebnis.fremd)] };
writeFileSync('shots/pruefung.json', JSON.stringify(aus, null, 2));
console.log(JSON.stringify({ rss: aus.rss, axe: aus.axe.length, fremd: aus.fremd.length, konsole: aus.konsole.length, cookies: aus.cookies, links: aus.links, kaputt: aus.kaputt }, null, 1));
for (const v of aus.axe) console.log(v.seite, v.breite, v.id, v.impact, v.n, v.ziel.join(' | '));
