import type { APIRoute } from "astro";
import { BRAND } from "@lib/brand";
import { baseUrl } from "@lib/paths";
import { CONFIG } from "@lib/config.js";

// Dynamic web app manifest so the base path + name stay in sync with the brand
// constants and forks don't have to maintain a separate static file.
export const GET: APIRoute = () => {
  const baseRaw = baseUrl();
  const start = baseRaw.length > 0 ? `${baseRaw}/` : "/";
  const body = {
    name: `${BRAND.name}${CONFIG.titleSeparator}${BRAND.tagline}`,
    short_name: BRAND.name,
    description: CONFIG.manifest.description,
    start_url: start,
    scope: start,
    display: CONFIG.manifest.display,
    orientation: CONFIG.manifest.orientation,
    background_color: CONFIG.manifest.backgroundColor,
    theme_color: BRAND.blue,
    icons: [
      {
        src: `${start}og-image.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
};
