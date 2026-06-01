import type { NextConfig } from "next";
import path from "node:path";

// Pin the workspace root to THIS directory. Without it, Next infers the root
// from stray parent lockfiles (it was picking C:\), which breaks asset tracing
// on Vercel and spams a dev warning.
const root = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: { root },
  outputFileTracingRoot: root,
};

export default nextConfig;
