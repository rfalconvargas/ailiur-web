/**
 * Small site-wide constants. Safe for both server and client components.
 */

// Support contact. Configurable via NEXT_PUBLIC_SUPPORT_EMAIL; defaults to the
// brand support inbox. Used across the checkout/billing/onboarding flows so
// there's a single source of truth.
export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@ailiur.com';

// Ailiur Product Feedback — shared Google Form linked from every product's
// waitlist section so early visitors have one place to send feedback.
// Single source of truth: update here to change it everywhere.
export const PRODUCT_FEEDBACK_URL = 'https://forms.gle/QWTdQWtVSbVVgY4U6';
