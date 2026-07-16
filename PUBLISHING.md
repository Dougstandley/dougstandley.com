# Publishing Essays — dougstandley.com

_Last updated: 2026-05-14_

Reference for adding new essays to this site. Lives at the repo root so it travels with the project.

## File location

Essays live at `src/content/essays/<slug>.md`. The slug becomes the URL — `<slug>.md` routes to `dougstandley.com/essays/<slug>`. Use lowercase, hyphens for spaces, no punctuation.

## URL permanence

_Rule established 2026-05-14 as part of v.1.0._

Every published URL on this site is permanent. The address is part of the artifact.

**The rule:**

1. **Slugs never change.** Once an essay's `status` is `published`, the filename `<slug>.md` is locked. Renaming the file changes the URL, which breaks every external link, citation, and structured-data reference pointing at it. Do not rename for typo discovery, aesthetic preference, or perceived improvement.
2. **If a slug must change** — reserved for genuine errors that survived publication — the old URL must continue to resolve via a permanent (`301`) redirect to the new URL. Redirects are forward-only and are never removed.
3. **No URL reorganization for visual reasons.** Do not move essays into subdirectories, restructure the `/essays/` path, or change URL patterns for aesthetic preferences. Structural changes require migration plans with redirects, not silent rewrites.

The rule applies equally to the homepage, About, archive, and tag pages. Any URL that has been advertised, linked, indexed, or cited is durable.

**Why:** A site framed as a durable semantic object is, at the URL level, a set of stable addresses. Once structured data, canonical tags, RSS, and external citations reference those addresses — and as AI retrieval systems ingest the corpus — URL stability becomes part of intellectual durability. A broken link is a small erasure of authorship.

**Redirect implementation (when needed):** Cloudflare Pages supports a `_redirects` file at the public root for Netlify-style redirects, and Cloudflare's Rules engine supports redirect rules at the proxy layer. When the first redirect is required, document the rule and the date in this section before applying it.

## Frontmatter schema

Every essay file starts with a frontmatter block between `---` delimiters. The schema is defined in `src/content.config.ts` and enforced at build time — non-schema fields fail validation and break the build.

```markdown
---
title: "Your Title Here"
description: "One-sentence description used for meta tags and link previews."
status: published
published: 2026-MM-DD
---

Body in markdown starts here.
```

| Field | Required | Type | Purpose |
|-------|----------|------|---------|
| `title` | Yes | string | Display title; rendered as `<h1>` on the essay page and in the homepage list. |
| `shortTitle` | No | string | Short reference name shown **only** on the Map of the Work. See § Short titles. |
| `description` | No (recommended) | string | One-line summary. Drives `<meta name="description">` and `og:description` — affects SEO and link-preview cards. |
| `status` | Yes (effectively) | `draft` or `published` | Defaults to `draft` if omitted. Drafts route locally but never appear on the homepage or in production. Must be `published` to ship. |
| `published` | No (recommended) | date `YYYY-MM-DD` | Drives reverse-chronological sort on the homepage. Without it the essay sorts last. |
| `started` | No | date `YYYY-MM-DD` | Personal tracking only. Not displayed. |
| `tags` | No (recommended) | array of strings, vocabulary-constrained | One to three tags from the canonical vocabulary (see § Tags). Out-of-vocabulary values fail validation. |
| `references` | No | array of essay slugs | Backward pointers to other essays in the corpus. Validated at build time — a typo fails the build. See § References and forthcoming. |
| `forthcoming` | No | array of `{title, note?}` | Forward pointers to essays not yet written. See § References and forthcoming. |

Fields like `date`, `pubDate`, `slug`, `categories`, `heroImage`, `author` are not in the schema and will fail validation. If you need a new field, extend `src/content.config.ts` first.

## Tags

_Vocabulary established 2026-05-14 as part of v.1.0. Provisional — may be revised as the corpus matures. Expanded to five values 2026-07-15 (`human-judgment`, Essay 11)._

The canonical tag vocabulary contains five values:

- `agentic-ux` — the human-system interface where AI deployment succeeds or fails (adoption, accountability, last-mile reality)
- `governance` — institutional structures, oversight, decision rights, accountability frameworks
- `transformation` — economic and institutional transition, including the conditions and constraints around it
- `identity` — posture, sovereignty, and selfhood under technological and institutional pressure
- `human-judgment` — the irreducible human contribution: framing the question, sitting inside uncertainty, owning the stakes that a model cannot

**Rules:**

1. **Closed vocabulary.** Only the five values above are valid. The list is enforced at build time via `z.enum()` in `src/content.config.ts`. Adding a tag means amending the vocabulary in the schema and documenting the change here, not just typing a new value into frontmatter.
2. **Light touch.** One to three tags per essay. An essay that earns only one tag should carry only one. Multi-tagging should reflect substantive overlap, not topical convenience.
3. **Provisional, not permanent.** The URL permanence rule applies to slugs, not tags. Tags may be merged, split, or renamed as the corpus reveals its shape. When a tag is renamed, update every essay that carries it in the same commit and update this section.
4. **No hierarchy.** No parent/child tags, no nested categories, no sub-tags. Sparsity is a defining characteristic of the project.

To extend the vocabulary, edit the `TAGS` constant in `src/content.config.ts` and update the list and definitions above in the same commit.

## Short titles (map reference names)

_Added 2026-07-16. Interim aid for Map label density while the fuller scale/auto-adapt design is pending._

`shortTitle` is an optional frontmatter string that supplies a shorter **reference name** for an essay, shown only on the Map of the Work (`/map`). Everywhere else — the essay page `<h1>`, the homepage list, the `<title>` tag, OG cards, and the map node's accessible `aria-label` — the full `title` is used unchanged. Slugs and URLs are unaffected.

**When to use it:** only when the full title is long enough to overflow its cluster on the map and pull the eye to text before structure. Already-short titles (e.g. *The Interruption*, *The Last 5%*, *Fewer Secrets*) need no `shortTitle`. Keep the reference name faithful to the title — a recognizable contraction, not a re-titling.

```yaml
title: "Ann Patchett and the People Who Know Us"
shortTitle: "Ann Patchett"
```

The map reads `shortTitle` via a `label()` helper in `src/pages/map.astro` (`data.shortTitle ?? title`). No map.astro edit is needed to add or change a reference name — it lives entirely in the essay's frontmatter.

Current reference names: *Where You Come From* · *Hello World* · *Something Prior* · *Heart of the Matter* · *No Lifeguard* · *Second Stanford* · *Keeping Time* · *Ann Patchett*.

## References and forthcoming

_Primitive established 2026-05-14 as part of v.1.0._

Essays can point to other essays — backward (to existing published work) and forward (to work not yet written). Both are structured fields in frontmatter and render at the bottom of the essay as a small Referenced / Forthcoming block. This replaces ad-hoc inline parentheticals like "(forthcoming)" and turns the corpus into a small citation graph.

**`references`** — backward pointers to existing essays.

```yaml
references: [the-last-5-percent, no-lifeguard-on-duty]
```

Values are essay slugs (filenames without `.md`). Slugs are validated at build time; a typo or reference to a nonexistent essay fails the build. References to essays that exist but are `status: draft` are silently filtered at render time — when the target publishes, the reference auto-activates without any other change.

**`forthcoming`** — forward pointers to essays not yet written.

```yaml
forthcoming:
  - title: "Trust Syndicates"
  - title: "Another Essay Title"
    note: "Optional one-sentence gesture at what's coming."
```

`title` is required and is what renders. `note` is optional and is a short editorial gesture, used sparingly. When the forthcoming essay is eventually published, remove the entry from this list and add the new slug to `references` in the same commit.

**`related`** — lateral pointers to kindred essays (added 2026-06-10, v.2.0).

```yaml
related: [the-map-goes-quiet, no-lifeguard-on-duty]
```

Same slug validation as `references`. The distinction is semantic: `references` means *this essay cites or invokes that one*; `related` means *these essays are in conversation*, no citation implied. `related` is the data the **Map of the Work** (`/map`) draws as dashed lines; genuine `references` render there as solid lines. Encode `related` on both essays in a pair — it is not auto-mirrored. Currently `related` feeds only the Map; it does not yet render on the essay page itself (an easy future addition). Placing an essay *on the map terrain* also requires a hand-authored position in `src/pages/map.astro` (`NODES` + `GROUPS`); until added there, a new essay still appears in the archive and its Referenced/Forthcoming block, just not on the map.

**When to use each:**

- `references` = genuine citation (solid lines on the map); `related` = thematic kinship (dashed lines). Keep `references` honest — don't inflate them with loose associations, which is exactly what `related` is for.
- The structured graph should mirror the substantive references the prose already makes — by-name references to other essays' arguments, deliberate title callbacks. Not every passing mention. The signal is editorial weight.
- One-way only in v.1.0: a reference appears on the source essay's page; the target does not auto-display "referenced by." Backlinks may come in v.2.

**Rendering:** the block appears below the essay body, after a hairline rule, with italic serif labels ("Referenced", "Forthcoming") and quiet links. Internal references link to the target essay's URL.

## Body formatting

- Plain markdown after the frontmatter.
- `*single asterisks*` for italics.
- `**double asterisks**` for bold.
- Em-dash character `—`, not double hyphens `--`.
- Smart quotes `"like this"` and straight quotes both render correctly.
- **Do not** add an `# H1` at the top of the body. The page template renders the title from frontmatter; an additional H1 produces a duplicate.
- Paragraphs separated by blank lines.

## Alt-text discipline (for the future image case)

_Rule established 2026-05-16 as part of v.1.0 — pre-commitment for when images return. See `BUILD_PLAN_V1.md` Appendix A._

Images are editorial objects, not decoration. Every image carries either a descriptive `alt` attribute or an empty `alt=""` declared deliberately for purely decorative cases. There is no third option (no missing alt, no auto-generated alt, no filename-as-alt).

**The rule:**

1. **Descriptive alt for content-bearing images.** Describe what the image conveys editorially, not what it looks like. A diagram of decision flow gets alt text describing the decision the diagram is making, not "a diagram with boxes and arrows." A portrait gets alt text describing who the person is and the context, not "a man wearing glasses."
2. **Empty alt for decorative images.** `alt=""` (the empty-string form, not a missing attribute) signals to screen readers that the image carries no editorial meaning and can be skipped. Use only when the image is genuinely ornamental — none of the eligible v.1.0 use cases qualify, so this should be rare.
3. **Captions are editorial copy.** When a `<figcaption>` is present, it follows the same voice rules as body prose: declarative, precise, no apologetic hedging. Captions and alt text serve different purposes — alt text is for users who cannot see the image; captions are for everyone. Do not duplicate.
4. **No "image of," "picture of," "photo of."** Screen readers already announce that the element is an image. Leading with "image of" is redundant.

The discipline is enforced by review, not by build validation. Images return only when an essay's image carries thesis weight; the writer is responsible for getting the alt text right at that moment.

## Publishing workflow

1. Write the essay file at `src/content/essays/<slug>.md` with the frontmatter and body.
2. Generate the social share card: `npm run og:cards`. This writes/refreshes `public/og/<slug>.png` (1200×630), the image that appears when the essay is shared on LinkedIn, X, Substack, iMessage, etc. Run it whenever you add an essay or change a title or tags. The card design lives in `scripts/generate-og-cards.mjs`.
3. (Recommended) Run `npm run build` locally to verify the build is clean. Not `npm run dev` — that's a local dev server, not a production build check.
4. Commit and push from your Mac terminal:

   ```
   cd "/path/to/dougstandley.com"
   git add .
   git commit -m "Publish <title>"
   git push
   ```

5. Cloudflare Pages detects the push within seconds and rebuilds. Production deploy is live at `dougstandley.com` in about two minutes.

## Authentication

This repo uses **SSH key authentication** to GitHub. Your private key lives at `~/.ssh/id_ed25519` on your Mac; the public key is registered to your GitHub account. The remote URL is the SSH form (`git@github.com:...`). Push does not prompt for credentials.

Do not use Personal Access Tokens for this repo. They have been retired.

## Cowork prompt template

Paste the following into Cowork when you want Claude to handle publishing for you. Replace `<slug>` and the essay content as needed.

```
Publish a new essay to my dougstandley.com site.

Project location: ~/Documents/Claude/Projects/Doug's Brand and Web Projects/dougstandley.com
Repo: github.com/Dougstandley/dougstandley.com
Auth: SSH key on my Mac — no PAT, no credential prompts on push.
Stack: Astro 5.0 with content collection at src/content/essays/. Cloudflare Pages auto-deploys on push to main.

Essay slug: <slug>
Essay content follows below. Frontmatter (between the --- delimiters) and body are ready to use as-is.

[paste the essay markdown here, including frontmatter]

Tasks:
1. Verify the frontmatter matches the schema in src/content.config.ts. Allowed fields only: title, description (optional), status (must be "published" to ship), published (YYYY-MM-DD), started (optional). Reject any other fields and flag them before proceeding.
2. Write the essay file at src/content/essays/<slug>.md.
3. Run `npm run build` against a working copy to verify the build is clean. Do NOT run `npm run dev` — that's a local dev server, not a build verification.
4. If `npm run build` fails, show me the full error output and stop. Do not attempt to fix the failure without confirmation.
5. After the build passes, give me the three terminal commands to commit and push (cd, git add, git commit -m "Publish <title>", git push). I'll run them myself from my Mac.
6. Do NOT push from the sandbox. Do NOT modify any files other than the new essay file. Do not change styles, layouts, schema, or other essays.
7. Do NOT clone or pull the repo — the project is already in my workspace folder, accessible via the file tools.
```

## Troubleshooting

**Essay doesn't appear on the homepage after deploy.**
Most common cause: `status` is missing or set to `draft`. Open the file and verify `status: published`. Push the fix and wait for redeploy.

**Build fails on Cloudflare.**
Check the Cloudflare build log. Most common causes:
- Stray frontmatter field rejected by Zod (e.g., `date:` instead of `published:`)
- Malformed date (must be `YYYY-MM-DD`)
- Markdown parse error in the body (unmatched code fence, broken link syntax)

**Essay URL is not what you expected.**
The URL is derived from the filename, not the title. Rename the file (and use `git mv`) if you want a different slug.
