# M365 Profiles — Microsoft 365 Licensing Decision Tree

[![Deploy](https://github.com/billmcilhargey/m365-profiles/actions/workflows/deploy.yml/badge.svg)](https://github.com/billmcilhargey/m365-profiles/actions/workflows/deploy.yml)
[![Lint](https://github.com/billmcilhargey/m365-profiles/actions/workflows/lint.yml/badge.svg)](https://github.com/billmcilhargey/m365-profiles/actions/workflows/lint.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live site](https://img.shields.io/badge/Live%20site-GitHub%20Pages-0078d4)](https://billmcilhargey.github.io/m365-profiles/)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro%205-FF5D01)](https://astro.build/)

Interactive decision tree that matches a **Microsoft 365 identity profile** —
privileged admin, information worker, frontline (F1/F3), education (A1/A3/A5),
government (GCC / GCC High / DoD / IL6), nonprofit, SMB, or External ID guest —
to the right license tier.

**Live site:** <https://billmcilhargey.github.io/m365-profiles/>

> ⚠️ **Not official Microsoft guidance.** This is an independent community
> helper — not a Microsoft product, not endorsed by Microsoft. Always verify
> SKUs and entitlements with your Microsoft account team. The Microsoft
> Product Terms are the source of truth.

## Highlights

- Static multi-page Astro site — no backend, no analytics, no cookies.
- 82 decision-tree nodes (28 questions, 7 choice screens, 4 info screens,
  43 results), every edge verified reachable on every push.
- Card-based UI with progress bar, source citations, full keyboard support,
  and one-click PDF handout (jsPDF, lazy-loaded only on click).
- Light / dark theme that respects `prefers-color-scheme` and persists locally.
- Reference catalog at `/reference` renders every result node as a static,
  indexable page for users without JavaScript.
- Dynamic `robots.txt`, `sitemap-index.xml`, and `version.json` — forks and
  custom domains work without editing static files.
- Released as a CalVer GitHub Release on every push to `main`.

## Quick start

```bash
git clone https://github.com/billmcilhargey/m365-profiles.git
cd m365-profiles
npm ci

npm run validate-tree   # verify the decision-tree wiring
npm run dev             # http://localhost:4321/m365-profiles
npm run build           # production build → ./dist
npm run preview         # serve ./dist locally
```

Requirements: **Node 20+** and **npm 10+**.

## Configuration

Every user-editable knob lives in **[`src/lib/config.js`](src/lib/config.js)** — a
single `CONFIG` object read by the Astro config, the layout, the web manifest,
the CSP meta tag, and the CI workflow. Edit one file and the change propagates
everywhere. Derived helpers in `src/lib/site.ts`, `security.ts`, and `brand.ts`
read from `CONFIG` and should not be edited directly.

### Site identity

| Key | Default | What it controls |
|---|---|---|
| `origin` | `https://billmcilhargey.github.io` | Site origin (no trailing slash). `Astro.site`, JSON-LD `@id`, robots.txt sitemap, canonical URLs. Override with `PUBLIC_SITE_URL`. |
| `base` | `/m365-profiles` | Site base path. `Astro.base` and every internal-link prefix. Override with `PUBLIC_SITE_BASE`. |
| `name` | `M365 Profiles` | Brand name in navbar, footer, `<title>`, manifest, JSON-LD. |
| `tagline` | `Microsoft 365 Licensing Decision Tree` | Home `<title>` suffix and JSON-LD `description`. |
| `owner` | `Dr. Bill Mcilhargey` | Footer copyright, `<meta author>`, JSON-LD `Person`. |
| `repo` | `billmcilhargey/m365-profiles` | GitHub `owner/repo` slug — drives `GITHUB_URL` and source deep-links. |
| `defaultBranch` | `main` | Branch used in `blob/<branch>/…` deep-links. |

### Brand colors

Mirror these in `src/styles/tokens.css` (`--ms-blue`, `--ms-blue-darkest`, `--ms-square-1..4`) — CSS can't import JS at runtime.

| Key | Default | What it controls |
|---|---|---|
| `colors.blue` | `#0078d4` | Primary → `<meta theme-color>`, PDF headings. |
| `colors.navy` | `#003e72` | Secondary → PDF headings, hover accents. |
| `colors.squares` | `["#f25022","#7fba00","#00a4ef","#ffb900"]` | Four-square palette → nav logo + auto-derived favicon. |

### Page metadata, manifest, and storage

| Key | Default | What it controls |
|---|---|---|
| `defaultDescription` | *(see file)* | Fallback `<meta description>`. |
| `language` / `direction` | `en` / `ltr` | `<html lang>` / `<html dir>` and JSON-LD `inLanguage`. |
| `titleSeparator` | ` — ` | `pageTitle("X")` → `"X — Brand"`. |
| `manifest.description` | *(see file)* | Install-prompt description. |
| `manifest.display` | `minimal-ui` | PWA display mode. |
| `manifest.orientation` | `any` | PWA orientation lock. |
| `manifest.backgroundColor` | `#ffffff` | PWA splash background. |
| `storage.theme` | `m365-theme` | localStorage key for color theme. |
| `storage.knownVersion` | `m365-known-version` | localStorage key for cache-bust detection. |
| `storage.assessmentStatePrefix` | `m365-assessment-state` | sessionStorage prefix; suffixed with `APP_VERSION` so deploys invalidate stale sessions. |

### Security headers

Delivered as `<meta>` tags from [`src/layouts/Base.astro`](src/layouts/Base.astro) — GitHub Pages can't set real HTTP headers. Loosen at your own risk.

| Key | Default | What it controls |
|---|---|---|
| `security.csp` | strict same-origin (11 directives) | Joined with a `;` + space separator into `<meta http-equiv="Content-Security-Policy">`. |
| `security.referrerPolicy` | `strict-origin-when-cross-origin` | `<meta name="referrer">`. |
| `security.permissionsPolicy` | denies camera / mic / geolocation / FLoC | `<meta http-equiv="Permissions-Policy">`. |

### External links and CI overrides

- `CONFIG.externalSources` — array of `{ href, label }` rendered in the footer.
- The deploy workflow resolves URL/base from Actions variables `PUBLIC_SITE_URL` / `PUBLIC_SITE_BASE` first, then falls back to `CONFIG.origin` / `CONFIG.base`. Forks can target their own Pages URL without editing `config.js`.

## Editing the decision tree

All decision logic lives in [`src/data/tree.js`](src/data/tree.js). Each node
is one of: a `question` (yes/no), a `choice` (n-way picker), an `info` screen,
or a terminal `result`. Workflow:

1. Edit nodes in [`src/data/tree.js`](src/data/tree.js).
2. Re-wire `yes` / `no` / `target` edges to point at your node ids.
3. `npm run validate-tree` — confirms every edge resolves and every node is
   reachable from the start node.
4. `npm run build` to confirm the site still compiles.
5. Open a PR — `lint.yml` re-runs validation, link-check, markdownlint, and
   dependency review.

## Versioning

CI sets `PUBLIC_APP_VERSION` (CalVer `vYYYY.MM.DD-N`) and `PUBLIC_BUILD_DATE`
before `astro build`, so every page, the footer, the PDF, and `/version.json`
all bake the same string. On load the client fetches `/version.json` and, if a
new build is detected, clears `sessionStorage` and reloads — users see the new
release as soon as they revisit the tab.

## Deployment

| Workflow | Trigger | What it does |
| --- | --- | --- |
| [`deploy.yml`](.github/workflows/deploy.yml) | push to `main`, manual | Validate tree → build → publish to GitHub Pages → tag CalVer release. Add `[skip release]` to skip tagging. |
| [`lint.yml`](.github/workflows/lint.yml) | push + PR to `main` | Build + tree validation, markdownlint, link check, dependency review (PRs). |

**Enable Pages on a fork:** push to `main`, then **Settings → Pages → Source: GitHub Actions**.

**Custom domain:** add `public/CNAME` with the bare hostname, configure DNS + HTTPS under **Settings → Pages**, and either set the `PUBLIC_SITE_URL` Actions variable or edit `CONFIG.origin`.

## Project layout

```text
astro.config.mjs       Astro config (site, base, MDX, sitemap)
scripts/
  validate-tree.js     Tree wiring + reachability check
src/
  config.js (in lib/)  Single source of truth for editable knobs
  data/tree.js         82-node decision tree
  lib/                 Derived constants + DOM/path helpers (do not edit)
  client/              Assessment renderer + lazy PDF builder
  layouts/Base.astro   HTML shell, meta tags, CSP, cache-bust bootstrap
  components/          Nav, Footer, Disclaimer
  pages/               index, assessment, profiles, reference, about, 404,
                       robots.txt, sitemap, manifest, version.json
  styles/              Tokens, base, components, print
  content/             MDX explainers keyed to result ids
public/                Static assets (og-image.svg, optional CNAME)
.github/               Workflows, dependabot, CODEOWNERS, issue templates
```

## Keyboard shortcuts (assessment)

| Key | Action |
| --- | --- |
| `1`–`9`, `A`–`Z` | Pick a numbered / lettered choice |
| `Y` / `N` (or `1` / `2`) | Yes / No on question screens |
| `←` or `Backspace` | Go back one step |
| `R` | Restart |
| `Tab` / `Enter` / `Space` | Standard focus + activation |

## Security & privacy

Static site. No backend, no telemetry, no cookies. Defense-in-depth `<meta>`
headers (CSP, Referrer-Policy, Permissions-Policy). Report vulnerabilities
privately — see [`SECURITY.md`](SECURITY.md).

## Trademark notice

Microsoft, Microsoft 365, Azure, Entra, Defender, Purview, Intune, Teams,
Copilot, and related product names are trademarks of Microsoft Corporation.
This site uses those names nominatively to identify the products discussed.
The four colored accent squares used as a favicon and navbar mark are not the
Microsoft corporate logo. This project is not affiliated with, sponsored by,
or endorsed by Microsoft Corporation.

## Acknowledgements

- UI patterns inspired by [Microsoft Zero Trust Assessment](https://github.com/microsoft/zerotrustassessment).
- License cross-references on top of [m365maps.com](https://m365maps.com/) by Aaron Dinnage.
- Built with [Astro 5](https://astro.build/) and [jsPDF](https://github.com/parallax/jsPDF).

## License

[MIT](LICENSE) © Dr. Bill Mcilhargey
