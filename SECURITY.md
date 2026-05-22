# Security Policy

## Scope

This repository hosts a **static, multi-page web application** built with
[Astro 5](https://astro.build/) and deployed to GitHub Pages. It is an
independent community helper for Microsoft 365 licensing decisions.

- **No backend.** All pages are pre-rendered at build time and served as
  static files from GitHub Pages.
- **No user accounts.** No login, no session cookies, no third-party auth.
- **No telemetry, no analytics, no third-party trackers.**
- **No data exfiltration.** Your assessment answers are kept in
  `sessionStorage` on your own device and never leave the browser.
- **One client-side dependency at runtime:** [jsPDF](https://github.com/parallax/jsPDF),
  lazy-loaded only when a user clicks **Download PDF**, used to generate the
  handout locally.

## Supported versions

Only the latest release on the `main` branch is supported. The deployed site
at <https://billmcilhargey.github.io/m365-profiles/> always reflects the most
recent successful build.

## Reporting a vulnerability

Please **do not open a public issue** for security findings.

Use **GitHub's private vulnerability reporting**:

1. Go to the repository's
   [Security tab](https://github.com/billmcilhargey/m365-profiles/security).
2. Click **Report a vulnerability**.
3. Include a clear description, reproduction steps, and the impact.

You can expect an initial response within **7 days**. Confirmed issues will be
fixed as quickly as possible and you will be credited in the release notes
unless you ask to remain anonymous.

## Out of scope

- The accuracy of any specific licensing recommendation. This is an
  independent helper, not Microsoft guidance — licensing-accuracy reports
  belong in regular issues, not security reports.
- Vulnerabilities in third-party sites linked from the page
  (`learn.microsoft.com`, `m365maps.com`, GitHub, etc.).
- Browser-specific UI rendering issues that have no security impact.

## Defense-in-depth measures

- **Content-Security-Policy** meta tag restricts scripts, styles, and image
  origins to `'self'` (plus `data:`/`blob:` for the inline favicon and the
  generated PDF download).
- **`form-action 'none'`**, **`frame-ancestors 'none'`**, **`object-src 'none'`**,
  and **`base-uri 'self'`** harden against clickjacking and base-tag injection.
- **`Referrer-Policy: strict-origin-when-cross-origin`** limits referrer leakage.
- **`Permissions-Policy`** disables camera, microphone, geolocation, and FLoC.
- All outbound links use `target="_blank"` with **`rel="noopener"`**.
- **HTML escaping** is performed on every dynamic string rendered by the
  client controller — there is no `innerHTML` of user-controlled data.
- GitHub Actions workflows declare a **zero-default permission posture** and
  grant only the minimum permission scope required per job.
- Pull-request CI runs **`dependency-review-action`** and fails on
  high-severity findings.
- **Dependabot** monitors GitHub Actions and npm dependencies weekly
  ([`.github/dependabot.yml`](.github/dependabot.yml)).
