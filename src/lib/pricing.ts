// Microsoft 365 frontline-relevant list prices, used by the step-by-step
// frontline qualification wizard to compute "F + add-ons vs. E uplift" totals.
//
// All values below are publicly published Microsoft list prices, USD, per
// user / month, on annual commitment (the most common purchasing motion).
// CSP / EA / volume / promo / partner-specific pricing always differs — the
// wizard surfaces a banner that says "verify with your Microsoft account
// team before purchase" in the result card.
//
// Last reviewed: 2026-05. When updating prices, bump LAST_VERIFIED so the
// disclaimer renders the new date.

export const FRONTLINE_PRICING_LAST_VERIFIED = "2026-05";

/** Canonical Microsoft 365 licensing-resources hub — surfaced in the computed
 *  result callout so every recommendation links back to the official source
 *  for plan comparisons, service descriptions, and Product Terms documents. */
export const MICROSOFT_365_LICENSING_DOCS = {
  label: "Microsoft 365 — Licensing Resources and Documents",
  url: "https://www.microsoft.com/licensing/docs/view/Microsoft-365",
} as const;

/** Microsoft 365 Enterprise plans & pricing page (E1 / E3 / E5 list prices,
 *  feature comparison grid, FAQs). Source of truth for E-SKU pricing rows. */
export const MICROSOFT_365_ENTERPRISE_PRICING = {
  label: "Microsoft 365 Enterprise — plans & pricing (E3 / E5 comparison)",
  url: "https://www.microsoft.com/en-us/microsoft-365/enterprise/microsoft365-plans-and-pricing",
} as const;

/** Microsoft 365 Frontline plans & pricing page (F1 / F3 list prices, feature
 *  comparison, eligibility blurb). Source of truth for F-SKU pricing rows. */
export const MICROSOFT_365_FRONTLINE_PRICING = {
  label: "Microsoft 365 Frontline — plans & pricing (F1 / F3 comparison)",
  url: "https://www.microsoft.com/en-us/microsoft-365/enterprise/frontline-plans-and-pricing",
} as const;

/** Official Microsoft "Modern Work Plan Comparison — Enterprise" PDF (the
 *  authoritative per-feature E vs F vs Defender Suite vs Purview Suite vs
 *  Agent 365 matrix). Updated by Microsoft Commercial on a recurring cadence;
 *  bump the URL filename when a newer dated edition is published. */
export const MODERN_WORK_PLAN_COMPARISON = {
  label: "Modern Work Plan Comparison — Enterprise (official Microsoft PDF, May 2026 edition)",
  url: "https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/bade/documents/products-and-services/en-us/education/Modern-Work-Plan-Comparison-Enterprise-5-1-2026.pdf",
} as const;

/** Exchange Online service-description limits page — the canonical source for
 *  mailbox / archive / Recoverable Items / message-size / send-rate /
 *  receive-rate ceilings used throughout the wizard's mailbox + archive +
 *  message questions. Cite this when a help blurb gives a specific number. */
export const EXCHANGE_ONLINE_LIMITS = {
  label:
    "Exchange Online — service description limits (mailbox & archive sizes, message size, send/receive rates)",
  url: "https://learn.microsoft.com/en-us/office365/servicedescriptions/exchange-online-service-description/exchange-online-limits",
} as const;

export type PriceItem = {
  /** Stable key — also used as the addon dedupe key in wizard state. */
  key: string;
  /** Display name shown in the result card. */
  name: string;
  /** USD per user per month, list, annual commitment. */
  cost: number;
  /** Public Microsoft source for the price / SKU. */
  source: { label: string; url: string };
  /** Short blurb shown under the line item in the breakdown. */
  note?: string;
};

/** Base SKU list prices (per user / month, USD, annual commitment). */
export const BASE_SKUS = {
  f1: {
    key: "f1",
    name: "Microsoft 365 F1",
    cost: 2.25,
    source: {
      label: "Microsoft 365 frontline plans & pricing",
      url: "https://www.microsoft.com/en-us/microsoft-365/enterprise/frontline-plans-and-pricing",
    },
    note: "Kiosk-grade frontline — Teams + SharePoint browse + Stream + Intune + Entra ID P1. No personal Exchange mailbox (Teams calendar / free-busy only); no Office authoring.",
  },
  f3: {
    key: "f3",
    name: "Microsoft 365 F3",
    cost: 8.0,
    source: {
      label: "Microsoft 365 frontline plans & pricing",
      url: "https://www.microsoft.com/en-us/microsoft-365/enterprise/frontline-plans-and-pricing",
    },
    note: "Full-featured frontline — 2 GB Exchange mailbox (no archive mailbox per the Exchange Online limits doc; Recoverable Items quota 30 GB / 100 GB on hold), Office web + mobile (<10.9″ devices), Teams, Intune, Defender for Office P1, AIP P1.",
  },
  e3: {
    key: "e3",
    name: "Microsoft 365 E3",
    cost: 36.0,
    source: {
      label: "Microsoft 365 Enterprise plans & pricing",
      url: "https://www.microsoft.com/en-us/microsoft-365/enterprise/microsoft365-plans-and-pricing",
    },
    note: "Information-worker baseline — Exchange Online Plan 2 (100 GB primary mailbox + 100 GB → 1.5 TB auto-expanding archive), desktop Office, full Teams, Intune, Entra ID P1, Defender for Office P1, AIP P1, 1+ TB OneDrive.",
  },
  e5: {
    key: "e5",
    name: "Microsoft 365 E5",
    cost: 57.0,
    source: {
      label: "Microsoft 365 Enterprise plans & pricing",
      url: "https://www.microsoft.com/en-us/microsoft-365/enterprise/microsoft365-plans-and-pricing",
    },
    note: "E3 mailbox / archive (100 GB + 1.5 TB auto-expanding) + Defender XDR (P2 + Defender for Identity + Defender for Cloud Apps + Defender for Office P2), Purview E5 (IRM / Comm Compliance / eDiscovery Premium / Customer Lockbox), Entra ID P2 (PIM / Identity Protection / Governance), Power BI Pro, Teams Phone.",
  },
} as const satisfies Record<string, PriceItem>;

/**
 * Add-ons that can legitimately be layered on F1 / F3 per Microsoft Product
 * Terms and the frontline service description, with their public list prices.
 */
export const ADDONS: Record<string, PriceItem> = {
  teams_phone_frontline: {
    key: "teams_phone_frontline",
    name: "Teams Phone Standard for Frontline Workers",
    cost: 4.0,
    source: {
      label: "Teams Phone Standard for Frontline Workers — Microsoft Teams add-ons",
      url: "https://learn.microsoft.com/en-us/microsoftteams/teams-add-on-licensing/microsoft-teams-add-on-licensing",
    },
    note: "Add-on specifically authorised for F1 / F3 users — pairs with a Calling Plan or Direct Routing for PSTN.",
  },
  teams_enterprise_addon: {
    key: "teams_enterprise_addon",
    name: "Teams Enterprise add-on",
    cost: 5.25,
    source: {
      label: "Microsoft 365 + Teams 2025 packaging update",
      url: "https://www.microsoft.com/en-us/licensing/news/Microsoft365-Teams-2025",
    },
    note: "Enables town halls, webinars, full meeting features on top of an F SKU. Required for any large-audience meeting hosting.",
  },
  exchange_online_p2: {
    key: "exchange_online_p2",
    name: "Exchange Online Plan 2",
    cost: 8.0,
    source: {
      label: "Exchange Online plans & pricing",
      url: "https://www.microsoft.com/en-us/microsoft-365/exchange/compare-microsoft-exchange-online-plans",
    },
    note: "100 GB primary mailbox + 100 GB → 1.5 TB auto-expanding archive (per Exchange Online service-description limits) + DLP for email. Replaces the F3 mailbox (re-license to EOP2 — you don't stack F3's 2 GB mailbox).",
  },
  defender_endpoint_p1: {
    key: "defender_endpoint_p1",
    name: "Microsoft Defender for Endpoint Plan 1",
    cost: 3.0,
    source: {
      label: "Microsoft Defender for Endpoint plans",
      url: "https://learn.microsoft.com/en-us/defender-endpoint/defender-endpoint-plan-1-2",
    },
    note: "Next-gen AV + attack-surface reduction + manual response. The frontline-tier MDE is sold separately from M365 F SKUs.",
  },
  defender_endpoint_p2: {
    key: "defender_endpoint_p2",
    name: "Microsoft Defender for Endpoint Plan 2",
    cost: 5.2,
    source: {
      label: "Microsoft Defender for Endpoint plans",
      url: "https://learn.microsoft.com/en-us/defender-endpoint/defender-endpoint-plan-1-2",
    },
    note: "Adds EDR, automated investigation/response, threat hunting, vulnerability management to P1.",
  },
  defender_office_p2: {
    key: "defender_office_p2",
    name: "Microsoft Defender for Office 365 Plan 2",
    cost: 5.0,
    source: {
      label: "Microsoft Defender for Office 365 plans",
      url: "https://learn.microsoft.com/en-us/defender-office-365/mdo-about",
    },
    note: "Adds Threat Explorer, Attack Simulation Training, Threat Trackers, and Campaign Views on top of the P1 capabilities included with F3.",
  },
  entra_id_p2: {
    key: "entra_id_p2",
    name: "Microsoft Entra ID P2",
    cost: 9.0,
    source: {
      label: "Microsoft Entra ID plans & pricing",
      url: "https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing",
    },
    note: "Privileged Identity Management, risk-based Conditional Access, Identity Protection. P1 is already included in F1 / F3.",
  },
  purview_dlp: {
    key: "purview_dlp",
    name: "Microsoft 365 E5 Compliance add-on",
    cost: 12.0,
    source: {
      label: "Microsoft 365 E5 Compliance — Microsoft Purview plans",
      url: "https://www.microsoft.com/en-us/security/business/compliance/compliance-plans",
    },
    note: "Brings Purview DLP, IRM, Comm Compliance, eDiscovery Premium, Customer Lockbox. Frontline workers rarely qualify — usually a hard fail to E5.",
  },
  copilot_m365: {
    key: "copilot_m365",
    name: "Microsoft 365 Copilot",
    cost: 30.0,
    source: {
      label: "Microsoft 365 Copilot — plans & pricing",
      url: "https://www.microsoft.com/en-us/microsoft-365/copilot/copilot-for-work",
    },
    note: "Per-user add-on. Microsoft has begun licensing Copilot for select frontline scenarios — verify availability for F1 / F3 with your account team.",
  },
};

/**
 * Hard-fail uplift policy — which feature gap forces which enterprise SKU.
 * Used by the wizard to roll up many "no, F can't do this" signals into the
 * single cheapest E recommendation that closes every gap.
 */
export type UpliftTarget = "e3" | "e5";

/** Pretty-print a USD price to 2 decimals with a leading $. */
export function formatPrice(usd: number): string {
  return `$${usd.toFixed(2)}`;
}
