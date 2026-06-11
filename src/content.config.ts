import { defineCollection, reference, z } from 'astro:content';
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
    // Structured pointers to other essays in the corpus. See PUBLISHING.md § References and forthcoming.
    // `references` is validated at build time against existing essay slugs.
    // `forthcoming` is free-form for essays not yet written.
    references: z.array(reference('essays')).optional(),
    // `related` — lateral kinship: essays in conversation with this one, no citation implied.
    // Validated at build time against existing essay slugs. Feeds the Map of the Work (/map).
    related: z.array(reference('essays')).optional(),
    forthcoming: z.array(z.object({
      title: z.string(),
      note: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { essays };
