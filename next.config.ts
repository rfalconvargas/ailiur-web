import type { NextConfig } from "next";
import path from "node:path";

// Pin the workspace root to THIS directory. Without it, Next infers the root
// from stray parent lockfiles (it was picking C:\), which breaks asset tracing
// on Vercel and spams a dev warning.
const root = path.resolve(__dirname);

// The Retellum microsite is served from this same project under the
// retellum.ailiur.com subdomain. We lock it down so the subdomain only ever
// shows Retellum: its root rewrites to /retellum, and every other path
// redirects back to the main site. Asset paths (/_next/*) are excluded from
// the redirect so the page's own JS/CSS still load on the subdomain.
const RETELLUM_HOST = "retellum.ailiur.com";

// aptellum.ailiur.com — same pattern: subdomain root serves /aptellum.
const APTELLUM_HOST = "aptellum.ailiur.com";

// tayzt.ailiur.com — same pattern: subdomain root serves /tayzt.
const TAYZT_HOST = "tayzt.ailiur.com";

// tellumetry.ailiur.com — same pattern: subdomain root serves /tellumetry.
const TELLUMETRY_HOST = "tellumetry.ailiur.com";

// ucm.ailiur.com — same pattern: subdomain root serves /ucm.
const UCM_HOST = "ucm.ailiur.com";

// ollune.ailiur.com — same pattern: subdomain root serves /ollune.
const OLLUNE_HOST = "ollune.ailiur.com";

// lociq.ailiur.com — same pattern: subdomain root serves /lociq.
const LOCIQ_HOST = "lociq.ailiur.com";

// oruvo.ailiur.com — same pattern: subdomain root serves /oruvo
// (the wealth-intelligence product, "Oruvo by Ailiur").
const ORUVO_HOST = "oruvo.ailiur.com";

// Enterprise Suite — each enterprise app is served at its own subdomain root,
// rewriting to /enterprise/<slug> (same lock-down pattern as the others).
const ENTERPRISE_SUBS: { host: string; path: string }[] = [
  { host: "enchiridionschools.ailiur.com", path: "/enterprise/enchiridion-schools" },
  { host: "qetosclinics.ailiur.com", path: "/enterprise/qetos-clinics" },
  { host: "oruvoadvisors.ailiur.com", path: "/enterprise/oruvo-advisors" },
  { host: "olluneenterprise.ailiur.com", path: "/enterprise/ollune-enterprise" },
  { host: "retellumstudios.ailiur.com", path: "/enterprise/retellum-studios" },
  { host: "tayztstudios.ailiur.com", path: "/enterprise/tayzt-studios" },
  { host: "tellumetryenterprise.ailiur.com", path: "/enterprise/tellumetry-enterprise" },
  { host: "lociqcities.ailiur.com", path: "/enterprise/lociq-cities" },
  { host: "ucmenterprise.ailiur.com", path: "/enterprise/ucm-enterprise" },
  { host: "glyfrateams.ailiur.com", path: "/enterprise/glyfra-teams" },
];

const nextConfig: NextConfig = {
  turbopack: { root },
  outputFileTracingRoot: root,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: RETELLUM_HOST }],
          destination: "/retellum",
        },
        {
          source: "/opengraph-image",
          has: [{ type: "host", value: APTELLUM_HOST }],
          destination: "/aptellum/opengraph-image",
        },
        {
          source: "/",
          has: [{ type: "host", value: APTELLUM_HOST }],
          destination: "/aptellum",
        },
        {
          source: "/",
          has: [{ type: "host", value: TAYZT_HOST }],
          destination: "/tayzt",
        },
        {
          source: "/",
          has: [{ type: "host", value: TELLUMETRY_HOST }],
          destination: "/tellumetry",
        },
        {
          source: "/",
          has: [{ type: "host", value: UCM_HOST }],
          destination: "/ucm",
        },
        {
          source: "/",
          has: [{ type: "host", value: OLLUNE_HOST }],
          destination: "/ollune",
        },
        {
          source: "/",
          has: [{ type: "host", value: LOCIQ_HOST }],
          destination: "/lociq",
        },
        {
          source: "/",
          has: [{ type: "host", value: ORUVO_HOST }],
          destination: "/oruvo",
        },
        ...ENTERPRISE_SUBS.map((s) => ({
          source: "/",
          has: [{ type: "host" as const, value: s.host }],
          destination: s.path,
        })),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      {
        // Any non-root path on the Retellum subdomain (except internal asset paths)
        // bounces to the same path on the main site.
        source: "/:path((?!_next/).+)",
        has: [{ type: "host", value: RETELLUM_HOST }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      },
      {
        // Aptellum subdomain: non-root paths (except OG image + assets) → main site.
        source: "/:path((?!_next/|opengraph-image).+)",
        has: [{ type: "host", value: APTELLUM_HOST }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      },
      {
        // Tayzt subdomain: non-root paths (except assets) → main site.
        source: "/:path((?!_next/).+)",
        has: [{ type: "host", value: TAYZT_HOST }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      },
      {
        // Tellumetry subdomain: non-root paths (except assets) → main site.
        source: "/:path((?!_next/).+)",
        has: [{ type: "host", value: TELLUMETRY_HOST }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      },
      {
        // UCM subdomain: non-root paths (except assets) → main site.
        source: "/:path((?!_next/).+)",
        has: [{ type: "host", value: UCM_HOST }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      },
      {
        // Ollune subdomain: non-root paths (except assets) → main site.
        source: "/:path((?!_next/).+)",
        has: [{ type: "host", value: OLLUNE_HOST }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      },
      {
        // Lociq subdomain: non-root paths (except assets) → main site.
        source: "/:path((?!_next/).+)",
        has: [{ type: "host", value: LOCIQ_HOST }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      },
      {
        // Oruvo subdomain: non-root paths (except assets) → main site.
        source: "/:path((?!_next/).+)",
        has: [{ type: "host", value: ORUVO_HOST }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      },
      ...ENTERPRISE_SUBS.map((s) => ({
        source: "/:path((?!_next/).+)",
        has: [{ type: "host" as const, value: s.host }],
        destination: "https://ailiur.com/:path",
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
