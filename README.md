# Siva Sankar — Portfolio

Single-page portfolio for **Thirumalasetty Siva Sankar** (B.Tech CSD, Class of 2029).
Brand palette: Jet Black `#000000` · Hot Pink `#FF1493` · Chartreuse `#7FFF00`.

Stack: React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · Framer Motion · Recharts · Lucide.
It's a static site with no backend. Hosting is free on GitHub Pages or Cloudflare Pages.

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build → dist/
npm run preview      # serve dist/ locally
npm run resume:pdf   # regenerate public/resume/Siva-Sankar-Resume.pdf
```

Requires Node 18+.

## Where to edit content

| What | File |
|---|---|
| Profile, links, skills, projects, certificates, services, timeline | `src/data/content.ts` |
| Resume PDF text | `scripts/generate-resume.mjs` (keep in sync, then `npm run resume:pdf`) |
| Data Lab sample values | `src/components/DataLab.tsx` (top of file) |
| SEO title / description | `index.html` |

### Content sources (verified 3 Nov 2026)

- **Certificates.** All 14 are in `public/certificates/` as the original files, used for downloads. Optimised previews are in `previews/` and grid thumbnails in `previews/thumbs/`. The title, issuer, date and certificate ID shown for each were read from the document itself. Google skill-badge images that print no date are shown without one.
- **Projects and Data Lab numbers.** These are quoted from each GitHub repository README, and the Data Lab links to its source.
- **Photo and brand images.** `public/images/` holds the profile photo, wordmark and two banners, supplied by the owner and resized only.

### Still worth doing

1. Add Credly or Skills Boost verification links to the Google badges (`verifyUrl`). Right now only the AI Studio badge has one.
2. Fix the small README inconsistencies in two repos. The sentiment README gives the negative share as both 62.7% and 63.5%; the churn README gives the row count as both 7,043 and 7,032.
3. Set `openToInternships: false` when it stops being true.
4. Keep `scripts/generate-resume.mjs` in sync with `content.ts`, then run `npm run resume:pdf`.

## Contact form

- With no configuration, the form validates input and then opens the visitor's email app with the message pre-filled. It never claims a message was sent.
- To send messages directly, create a free form at <https://formspree.io>. Then set `VITE_FORMSPREE_ID=xxxxxxx` in `.env` or in your host's environment variables and rebuild. The form ID is public by design, so no secrets live in the frontend.

## Environment variables (all optional), see `.env.example`

| Var | Purpose |
|---|---|
| `VITE_SITE_URL` | Final public URL. Enables `sitemap.xml` and adds the Sitemap line to `robots.txt` |
| `VITE_BASE_PATH` | Override the asset base. The default `./` works on both hosts |
| `VITE_FORMSPREE_ID` | Enables direct form submission |

## Deploy: Cloudflare Pages (recommended)

1. Push this folder to a GitHub repo.
2. In the Cloudflare dashboard, go to Workers & Pages → Create → Pages → Connect to Git.
3. Set the build command to `npm run build` and the output directory to `dist`. Under Environment variables, add `NODE_VERSION=20` and optionally `VITE_SITE_URL`.
4. Deploy. `404.html` is served automatically for unknown paths. No redirects are needed because this is a single page.

## Deploy: GitHub Pages

1. Push to GitHub. Go to Settings → Pages → Source: **GitHub Actions**.
2. Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
        env: { VITE_SITE_URL: https://<user>.github.io/<repo>/ }
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: '${{ steps.d.outputs.page_url }}' }
    steps:
      - id: d
        uses: actions/deploy-pages@v4
```

The relative base (`./`) means no repo-name configuration is needed. On project sites, `404.html` links back to `/<repo>/`.

## What's included

- Sticky nav with an active-section indicator, a mobile menu (Esc closes it), a skip link, and a theme toggle. The theme follows the system on the first visit and is remembered after that.
- A hero with a lightweight canvas "3D" data-node sphere. It doesn't use Three.js, pauses when off-screen and stays static under reduced motion.
- Skills filterable as practised or learning, with expandable notes.
- Project cards with tilt on fine pointers, honest status pills, and accessible case-study dialogs.
- A certificate gallery with category filters, search, a preview modal and download/verify actions.
- A Data Lab with four Recharts views. It's lazy-loaded and clearly labelled as sample data.
- A timeline that shows only confirmed dates on the axis. Undated items are listed separately.
- A resume section linked to a real generated PDF.
- SEO: title, description, Open Graph tags and image, favicon, robots and sitemap, and a custom 404 page.

## Notes on accessibility and colour

Small text in light mode uses darker shades of the same pink and chartreuse (`--pink-ink`, `--lime-ink`) so it meets WCAG AA on white. No new hues are introduced. Buttons use black text on pink or chartreuse. Every series in a chart is named in the legend and the tooltip, and the colours carry no emotional meaning.
