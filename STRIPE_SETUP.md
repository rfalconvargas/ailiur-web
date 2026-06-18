# Stripe Setup — Ailiur App Founder Access

## 1. Overview

Ailiur uses **Stripe-hosted Checkout** for **subscription pre-orders** ("Reserve
Ailiur Founder Access"). The browser never sees card data and never sends a
price amount — it only sends a **tier key** (`starter` | `pro` | `max`). The
backend maps that key to a Stripe **Price ID** (from env vars) and creates a
Checkout Session in `subscription` mode.

**Webhooks are the source of truth.** The success page never grants access on
its own — it reads what the webhook recorded in the database.

Key files:

| Concern | File |
| --- | --- |
| Checkout session | `src/app/api/create-checkout-session/route.ts` |
| Webhook (fulfillment) | `src/app/api/stripe/webhook/route.ts` |
| Customer Portal | `src/app/api/create-customer-portal-session/route.ts` |
| Stripe client + tier↔price maps | `src/lib/stripe.ts` |
| Persistence seam | `src/lib/billing/store.ts` |
| DB schema | `supabase/migrations/0005_stripe_billing.sql` |
| Pricing UI | `src/components/ui/founder-access.tsx` |
| Success / cancel / account | `src/app/checkout/success`, `src/app/checkout/cancel`, `src/app/account` |
| Onboarding survey | `src/app/founder-onboarding`, `supabase/migrations/0006_founder_onboarding.sql` |

## 2. Required Stripe objects

Create one **Product** with three recurring monthly **Prices**:

- **Product:** Ailiur App
- **Prices** (recurring, monthly, USD):
  - Starter — **$15/month**
  - Pro — **$50/month**
  - Max — **$150/month**

Copy each resulting `price_…` ID into the env vars below. Enterprise is
**contact-sales only** and is intentionally **not** wired to Stripe.

## 3. Required environment variables

```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_STARTER=
STRIPE_PRICE_PRO=
STRIPE_PRICE_MAX=
NEXT_PUBLIC_SITE_URL=
```

Optional: `NEXT_PUBLIC_SUPPORT_EMAIL` (defaults to `support@ailiur.com`).

- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` are **server-only** — never
  exposed to the browser.
- `STRIPE_PRICE_*` are the Price IDs from §2.
- `NEXT_PUBLIC_SITE_URL` is the absolute origin used to build success/cancel
  URLs (e.g. `http://localhost:3000` in dev, `https://www.ailiur.com` in prod).

## 4. Local development

```bash
# 1. Install dependencies
npm install

# 2. Add env vars — copy the template and fill in TEST-mode values
cp .env.local.example .env.local
#    Use Stripe TEST keys (sk_test_…) and TEST Price IDs.

# 3. Apply the database migrations (Supabase) so the webhook can persist
supabase db push          # applies 0005 (billing) + 0006 (onboarding)

# 4. Run the dev server
npm run dev               # http://localhost:3000

# 5. Forward webhooks with the Stripe CLI (separate terminal)
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
#    Copy the printed whsec_… into .env.local as STRIPE_WEBHOOK_SECRET, then
#    restart `npm run dev` so it's picked up.

# 6. Test a checkout
#    Visit http://localhost:3000/pricing, click "Reserve Pro", and use the
#    Stripe test card 4242 4242 4242 4242, any future expiry, any CVC/ZIP.

# 7. (Optional) Fire events manually instead of completing a real checkout
stripe trigger checkout.session.completed
stripe trigger invoice.paid
stripe trigger invoice.payment_failed
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted
```

> **Use test mode.** Everything above runs against Stripe **test mode**. No real
> money moves. Test cards: <https://stripe.com/docs/testing>.

## 5. Stripe Dashboard setup

1. **Create the product & prices** (§2) — note each `price_…` ID.
2. **Configure the Customer Portal:** Settings → Billing → **Customer portal** →
   activate and save. Choose what customers may do (update payment method, cancel,
   view invoices). The portal route returns a 404-with-message until this is on.
3. **Configure Tax (optional):** Settings → **Tax**. The checkout sets
   `automatic_tax: { enabled: true }`; it only takes effect once you've set a tax
   origin/registrations. Safe to leave for later — it no-ops until configured.
4. **Add the live webhook endpoint:** Developers → Webhooks → **Add endpoint**
   → URL `https://www.ailiur.com/api/stripe/webhook`. Copy its **signing secret**
   (`whsec_…`) into `STRIPE_WEBHOOK_SECRET` (production env).
5. **Select webhook events** (exactly these five):
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 6. Test checklist

- [ ] Successful **Starter** checkout completes and redirects to the success page
- [ ] Successful **Pro** checkout completes
- [ ] Successful **Max** checkout completes
- [ ] **Canceled** checkout returns to `/checkout/cancel`
- [ ] **Invalid tier** request (`POST /api/create-checkout-session` with a bad
      tier) returns `400`
- [ ] Webhook receives **`checkout.session.completed`** → `preorders` /
      `subscriptions` / `billing_customers` rows are written
- [ ] Webhook receives **`invoice.paid`** → subscription marked `active`
- [ ] **Payment failure** path (`invoice.payment_failed`) → subscription marked
      `past_due`, record not deleted
- [ ] **Customer Portal** opens from the success page and `/account`
- [ ] User can **cancel** the subscription in the portal →
      `customer.subscription.deleted` → status `canceled`
- [ ] **Mobile** checkout layout works (pricing cards + Stripe page)
- [ ] **Tax** calculation appears at checkout if Stripe Tax is enabled
- [ ] **Success page** shows confirmed plan once the webhook lands (and a
      "confirming" state before it does)
- [ ] **Onboarding form** (`/founder-onboarding`) submits and shows the
      thank-you state

## 7. Production checklist

- [ ] Replace **test keys** with **live keys** (`sk_live_…`, live `whsec_…`)
- [ ] Use **live Price IDs** for Starter/Pro/Max
- [ ] Add the **production webhook endpoint** + its live signing secret
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` = `https://www.ailiur.com`
- [ ] Confirm the **support email** (`NEXT_PUBLIC_SUPPORT_EMAIL`) is monitored
- [ ] Confirm **Terms / Privacy / Refund / Contact** links resolve
- [ ] Confirm **no secret keys** are in the client bundle (see §QA below)
- [ ] Confirm **webhook signature verification** works against the live endpoint
- [ ] Confirm **database records** are created correctly on a live test purchase
- [ ] Apply Supabase migrations `0005` + `0006` to the production database

### Verifying no secret keys ship to the browser

```bash
npm run build
# Secret env names must NOT appear in client chunks:
grep -r "STRIPE_SECRET_KEY\|SUPABASE_SERVICE_ROLE_KEY\|STRIPE_WEBHOOK_SECRET" .next/static && \
  echo "LEAK!" || echo "OK — no secrets in client bundle"
```

Only `NEXT_PUBLIC_*` variables are allowed in client code; everything else is
read in route handlers / server components only.
