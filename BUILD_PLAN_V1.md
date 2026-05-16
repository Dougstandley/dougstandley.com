# Build Plan — dougstandley.com v.1.0

_Status: in progress (Phases 0–4 shipped; Phases 5–7 remaining)_
_Created: 2026-05-14_
_Last updated: 2026-05-16_

This document is the working artifact for the v.1.0 build. It defines the operating philosophy, the ship list with sequencing and dependencies, the acceptance criteria per item, and two written-down architectural decisions (image system, search) that are part of v.1.0 but not built in v.1.0.

When v.1.0 ships, the status line at the top of this file flips to `complete` and the document becomes a record of how v.1.0 was reasoned and shipped. It travels with the repo because operational durability is part of authorship.

---

## 1. Operating framing

dougstandley.com is not a commercial site, probably ever. It is a **durable semantic object on the public web**. A commercial site optimizes for growth; a canonical editorial site optimizes for stability. Every v.1.0 decision passes through that test.

The label is itself a constraint device. "v.1.0" means the foundations are intentionally sufficient. Future versions only refine or extend; the bones do not change.

## 2. Operating principles

1. **Optimize for stability, not growth.** Permanence, readability, citation durability, identity clarity, semantic coherence, archival resilience, retrieval integrity. Not engagement, funnels, velocity, or retention.
2. **Ship smaller than instincts want.** The corpus is still discovering itself. Sparsity is a defining characteristic of the project; resist accretion.
3. **Meaning precedes metadata.** Structured data amplifies whatever editorial coherence already exists. Do not bolt schema onto incoherent taxonomy.
4. **Decisions should compress, not accrete.** Every addition should strengthen the forkable system, not create custom one-off clutter.
5. **URL permanence is absolute.** Once a slug is published, it never changes. Redirects forward-only. Canonical addresses are part of the artifact.
6. **Images are editorial objects, not decoration.** (Pre-commitment for when images return; see Appendix A.)

## 3. Ship list

Fourteen items, plus two written-down architectural memos. The items are grouped into seven phases ordered by dependency. Within a phase, items can ship in any order; across phases, earlier phases gate later ones.

### Phase 0 — Discipline (zero build cost)

| # | Item | Notes |
|---|------|-------|
| 6 | URL permanence rule in `PUBLISHING.md` | A written commitment, not a build. Lands first because it constrains every decision that follows. |

### Phase 1 — Editorial structure

| # | Item | Depends on |
|---|------|------------|
| 1 | Sparse theme tags (3–5, provisional, no hierarchy) | Phase 0 |
| 5 | Explicit reference primitive (essay-to-essay pointers, backward + forthcoming) | Phase 0 |

### Phase 2 — Identity

| # | Item | Depends on |
|---|------|------------|
| 3 | JSON-LD `Person` + About-page upgrade (contact vector, selective external links, disambiguation copy) | Phase 0, 1 |
| 4 | JSON-LD `Article` + canonical tags on essays | Phase 0, 1 |

### Phase 3 — Routes and hygiene

| # | Item | Depends on |
|---|------|------------|
| 2 | `/essays` archive route, filterable by tag | Phase 1 |
| 7 | `sitemap.xml`, `robots.txt`, custom 404 | Phase 1, 2, 3 (item 2) |

### Phase 4 — Sharing surface

| # | Item | Depends on |
|---|------|------------|
| 8 | OG image template, Twitter cards, favicon | Phase 2 |
| 9 | RSS feed | Phase 1, 2 |

### Phase 5 — Quality passes

| # | Item | Depends on |
|---|------|------------|
| 11 | Accessibility pass (WCAG 2.1 AA) | All prior phases |
| 12 | Print stylesheet | All prior phases |
| 13 | Mobile typography audit | All prior phases |

### Phase 6 — Durability

| # | Item | Depends on |
|---|------|------------|
| 14 | Operational durability documentation | All prior phases |

### Phase 7 — Bot policy

| # | Item | Depends on |
|---|------|------------|
| 10 | Bot policy revisit and decision | All prior phases — the exposure profile changes once structured data and the reference graph are in place |

## 4. Acceptance criteria

What "done" means for each item.

### Item 6 — URL permanence rule

- A new section in `PUBLISHING.md` titled "URL permanence" stating the rule explicitly.
- Rule contents: published slugs never change; renames require a 301 redirect from the old URL to the new; redirects are forward-only and never removed; no reorganization of URLs for visual or aesthetic reasons.
- Section dated and committed.

### Item 1 — Sparse theme tags

- A `tags` field added to the frontmatter schema in `src/content.config.ts` (array of strings, optional).
- A canonical tag vocabulary of 3–5 tags documented in `PUBLISHING.md` under a new section. Out-of-vocabulary tags fail validation.
- Each published essay updated with appropriate tags.
- Tags rendered on the essay page (visual treatment subordinate to title and date).
- Decision explicitly noted as provisional; tags may be merged or split as the corpus matures, with item 6's permanence rule applying only to URLs, not tags.

### Item 5 — Explicit reference primitive

- Two new frontmatter fields: `references` (array of slugs to existing essays) and `forthcoming` (array of `{title, note?}` for yet-unpublished work referenced by this essay).
- Schema updated in `src/content.config.ts`.
- Essay page template renders a `Referenced` block listing backward links and a `Forthcoming` block listing forward placeholders, both styled to read as part of the essay, not as navigation chrome.
- "Trust Syndicates" placeholder in `hello-world-can-we-talk.md` migrated from inline parenthetical to the new `forthcoming` field.
- Reference convention documented in `PUBLISHING.md`.

### Item 3 — JSON-LD `Person` + About-page upgrade

- JSON-LD `Person` block embedded in `<head>` on the homepage and About page (and only those two — Person belongs to identity pages, not essay pages).
- Fields: `name`, `url`, `jobTitle`, `description`, `sameAs` (array of external profile URLs — Substack, X, others pending Doug's contact-vector decision).
- About page copy updated: contact vector (`info@dougstandley.com`), selective external links, disambiguation framing.
- JSON-LD validates against Google's Rich Results Test or equivalent.

### Item 4 — JSON-LD `Article` + canonical tags

- JSON-LD `Article` block embedded on each essay page, linking `author` to the Person node from item 3.
- Fields: `headline`, `description`, `datePublished`, `author`, `mainEntityOfPage`, `url`.
- `<link rel="canonical" href="..."/>` in `<head>` on every page (homepage, About, each essay, archive, tag pages).
- Validates against Rich Results Test.

### Item 2 — `/essays` archive route

- New page at `src/pages/essays/index.astro` listing all published essays in reverse-chronological order, filterable by tag.
- Tag filters implemented as distinct routes (`/essays/tag/<tag>`), driven by the canonical `TAGS` vocabulary in `src/content.config.ts`. Per-tag URLs are durable, indexable, and link-shareable.
- Empty-state handling: if no essays match a tag, show a clean "no essays in this tag yet" message rather than a broken page.
- Homepage shows recent essays only — capped at the five most recent with a `Read all essays →` link to `/essays` below the list. Nav "Essays" routes to `/essays` (not `/`), so the archive is the canonical essays surface.
- **Future treatment as corpus grows (decided 2026-05-14, not built):** when the archive page begins to feel long (rough trigger: ~30 essays), add year-grouped sub-headings within the single `/essays` page (2026, 2025, 2024…). The URL stays one — pagination is explicitly avoided because page numbers carry no editorial meaning. Year-groupings carry biographical meaning; tag pages carry topical meaning; both are durable. Search (item handled separately, see Appendix B) triggers at the same threshold.

### Item 7 — `sitemap.xml`, `robots.txt`, custom 404

- `@astrojs/sitemap` integration installed; sitemap auto-generated at build time and accessible at `/sitemap.xml`.
- Sitemap includes homepage, About, all published essays, archive, and per-tag pages.
- `robots.txt` placed at `public/robots.txt` with initial permissive rules; item 10 revises this with the final bot policy.
- Custom 404 page at `src/pages/404.astro` matching the site's design — masthead, brief copy, link back to home or essays archive.

### Item 8 — OG image template, Twitter cards, favicon

- **Revised scope (2026-05-14):** v.1.0 ships a single static OG card, not a per-essay templated build. Design locked in `public/og-card.svg` (1200×630, cream `#faf8f0`, Inter wordmark + Source Serif 4 subtitle echoing the Substack subtitle, ink-blue accent). Templated per-essay generation deferred to v.2.
- **Known gap (2026-05-14):** PNG render path failed on Doug's local Mac (Chrome headless silently no-op; qlmanage clipped). SVG is committed and referenced via `og:image` / `twitter:image`. Mastodon and a few readers honor SVG; Twitter, LinkedIn, Meta, and most platforms fall back to a no-image preview card. Acceptable for v.1.0. PNG to be dropped into `public/og-card.png` via a one-line commit when a working render path appears; meta tags then swap from `.svg` to `.png` in the same commit.
- `og:image`, `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name` meta tags on every page (page-appropriate values), with `og:image:type` declared as `image/svg+xml`.
- Twitter card meta: `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator` set to `@DougStandley`, `twitter:site` set to `@DougStandley`.
- Favicon: `public/favicon.svg` (single Source Serif 4 "D" glyph in ink-blue `#234c7c` on transparent). SVG favicon supported by all modern browsers; PNG fallback (`favicon-32.png`, `apple-touch-icon.png`) deferred — add when first user reports a rendering issue.

### Item 9 — RSS feed

- `@astrojs/rss` integration installed; feed accessible at `/rss.xml`.
- Feed includes all published essays in reverse-chronological order.
- **Revised scope (2026-05-14):** feed items carry **title + description + link + pubDate only — no full content**. Reasoning: the site is the canonical reading surface (with design, references, structured data); RSS at dougstandley.com is the citation/discovery feed, not the consumption surface. Substack carries the full-content-via-email path separately. Reversible later if reader feedback warrants.
- `<link rel="alternate" type="application/rss+xml" href="/rss.xml"/>` in `<head>` so feed readers auto-discover.

### Item 11 — Accessibility pass (WCAG 2.1 AA)

- Lighthouse accessibility score ≥ 95 on homepage, About, and a sample essay.
- Manual checks: skip-to-content link present and functional; all interactive elements reachable by keyboard; visible focus states on every focusable element; color contrast verified (`#161616` on `#faf8f0`, `#234c7c` on `#faf8f0`, `#8a857c` on `#faf8f0`) — measured, not assumed.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` used correctly.
- Heading hierarchy audited: no skipped levels, one `<h1>` per page.
- Alt-text discipline documented in `PUBLISHING.md` for the future image case (descriptive, not decorative; empty `alt=""` for purely decorative images).

### Item 12 — Print stylesheet

- `@media print` block in `src/styles/global.css`.
- Print rules: masthead and navigation suppressed; column widened to fit page (e.g., 100% with sensible margins); link URLs shown after link text (`a::after { content: " (" attr(href) ")"; }`) for citation legibility; page breaks respected before `<h2>` and `<hr>`; background color removed (save toner); `Referenced` and `Forthcoming` blocks preserved.
- Verified by printing one essay from Chrome and Safari.

### Item 13 — Mobile typography audit

- Verified on iPhone Safari and Android Chrome (real devices, not just DevTools emulation).
- Base font size, line-height, paragraph width, hero size, and masthead size deliberately checked.
- Tap targets ≥ 44×44 px (essay list links, nav links).
- Horizontal scroll audit: no element exceeds viewport width.
- Document any adjustments in `src/styles/global.css` comments so the reasoning persists.

### Item 14 — Operational durability documentation

- New file `OPERATIONS.md` in the repo root.
- Sections: infrastructure inventory (GitHub repo, Cloudflare Pages project, Cloudflare DNS, registrar, fonts source); build process (commands, environment, version pins for Astro and Node); deployment process; incident response (what to check first if the site is down); migration paths (if Cloudflare Pages disappears, if GitHub disappears, if the domain registrar disappears); backup posture (the repo IS the backup; clone state to a second remote periodically).
- Framed in the doc itself as "part of authorship," not maintenance.

### Item 10 — Bot policy revisit and decision

- A new section in `OPERATIONS.md` titled "Bot policy" stating the decision and the reasoning.
- `robots.txt` updated to match the decision, with named directives for `GPTBot`, `ClaudeBot`, `Claude-User`, `CCBot`, `Google-Extended`, `PerplexityBot`, and others as applicable.
- Cloudflare "Block AI bots" managed rule reviewed against the decision; per-vendor controls used where available.
- Constraint: Claude-User and ChatGPT-User remain readable (live-fetch agents are not training crawlers).
- Decision framed philosophically: the site argues about AI-mediated cognition; the bot stance must be coherent with that argument, neither reflexive blocking nor unrestricted ingestion.

## 5. Out of scope for v.1.0

The following are explicitly deferred. Listing them here so the deferral is intentional, not accidental.

- **Footnote / citation system.** The corpus spans genres (memoir, manifesto, argument essay, reflection); a single citation architecture would damage voice. Interim convention: essays handle their own citations inline in prose. Decide globally only after the corpus reveals its citation behavior.
- **Active image build.** Deferred indefinitely. Architecture pre-committed in Appendix A.
- **Active search build.** Deferred until corpus warrants (approximately 30 essays). Architecture pre-committed in Appendix B.
- **Active forkability test.** A real second-site fork is premature. Replaced with a passive discipline: when writing components and styles in v.1.0, name and structure them as if a second site exists, even though it does not.
- **Comments, newsletter capture, analytics, dark mode.** Permanently or near-permanently deferred. Inconsistent with the non-commercial framing or unnecessary at current scale.

## 6. Process

- Each item is implemented in its own branch (e.g., `v1/item-06-url-permanence`) merged to `main` after local build verification.
- `BUILD_PLAN_V1.md` updated as items complete: checkbox or status note inline with each item's heading.
- `PUBLISHING.md` updated in lockstep with items 6, 1, 5, 11 (alt-text rule).
- No new essays change the schema or layout during v.1.0; Essay 6 drafting continues against the v.01 schema until the relevant v.1.0 schema items ship.
- Test audience enlisted after v.1.0 is fully shipped and self-tested.

---

## Appendix A — Image system memo

**Status:** decided, not built.

**Opening principle:** images are editorial objects, not decoration.

**When images return:**
- **Eligible use cases:** inline figures with editorial purpose (diagrams, data visualizations, archival photographs supporting an argument); a portrait on the About page; an opening image for an essay where the image carries thesis weight. Not eligible: stock photography, decorative openers, generic "vibe" images, photographic flourishes.
- **Entry point:** new optional frontmatter field `heroImage` (path + alt text + caption) for the per-essay opener; inline figures rendered via a standardized markdown component (Astro shortcode or markdown extension) that produces `<figure><img alt="..."><figcaption>...</figcaption></figure>`.
- **Alt-text discipline:** every image carries either a descriptive `alt` or an empty `alt=""` declared deliberately for purely decorative images. Captions are editorial copy and pass through the same voice rules as body prose.
- **Responsive handling:** `srcset` and `sizes` attributes generated at build time; original images live in `src/content/essays/_assets/` or `public/images/` (decision deferred until first use).
- **Design constraint:** images render within or near the 620px column; full-bleed treatment is permitted only when the image carries thesis weight, never decoratively.
- **Performance:** images compressed at build time (Astro's `@astrojs/image` or Cloudflare Image Resizing); lazy loading default; explicit `width` and `height` attributes to prevent CLS.

The build trigger is the first essay where an image carries thesis weight. Until then, the architecture stays in this memo.

## Appendix B — Search architecture memo

**Status:** decided, not built.

**Decision:** when the corpus warrants search, the implementation is **Pagefind**.

**Reasoning:** Pagefind is a client-side static search library purpose-built for static-site frameworks like Astro. It generates a search index at build time, ships it alongside the deployed assets, and runs entirely in the browser. No server, no database, no external service, no per-query cost. Index updates automatically with every build. Works on Cloudflare Pages without configuration changes.

**Trigger:** approximately 30 essays, or when readers begin asking for it, whichever comes first. Not before.

**Scope at build:**
- Search UI as a single page at `/search` or as a modal triggered from the nav.
- Indexed fields: essay title, description, body, and tags.
- Result presentation: title, snippet with highlighted terms, link. No ranking-by-popularity (no analytics, no behavioral signal). Pure semantic match.
- No search bar on the homepage; search is a deliberate destination, not a discovery mechanic.

**Explicitly not in scope, even at build:**
- External search providers (Google site search, Algolia, others). These introduce dependencies and observation surfaces inconsistent with the project's framing.
- Search analytics. The site does not observe its readers.

---

_End of plan._
