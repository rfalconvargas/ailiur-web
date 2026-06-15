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
    ];
  },
};

export default nextConfig;
