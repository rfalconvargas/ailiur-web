This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Oruvo by Ailiur — wealth-intelligence landing + waitlist (`oruvo.ailiur.com`)

Oruvo is **not** a standalone app. It is a route inside this `web` project, served at
its subdomain via a host rewrite — exactly like the other Ailiur microsites
(Ollune, UCM, Tellumetry, …).

> **Subdomain note:** the live target is **`oruvo.ailiur.com`** (the product brand).
> An earlier brief mentioned `wealth.ailiur.com`; the routing, metadata, and structured
> data are all wired to `oruvo.ailiur.com`. To launch at a different host, change
> `BRAND` in `src/lib/oruvo/content.ts` and the `ORUVO_HOST` constant in `next.config.ts`.

| Concern            | Location                                                            |
| ------------------ | ------------------------------------------------------------------- |
| Page route         | `src/app/oruvo/` (`layout.tsx` = SEO/JSON-LD, `page.tsx` = sections) |
| Components         | `src/components/oruvo/`                                              |
| Copy + demo data   | `src/lib/oruvo/content.ts` (edit `BRAND` to rename the whole site)  |
| Theme (scoped)     | `src/components/oruvo/theme.css` (`.oruvo` tokens — global pages untouched) |
| Subdomain routing  | `next.config.ts` (host `oruvo.ailiur.com` → `/oruvo`)               |

### Commands

```bash
npm run dev      # local dev at http://localhost:3000/oruvo
npm run build    # production build (must pass before deploy)
npm run start    # serve the production build
npm run lint     # eslint
```

### How the waitlist works

The waitlist form (`src/components/oruvo/waitlist.tsx`) is backend-optional:

- **No endpoint set (default):** on submit it validates the email, shows the premium
  success state, and stores the signup in `localStorage` under the key
  `oruvo:waitlist` (array of `{ email, help, note, at }`). Good enough for an MVP preview.
- **Endpoint set:** if `NEXT_PUBLIC_WAITLIST_ENDPOINT` is defined, the form `POST`s the
  same JSON to that URL with `Content-Type: application/json`.

**To add a real endpoint later:** set `NEXT_PUBLIC_WAITLIST_ENDPOINT` in Vercel
(Project → Settings → Environment Variables) to any handler that accepts a JSON `POST`
— a Next.js Route Handler (`src/app/api/oruvo-waitlist/route.ts`), a Supabase Edge
Function, Formspree, Resend, etc. No code change is required; the form auto-detects it.

### Deploy to Vercel — checklist

1. Deploy to the **existing `web` Vercel project** (the one already serving ailiur.com
   and the other microsites) — **do not** create a separate project, or the
   `next.config.ts` host rewrites won't apply.
2. Confirm **Root Directory = `web`** and **Framework Preset = Next.js**.
3. Push to the production branch (or `vercel --prod`) to trigger a production deploy.
4. Add the domain: **`vercel domains add oruvo.ailiur.com web`** (or Project → Settings →
   Domains → add `oruvo.ailiur.com`).
5. If DNS is external, add the **CNAME/A record Vercel shows** for the subdomain
   (typically `CNAME oruvo → cname.vercel-dns.com`). Wait for verification.
6. **Redeploy production** so the subdomain tracks the latest deployment.
7. Verify:
   - `https://oruvo.ailiur.com` returns **200** (until the domain is attached, the page
     is reachable at `https://ailiur.com/oruvo`).
   - Hero loads · interactive **asset map**, **future planner**, **subscription tracker**
     all respond · **waitlist success state** works · **mobile** layout has no overflow.
