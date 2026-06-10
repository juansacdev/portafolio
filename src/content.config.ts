import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['es', 'en']),
    slug: z.string(),
    // Slug of the same post in the other language, used by the language switch.
    translationSlug: z.string(),
    tags: z.array(z.string()).default([]),
    readingTime: z.string(),
  }),
});

export const collections = { blog };
