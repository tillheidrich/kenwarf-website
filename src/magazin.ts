import { getCollection, type CollectionEntry } from 'astro:content';
import { zielgruppen } from './content.config';
import { stufen } from './inhalt';
export { zielgruppen };

export type Artikel = CollectionEntry<'magazin'>;

export async function alleArtikel() {
  const liste = await getCollection('magazin', ({ data }) => !data.entwurf);
  return liste.sort((a, b) => b.data.datum.getTime() - a.data.datum.getTime() || a.data.position - b.data.position);
}

/** Lesezeit bei rund 200 Wörtern je Minute, ohne Quellenliste gerundet. */
export function lesezeit(text: string) {
  const ohneCode = text.replace(/```[\s\S]*?```/g, ' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const woerter = ohneCode.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(woerter / 200));
}

export const datumLang = (d: Date) => d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' });
export const datumIso = (d: Date) => d.toISOString().slice(0, 10);
export const stufeName = (n: number) => `Stufe ${n}: ${stufen[n - 1].name}`;
export const stufeKurz = (n: number) => stufen[n - 1].name;
