# Atelier Trait d'Architecture — showcase website

Showcase website for an architecture studio, designed and built end to end: **traitdarchitecture.com** _(launch in progress)_

<!-- TODO(v2 lot 6): replace with a link to https://traitdarchitecture.com once the domain points to Cloudflare -->

![Home page](screenshot.png)

Pro bono project for an architecture studio at launch, based in Corsica and Provence. I designed and built the whole site — design system, pages, content integration, SEO and deployment — iterating with the two architects from the initial brief to a first release (March–July 2026), then a second release built around their real content: 13 projects, 6 articles, a reading typeface and a repeatable content-update workflow (autumn 2026). The studio provides the content and the visual identity.

## Highlights

- **Astro-first** — every page is pre-rendered static HTML; React 19 is used only for interactive islands (landing, header, galleries, parallax), hydrated lazily with `client:idle` / `client:visible`
- **Typed content** — projects (Markdown) and articles (MDX) live in Astro Content Collections with Zod schemas and validated images; detail pages are generated with `getStaticPaths`
- **Image pipeline** — project images enter the repository only through a manifest-driven `sharp` script: WebP, long edge ≤ 2560 px, EXIF/GPS stripped, ASCII file names, and a completeness check against the source folder; galleries are declared in frontmatter with a caption per image
- **Editorial MDX components** — articles are illustrated with project images through typed imports (a missing file fails the build); figures linking back to their project, image pairs, comparison tables, lead, pull quote and note, all as static `.astro` components
- **Typography** — a custom display typeface for signature text (completed with generated punctuation glyphs) and self-hosted DM Sans for reading, on a token scale that grows with large screens
- **Technical SEO** — canonical URLs, Open Graph / Twitter cards, JSON-LD (`Organization`, `WebSite`, `Article`, `CreativeWork`, `ItemList`, `BreadcrumbList`), sitemap, `llms.txt` / `llms-full.txt` generated from the collections at build time, legal notice
- **Images** — responsive `srcset` / `sizes` through `astro:assets`; a post-build script prunes unreferenced originals from `dist/`
- **Performance** — Lighthouse 90+ (performance, accessibility, best practices); self-hosted preloaded fonts, viewport prefetch, Framer Motion loaded through `LazyMotion`
- **Light / dark theme** — `data-theme` on `<html>`, system preference by default, choice kept in `sessionStorage`, applied before first paint and across view transitions (no flash)
- **Accessibility** — semantic HTML, skip link, focus trapping in overlays, live regions for dynamic counters, `prefers-reduced-motion` honoured everywhere
- **Contact form without a backend** — Web3Forms endpoint, honeypot field and minimum fill-time guard

## Stack

Astro 6 · React 19 (islands) · TypeScript (strict) · Tailwind CSS 4 · Framer Motion · OverlayScrollbars · MDX · sharp · ESLint · Cloudflare Workers (static assets)

## Run locally

Node.js ≥ 22.12 (see `.nvmrc`)

```bash
npm install
npm run dev
```

| Command           | Purpose                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run dev`     | Astro dev server                                                                                          |
| `npm run build`   | static build, then `postbuild` prunes unreferenced images                                                 |
| `npm run preview` | preview the build                                                                                         |
| `npm run lint`    | ESLint                                                                                                    |
| `npm run ingest`  | contact sheet of a source folder, or manifest-driven image ingest (`--sheet` / `--manifest`, `--dry-run`) |

The contact form reads `PUBLIC_WEB3FORMS_KEY` from a `.env` file; everything else runs without it.

## Deployment

Static assets on **Cloudflare Workers** — no Worker script, configuration in `wrangler.jsonc` (`dist/` as assets, `404.html` for unknown routes). Workers Builds is connected to this repository: it runs `npm run build` with the Node version from `.nvmrc` and the `PUBLIC_WEB3FORMS_KEY` build variable. A push to `main` deploys production; any other branch gets its own preview URL, so content updates are reviewed on a preview before being merged.

## Structure

- `src/pages/` — Astro routes, including `architecture/[slug]`, `extrait/[slug]` and the `llms.txt` endpoints
- `src/content/` — Content Collections (`projects`, `articles`), schemas in `src/content.config.ts`
- `src/components/` — Astro components and React islands, grouped by page (`home`, `atelier`, `trait`, `architecture`, `extrait`, `contact`, `legal`) plus shared `ui/`
- `src/layouts/BaseLayout.astro` — `<head>`, SEO metadata, JSON-LD, theme bootstrap
- `src/styles/index.css` — design tokens and global styles
- `scripts/ingest-images.mjs` — image ingest for project content
- `scripts/prune-dist-originals.mjs` — post-build image pruning
- `public/` — fonts, favicons, web manifest, `robots.txt`
- `wrangler.jsonc` — Cloudflare Workers static assets configuration

## Author

Paul Alessandrini — Web developer · [LinkedIn](https://www.linkedin.com/in/paul-alessandrini) · [GitHub](https://github.com/Palalde)
