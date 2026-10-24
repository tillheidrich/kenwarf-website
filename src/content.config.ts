import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Zielgruppen und Stufen als feste Listen, damit Kategorieseiten stabil bleiben. */
export const zielgruppen = {
  betriebe: 'Betriebe',
  it: 'IT und Systemhaus',
  kanzleien: 'Kanzleien',
  'schule-verein': 'Schulen und Vereine',
} as const;

const magazin = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/magazin' }),
  schema: z.object({
    titel: z.string().max(110),
    beschreibung: z.string().max(200),
    datum: z.coerce.date(),
    autor: z.string().default('Redaktion'),
    zielgruppen: z.array(z.enum(['betriebe', 'it', 'kanzleien', 'schule-verein'])).min(1),
    stufen: z.array(z.number().int().min(1).max(6)).min(1),
    foto: z.string(),
    fotoAlt: z.string(),
    fotoOrt: z.string(),
    fokus: z.string().default('50% 50%'),
    entwurf: z.boolean().default(false),
    /** Reihenfolge bei gleichem Datum, kleiner zuerst */
    position: z.number().default(10),
  }),
});

export const collections = { magazin };
