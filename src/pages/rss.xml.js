import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// RSS feed for the projects catalogue, served at /rss.xml. Mirrors the
// homepage/work ordering: published projects only, newest first.
export async function GET(context) {
  const projects = (await getCollection('projects'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Ava Martoma — Projects',
    description:
      "New things Ava Martoma has designed, built, and broken — an artsy-engineer project catalogue.",
    site: context.site,
    items: projects.map((p) => ({
      title: p.data.title,
      description: p.data.description ?? p.data.blurb,
      pubDate: p.data.date,
      link: `/projects/${p.id}/`,
      categories: p.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
