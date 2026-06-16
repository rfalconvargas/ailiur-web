# Deploy Notes — Tellumetry (tellumetry.ailiur.com)

The Tellumetry landing page is **not** a standalone app. It is a route inside the
existing Ailiur `web` Next.js project and is served at its production subdomain via
a host rewrite, exactly like the other Ailiur microsites (Retellum, Aptellum, Tayzt).

- Page route: `src/app/tellumetry/page.tsx`
- Components: `src/components/tellumetry/`
- Copy / content: `src/lib/tellumetry/content.ts`
- Subdomain rewrite + redirect: `next.config.ts` (host `tellumetry.ailiur.com` → `/tellumetry`)

## Vercel settings

| Setting              | Value                                                            |
| -------------------- | ---------------------------------------------------------------- |
| Framework Preset     | **Next.js**                                                      |
| Production domain     | **tellumetry.ailiur.com**                                        |
| Root directory       | **`web`** (the existing app root — this repo is not a monorepo)  |
| Build command        | `next build` (default — `npm run build`)                         |
| Install command      | `npm install` (default)                                          |
| Output               | `.next` (default)                                                |
| Environment variables | **None required** for this prototype                            |

## Notes

- This is a **frontend-only prototype**. The Agent Preflight Simulator runs entirely
  in the browser with deterministic mock data — no backend, database, auth, or real
  agent connection. The waitlist form is a local-only mock (logs to the console and
  shows a success state); wire it to a real endpoint before collecting live signups.
- Deploy to the **`web`** Vercel project (the one that already serves ailiur.com and
  the other microsites) so the `next.config.ts` host rewrites take effect. Do **not**
  create a separate project.
- After the first production deploy, attach `tellumetry.ailiur.com` to the `web`
  project (`vercel domains add tellumetry.ailiur.com web`) so the subdomain auto-tracks
  the latest production deployment. Until the domain is attached, the page is reachable
  at `https://ailiur.com/tellumetry`.
- `NEXT_PUBLIC_SITE_URL` is optional: if set, it overrides the origin used for canonical
  and Open Graph URLs. Leave it unset for the prototype.
