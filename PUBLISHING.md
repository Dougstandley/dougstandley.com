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
| `description` | No (recommended) | string | One-line summary. Drives `<meta name="description">` and `og:description` — affects SEO and link-preview cards. |
| `status` | Yes (effectively) | `draft` or `published` | Defaults to `draft` if omitted. Drafts route locally but never appear on the homepage or in production. Must be `published` to ship. |
| `published` | No (recommended) | date `YYYY-MM-DD` | Drives reverse-chronological sort on the homepage. Without it the essay sorts last. |
| `started` | No | date `YYYY-MM-DD` | Personal tracking only. Not displayed. |
| `tags` | No (recommended) | array of strings, vocabulary-constrained | One to three tags from the canonical vocabulary (see § Tags). Out-of-vocabulary values fail validation. |

Fields like `date`, `pubDate`, `slug`, `categories`, `heroImage`, `author` are not in the schema and will fail validation. If you need a new field, extend `src/content.config.ts` first.

## Tags

_Vocabulary established 2026-05-14 as part of v.1.0. Provisional — may be revised as the corpus matures._

The canonical tag vocabulary contains four values:

- `agentic-ux` — the human-system interface where AI deployment succeeds or fails (adoption, accountability, last-mile reality)
- `governance` — institutional structures, oversight, decision rights, accountability frameworks
- `transformation` — economic and institutional transition, including the conditions and constraints around it
- `identity` — posture, sovereignty, and selfhood under technological and institutional pressure

**Rules:**

1. **Closed vocabulary.** Only the four values above are valid. The list is enforced at build time via `z.enum()` in `src/content.config.ts`. Adding a tag means amending the vocabulary in the schema and documenting the change here, not just typing a new value into frontmatter.
2. **Light touch.** One to three tags per essay. An essay that earns only one tag should carry only one. Multi-tagging should reflect substantive overlap, not topical convenience.
3. **Provisional, not permanent.** The URL permanence rule applies to slugs, not tags. Tags may be merged, split, or renamed as the corpus reveals its shape. When a tag is renamed, update every essay that carries it in the same commit and update this section.
4. **No hierarchy.** No parent/child tags, no nested categories, no sub-tags. Sparsity is a defining characteristic of the project.

To extend the vocabulary, edit the `TAGS` constant in `src/content.config.ts` and update the list and definitions above in the same commit.

## Body formatting

- Plain markdown after the frontmatter.
- `*single asterisks*` for italics.
- `**double asterisks**` for bold.
- Em-dash character `—`, not double hyphens `--`.
- Smart quotes `"like this"` and straight quotes both render correctly.
- **Do not** add an `# H1` at the top of the body. The page template renders the title from frontmatter; an additional H1 produces a duplicate.
- Paragraphs separated by blank lines.

## Publishing workflow

1. Write the essay file at `src/content/essays/<slug>.md` with the frontmatter and body.
2. (Recommended) Run `npm run build` locally to verify the build is clean. Not `npm run dev` — that's a local dev server, not a production build check.
3. Commit and push from your Mac terminal:

   ```
   cd "/path/to/dougstandley.com"
   git add .
   git commit -m "Publish <title>"
   git push
   ```

4. Cloudflare Pages detects the push within seconds and rebuilds. Production deploy is live at `dougstandley.com` in about two minutes.

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
