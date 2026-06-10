/**
 * generate-og-cards.mjs
 * --------------------------------------------------------------------------
 * Generates a 1200x630 social share card (Open Graph / Twitter) for every
 * published essay, written to public/og/<slug>.png.
 *
 * These PNGs are committed static assets — the deployed site and the Cloudflare
 * build do NOT run this script. Run it locally whenever you add, rename, or
 * retitle an essay, then commit the changed PNG(s):
 *
 *     npm run og:cards
 *
 * Rendering is browser-free (satori -> SVG -> resvg -> PNG), so it runs fast
 * on any machine with the dev dependencies installed (`npm install`).
 *
 * Design mirrors public/og-card.svg: paper background, letter-spaced Inter
 * wordmark + hairline rule, the essay title in Source Serif 4 (auto-fit to
 * length), an optional tag eyebrow, and the URL bottom-right.
 * --------------------------------------------------------------------------
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ESSAYS_DIR = join(ROOT, 'src/content/essays');
const OUT_DIR = join(ROOT, 'public/og');
const FONT = (pkg, file) => join(ROOT, 'node_modules', pkg, 'files', file);

mkdirSync(OUT_DIR, { recursive: true });

const fonts = [
  { name: 'Inter', weight: 500, style: 'normal',
    data: readFileSync(FONT('@fontsource/inter', 'inter-latin-500-normal.woff')) },
  { name: 'Source Serif 4', weight: 400, style: 'normal',
    data: readFileSync(FONT('@fontsource/source-serif-4', 'source-serif-4-latin-400-normal.woff')) },
];

// Brand tokens (see public/og-card.svg + src/styles/global.css)
const INK = '#161616';
const PAPER = '#faf8f0';
const MUTE = '#8a857c';

// Auto-fit the headline: fewer characters -> larger type.
function titleSize(t) {
  const n = t.length;
  if (n <= 22) return 88;
  if (n <= 34) return 76;
  if (n <= 48) return 64;
  if (n <= 64) return 54;
  return 46;
}

function card({ title, eyebrow }) {
  const children = [
    { type: 'div', props: { style: { display: 'flex', flexDirection: 'column' }, children: [
      { type: 'div', props: { style: {
        fontFamily: 'Inter', fontWeight: 500, fontSize: 24, letterSpacing: 5.28,
        color: INK, display: 'flex',
      }, children: 'DOUG  STANDLEY' } },
      { type: 'div', props: { style: {
        marginTop: 24, height: 1, width: '100%', backgroundColor: 'rgba(22,22,22,0.18)',
      } } },
    ] } },
    { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }, children: [
      ...(eyebrow ? [{ type: 'div', props: { style: {
        fontFamily: 'Inter', fontWeight: 500, fontSize: 18, letterSpacing: 3,
        textTransform: 'uppercase', color: MUTE, marginBottom: 28, display: 'flex',
      }, children: eyebrow } }] : []),
      { type: 'div', props: { style: {
        fontFamily: 'Source Serif 4', fontWeight: 400, fontSize: titleSize(title),
        letterSpacing: -0.8, lineHeight: 1.08, color: INK, display: 'flex', maxWidth: 1010,
      }, children: title } },
    ] } },
    { type: 'div', props: { style: { display: 'flex', justifyContent: 'flex-end' }, children: [
      { type: 'div', props: { style: {
        fontFamily: 'Inter', fontWeight: 500, fontSize: 16, letterSpacing: 0.96,
        color: MUTE, display: 'flex',
      }, children: 'DOUGSTANDLEY.COM' } },
    ] } },
  ];
  return { type: 'div', props: { style: {
    width: 1200, height: 630, display: 'flex', flexDirection: 'column',
    backgroundColor: PAPER, padding: '72px 72px 64px 72px',
  }, children } };
}

async function render(meta, outPath) {
  const svg = await satori(card(meta), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(outPath, png);
}

const files = readdirSync(ESSAYS_DIR).filter((f) => f.endsWith('.md'));
let count = 0;
for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const { data } = matter(readFileSync(join(ESSAYS_DIR, f), 'utf8'));
  if (data.status && data.status !== 'published') continue; // skip drafts
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const eyebrow = tags.map((t) => String(t).replace(/-/g, ' ')).join('  ·  ');
  await render({ title: data.title, eyebrow }, join(OUT_DIR, `${slug}.png`));
  console.log(`  og/${slug}.png  "${data.title}"`);
  count++;
}
console.log(`\nGenerated ${count} card(s) -> public/og/`);
