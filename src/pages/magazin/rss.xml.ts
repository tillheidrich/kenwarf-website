import { alleArtikel, lesezeit } from '../../magazin';
import { inhalt } from '../../inhalt';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const liste = await alleArtikel();
  const n = (t: string) => t.replaceAll('{{NAME}}', inhalt.name);
  const basis = inhalt.domain;
  const items = liste.map((a) => {
    const url = `${basis}/magazin/${a.id}/`;
    return `    <item>
      <title>${esc(n(a.data.titel))}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${a.data.datum.toUTCString()}</pubDate>
      <dc:creator>${esc(a.data.autor)}</dc:creator>
      <description>${esc(`${n(a.data.beschreibung)} (${lesezeit(a.body ?? '')} Min. Lesezeit)`)}</description>
      <content:encoded><![CDATA[${n(a.rendered?.html ?? '').replaceAll(']]>', ']]&gt;').replace(/href="\//g, `href="${basis}/`)}]]></content:encoded>
    </item>`;
  }).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(`Magazin · ${inhalt.name}`)}</title>
    <link>${basis}/magazin/</link>
    <atom:link href="${basis}/magazin/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(`Beiträge zu Betriebswissen, belegten KI-Antworten und Export. Ein Projekt von ${inhalt.anbieter}.`)}</description>
    <language>de-de</language>
    <lastBuildDate>${(liste[0]?.data.datum ?? new Date()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
}
