import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Canonical tag vocabulary (v.1.0). Provisional — see PUBLISHING.md § Tags.
// Out-of-vocabulary tags fail validation by design.
export const TAGS = ['agentic-ux', 'governance', 'transformation', 'identity'] as const;

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    started: z.coerce.date().optional(),
    published: z.coerce.date().optional(),
    tags: z.array(z.enum(TAGS)).optional(),
  }),
});

export const collections = { essays };
