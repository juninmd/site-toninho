# AGENTS.md

site-toninho: a static personal site (HTML, CSS, vanilla JS), deployed to production at https://site-toninho.antonio-code.duckdns.org. No bundler, no framework.

## Stack

- HTML5, CSS3 (`custom.css`, `hero-cinema.css`, `album.css`), JavaScript ES6+ (`script.js`, `hero-cinema.js`, `album.js`).
- Tests: `html-validate` and `test-docs.js`. Build: copy of the public files into `dist/`.
- CI: GitHub Actions (`.github/workflows/`: `validate.yml`, `pages.yml`, `sast.yml`, `security.yml`, `release-drafter.yml`).

## Commands

```bash
npm run build    # copy the public files to dist/
npm test         # html-validate index.html && node test-docs.js
```

Run `npm install` first, since `html-validate` is a dev dependency.

## Structure

- `index.html`: landing page. `custom.css`: global layout. `script.js`: form, lightbox, filters.
- `hero-cinema.{css,js}`: hero video. `album.{css,js}`: album modal and gallery.
- `captions.vtt`, `video.mp4`, `fotoAntonio.jpg`: media served by the page.
- `_headers` (security headers), `_redirects` (e.g. `/whatsapp`), `netlify.toml`: hosting config.
- `sitemap.xml`, `robots.txt`: SEO. `SEO_KEYWORDS.md`: keyword reference.
- `test-docs.js`: checks that every root `.js`, `.css`, and `.html` file is named in `README.md`.

## Conventions

- Each file stays under 180 lines of code. Split by responsibility.
- Two-space indentation, lines under 120 characters, blank lines between logical blocks.
- Comments say why, not what. Each module has a short description.
- No duplicated logic or data across files. Remove code your change makes dead.
- Add a new root `.js`, `.css`, or `.html` file? Also name it in `README.md`, or `npm test` fails.
- Keep to what is asked: no speculative features or abstractions.
- Validate HTML before finishing: `npm test` must pass.

## Gotchas

- The `Dockerfile` and the Nginx/K3s/ArgoCD setup described in `README.md` are not in this checkout. Do not assume they exist here.
- The Playwright checks mentioned in `README.md` (`verify.py`) live outside the repo (`/home/jules/verification/`). They are not versioned here.
- `_redirects` and `_headers` apply only where those hosts read them. Keep them in sync with production.
- Keep `dist/` as build output only. Do not edit it by hand.

<!-- base-actions-main-policy -->
## GitHub Actions — padrão obrigatório (@main)

- Referencie as actions internas sempre pelo branch, nunca por SHA:
  - `uses: juninmd/base-actions/<action>@main`
  - `uses: juninmd/base-actions/.github/workflows/<arquivo>.yml@main`
- Não fixe `@<sha>` em `juninmd/base-actions`: a atualização é centralizada no
  `main` e passa a valer no próximo run.
- PRs cujos checks não iniciam por billing/spending limit são mesclados pelo bot central
  `juninmd/base-actions/.github/workflows/auto-merge-billing-blocked.yml`.
  Para impedir o merge automático de um PR, aplique a label `do-not-merge`.
