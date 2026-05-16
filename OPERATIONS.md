# Operations — dougstandley.com

_Last updated: 2026-05-16_

This document is part of authorship, not maintenance.

A durable semantic object on the public web depends on a small stack of services: a registrar, a DNS provider, a hosting platform, a repository, a build toolchain. Each is a dependency, and each can fail or disappear. This document inventories those dependencies, names what would break first if any of them did, and describes the recovery path. Future-Doug (or anyone Doug trusts to keep the site alive) should be able to read this and know exactly where to look without forensic archaeology.

## 1. Infrastructure inventory

| Component | Provider | Configuration |
|---|---|---|
| Domain registration | GoDaddy | `dougstandley.com` |
| DNS | Cloudflare (free plan) | Zone ID `f5149afad4c6cc675c1d8edcfc4c48b5`; nameservers `princess.ns.cloudflare.com` and `skip.ns.cloudflare.com`; activated 2026-05-09 |
| Hosting | Cloudflare Pages | Auto-deploys on push to `main` |
| Source control | GitHub | `github.com/Dougstandley/dougstandley.com` (SSH auth) |
| Web fonts | Google Fonts CDN | Source Serif 4 + Inter loaded via `<link rel="stylesheet">` |
| Newsletter / RSS-via-email | Substack | `dougstandley.substack.com` (separate platform; the site does not depend on it) |
| Ops contact | `info@dougstandley.com` | Used for registrar, Cloudflare, and GitHub recovery |

The site does not currently depend on a database, CDN beyond Cloudflare's edge, image-processing service, analytics, comments, or any third-party API. The dependency graph is intentionally short.

## 2. Build process

**Stack:** Astro 5.x (static site generator) with content collections for essays. Source in `src/`, output to `dist/` at build time.

**Node:** Astro 5 requires Node 20.x LTS or later. No `engines` field is currently pinned in `package.json`; if a future Node release breaks the build, pin it explicitly.

**Local commands:**

```
npm install          # install dependencies (run after pulling new commits that change package.json)
npm run dev          # local dev server with hot reload — NOT a build verification
npm run build        # production build verification, mirrors what Cloudflare runs
npm run preview      # serve the built dist/ locally
```

**Build verification before push:** `npm run build` is the canonical "is this clean" check. `npm run dev` is for iterating, not for validating a deploy.

## 3. Deployment

Cloudflare Pages watches the GitHub repo and rebuilds automatically on every push to `main`. Build environment is Cloudflare's managed Linux runner; build command is `npm run build`; output directory is `dist/`. No custom build configuration files (`wrangler.toml`, `_routes.json`, etc.) are present — Cloudflare uses its defaults.

**Git authentication is SSH-only.** The private key lives at `~/.ssh/id_ed25519` on the publishing machine; the public key is registered to the GitHub account. The remote URL is the SSH form (`git@github.com:Dougstandley/dougstandley.com.git`). Personal Access Tokens are retired and should not be reintroduced — past attempts leaked tokens.

**Typical deploy cycle:** push to `main` → Cloudflare detects within seconds → build runs (~30–60s) → live at `dougstandley.com` in approximately two minutes total.

## 4. Incident response

If the site is down, work through these in order. The list is ordered from most-common to most-rare.

1. **Check the most recent Cloudflare Pages build.** Cloudflare dashboard → Pages → project. A red build at the top means a recent push broke something. The build log will name the file and line. The fix is usually a frontmatter typo, a Zod schema violation, or a missing import after a refactor. Revert the last commit on `main` (`git revert HEAD && git push`) to restore the previous deploy while debugging locally.
2. **Check DNS resolution.** `dig dougstandley.com` or use a third-party tool. If the nameservers are not `princess.ns.cloudflare.com` and `skip.ns.cloudflare.com`, the registrar (GoDaddy) was changed — most likely by accident in the GoDaddy dashboard. Restore the Cloudflare nameservers and wait for propagation (typically minutes to hours, occasionally up to 48).
3. **Check Cloudflare status.** `https://www.cloudflarestatus.com`. Cloudflare-wide outages are rare but possible. No action needed — wait for resolution.
4. **Check the GitHub repo.** If the repo is gone, deleted, or made private without updating Cloudflare's deploy credentials, Pages cannot rebuild. The current deploy will keep serving until Cloudflare's cache expires, but no new pushes will deploy.
5. **Check the domain expiration at GoDaddy.** If the domain expires, DNS goes dark. GoDaddy sends renewal notices to the ops contact email; act on them.

## 5. Migration paths

The site is intentionally portable. Every component has a documented escape route.

**If Cloudflare Pages disappears or becomes unsuitable:** the site is a static build (HTML/CSS/JS). Any static host works — Netlify, GitHub Pages, Vercel, Fastly Compute, even an S3 bucket behind CloudFront. Run `npm run build`, take the `dist/` directory, point the new host at it. Update the DNS A/CNAME record at Cloudflare DNS (or wherever DNS lives) to point at the new host. Migration time: hours, not days.

**If GitHub disappears or becomes unsuitable:** the local working copy IS a complete repo with full history. Push to a new remote (GitLab, Codeberg, self-hosted Gitea) and update Cloudflare Pages' connected repo. The build pipeline is the same.

**If Cloudflare DNS disappears:** move DNS to any other provider (GoDaddy itself supports DNS, as do Route 53, DNSimple, Bunny, etc.). Update the registrar's nameservers to the new provider, recreate the records (one A/CNAME pointing at the hosting target, an MX record if email is added later). Migration time: hours plus propagation.

**If GoDaddy disappears or becomes unsuitable:** transfer the domain. Standard ICANN process — get an authorization code from GoDaddy, initiate transfer at the new registrar, wait the mandated 5–7 day window. Plan ahead; don't do this during a content-critical period.

**If Google Fonts becomes unsuitable:** the font stack in `src/styles/global.css` already declares system fallbacks (`Charter`, `Iowan Old Style`, `Georgia`, `-apple-system`). The site degrades gracefully. For a permanent fix, self-host the woff2 files from `public/fonts/` and update the `@font-face` declarations to point at local paths instead of Google's CDN.

## 6. Backup posture

**The repo is the backup.** Every commit pushed to GitHub is a complete snapshot of the site's content, schema, layout, and history. There is no separate database to back up. The Cloudflare Pages output is reproducible from any commit.

**Recommended hardening:** clone the repo to a second remote periodically (a personal server, a USB drive, a cloud storage location). The local working copy plus GitHub plus the second remote constitutes three independent copies. This is overkill at current scale and probably appropriate at any scale.

**Content backup separately from infrastructure:** the essay markdown files in `src/content/essays/` are the artifact. They are plain text, portable to any system, readable without any build tooling. If everything else burns down, the essays survive as a folder of `.md` files.

## 7. Bot policy

_Placeholder section. Decision pending in v.1.0 Phase 7 (item 10). When the decision lands, this section will document:_

- _The reasoning for the chosen posture (which AI crawlers are allowed, which are blocked, and why)._
- _The explicit `robots.txt` directives, including named entries for `GPTBot`, `ClaudeBot`, `Claude-User`, `CCBot`, `Google-Extended`, `PerplexityBot`, and others as applicable._
- _The Cloudflare "Block AI bots" managed-rule decision (currently off; subject to revisit)._
- _The framing principle: live-fetch agents (`Claude-User`, `ChatGPT-User`) remain readable since they are not training crawlers. Training crawlers are evaluated against the site's editorial purpose._

## 8. Known operational gaps

Honest disclosure of what is not yet documented or hardened.

- **OG image PNG asset is not yet generated.** `public/og-card.svg` is the design source-of-truth and is referenced via `og:image`. Most social platforms reject SVG and fall back to a no-image preview card. When a working render path appears, drop the PNG into `public/og-card.png` and update `BaseLayout.astro` to swap `og:image:type` from `image/svg+xml` to `image/png`. See `BUILD_PLAN_V1.md` § Item 8.
- **No Node version pin in `package.json`.** Should pin once Node 20 reaches end-of-life or a future Node release breaks the build.
- **No automated link checker.** External URLs in essays could rot silently. Manual review during reading is the current discipline; revisit if the corpus grows.
- **No second-remote mirror.** Repo lives only on GitHub locally and at `github.com/Dougstandley/dougstandley.com`. Acceptable at current scale; add a mirror when the site becomes load-bearing for income or reputation in a way it currently is not.

---

_This document is itself part of the durable semantic object. Update it when the infrastructure changes. The discipline is the same as the URL permanence rule in `PUBLISHING.md`: structural changes get documented, not hidden._
