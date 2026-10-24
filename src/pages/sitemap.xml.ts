import { alleArtikel, datumIso } from '../magazin';
import { zielgruppen } from '../content.config';
import { stufen, inhalt } from '../inhalt';

const seiten = ['/', '/so-funktionierts/', '/start/', '/systemhaus/', '/kanzlei/', '/schule-verein/', '/open-source/', '/magazin/', '/impressum/', '/datenschutz/'];

export async function GET() {
  const artikel = await alleArtikel();
  const eintraege = [
    ...seiten.map((p) => `  <url><loc>${inhalt.domain}${p}</loc></url>`),
    ...Object.keys(zielgruppen).map((z) => `  <url><loc>${inhalt.domain}/magazin/fuer/${z}/</loc></url>`),
    ...stufen.map((_, i) => `  <url><loc>${inhalt.domain}/magazin/stufe/${i + 1}/</loc></url>`),
    ...artikel.map((a) => `  <url><loc>${inhalt.domain}/magazin/${a.id}/</loc><lastmod>${datumIso(a.data.datum)}</lastmod></url>`),
  ];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${eintraege.join('\n')}\n</urlset>\n`, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
