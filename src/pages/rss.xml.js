import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const essays = await getCollection('essays', ({ data }) => data.status === 'published');
  essays.sort((a, b) => {
    const da = a.data.published?.valueOf() ?? 0;
    const db = b.data.published?.valueOf() ?? 0;
    return db - da;
  });

  return rss({
    title: 'Doug Standley',
    description: 'Essays on AI, institutions, and the point of human adoption.',
    site: context.site,
    items: essays.map((essay) => ({
      title: essay.data.title,
      description: essay.data.description ?? '',
      link: `/essays/${essay.id}`,
      pubDate: essay.data.published,
    })),
    customData: '<language>en-us</language>',
  });
}
