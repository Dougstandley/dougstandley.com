import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['draft', 'published']).default('draft'),
    started: z.coerce.date().optional(),
    published: z.coerce.date().optional(),
  }),
});

export const collections = { essays };
