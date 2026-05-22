// Central configuration — every user-editable knob lives here.
// All other modules derive from CONFIG; see README ▸ Configuration.
// Overrides: PUBLIC_SITE_URL, PUBLIC_SITE_BASE (env / Actions vars).

export const CONFIG = Object.freeze({
  // Site identity
  origin: "https://billmcilhargey.github.io",
  base: "/m365-profiles",
  name: "M365 Profiles",
  tagline: "Microsoft 365 Licensing Decision Tree",
  owner: "Dr. Bill Mcilhargey",
  repo: "billmcilhargey/m365-profiles",
  defaultBranch: "main",

  // Brand colors — also mirrored in src/styles/tokens.css; keep in sync.
  colors: Object.freeze({
    blue: "#0078d4",
    navy: "#003e72",
    squares: Object.freeze(["#f25022", "#7fba00", "#00a4ef", "#ffb900"]),
  }),

  // Page metadata defaults
  defaultDescription:
    "Interactive decision tree that matches a Microsoft 365 identity profile to the right license tier — independent, unofficial community helper.",
  language: "en",
  direction: "ltr",
  titleSeparator: " — ",

  // Web app manifest (/manifest.webmanifest)
  manifest: Object.freeze({
    description:
      "Independent decision-tree helper that maps Microsoft 365 identity profiles to the right license tier.",
    display: "minimal-ui",
    orientation: "any",
    backgroundColor: "#ffffff",
  }),

  // Security headers (delivered as <meta> tags; GitHub Pages can't set real headers)
  security: Object.freeze({
    csp: Object.freeze([
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "form-action 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ]),
    referrerPolicy: "strict-origin-when-cross-origin",
    permissionsPolicy: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  }),

  // Browser storage key prefixes. assessmentState is suffixed with APP_VERSION
  // at runtime so each deploy invalidates in-progress sessions.
  storage: Object.freeze({
    theme: "m365-theme",
    knownVersion: "m365-known-version",
    assessmentStatePrefix: "m365-assessment-state",
  }),

  // Footer "source document" links. The first two are the legally binding
  // sources of truth (Microsoft Licensing hub + Microsoft Product Terms,
  // which contains the Use Rights for every Microsoft Online Service);
  // the rest are operational / community references.
  externalSources: Object.freeze([
    {
      href: "https://www.microsoft.com/licensing/terms",
      label: "Microsoft Product Terms (Use Rights)",
    },
    { href: "https://www.microsoft.com/en-us/licensing", label: "Microsoft Licensing Hub" },
    { href: "https://learn.microsoft.com/microsoft-365/", label: "Microsoft 365 Learn" },
    { href: "https://learn.microsoft.com/entra/", label: "Microsoft Entra Learn" },
    { href: "https://m365maps.com/", label: "M365 Maps (Aaron Dinnage)" },
    { href: "https://microsoft.github.io/zerotrustassessment/", label: "Zero Trust Assessment" },
  ]),
});
