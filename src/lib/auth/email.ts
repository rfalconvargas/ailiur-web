import type { EmailProviderSendVerificationRequestParams } from '@auth/core/providers/email';

/**
 * Sends the "Sign in with Ailiur" magic link.
 *
 * Two modes, chosen at runtime:
 *  • Production: if AUTH_RESEND_KEY is set, send a branded email via the Resend
 *    HTTP API (no SDK dependency — just fetch).
 *  • Local dev / no key: log the magic link to the SERVER console so the flow
 *    is fully testable without any email infrastructure.
 *
 * This module deliberately does NOT import '@/auth' so it can be referenced
 * from the Auth.js config without an import cycle.
 */

const BRAND = {
  yellow: '#ffd60a',
  green: '#1fa85c',
  ink: '#1c1606',
  ivory: '#fffdf5',
};

function buildHtml(url: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;background:${BRAND.yellow};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:${BRAND.ink};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" style="max-width:440px;background:${BRAND.ivory};border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(80,60,0,0.16);">
          <tr><td style="padding:36px 36px 8px;">
            <p style="margin:0 0 4px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#6b5a16;font-weight:700;">Ailiur Account</p>
            <h1 style="margin:0 0 12px;font-size:26px;line-height:1.15;font-weight:800;">Sign in to Ailiur</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3a3320;">
              Click the button below to sign in to your Ailiur Account — one identity across every Ailiur app. This link expires shortly and can only be used once.
            </p>
            <a href="${url}" style="display:inline-block;background:${BRAND.green};color:${BRAND.ivory};text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">
              Sign in with Ailiur
            </a>
            <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8a7a3a;">
              If you didn't request this, you can safely ignore this email — no account changes were made.
            </p>
          </td></tr>
          <tr><td style="padding:20px 36px 32px;">
            <p style="margin:0;font-size:12px;color:#a89757;word-break:break-all;">
              Or paste this link into your browser:<br/>${url}
            </p>
          </td></tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#6b5a16;">Ailiur — one account for every Ailiur app.</p>
      </td></tr>
    </table>
  </body>
</html>`;
}

function buildText(url: string): string {
  return `Sign in to your Ailiur Account.\n\nOne identity across every Ailiur app. Open this link to sign in (expires shortly, single use):\n\n${url}\n\nIf you didn't request this, ignore this email.`;
}

export async function sendAiliurMagicLink({
  identifier,
  url,
  provider,
}: EmailProviderSendVerificationRequestParams): Promise<void> {
  const apiKey = provider.apiKey || process.env.AUTH_RESEND_KEY;
  const from = provider.from || process.env.AUTH_EMAIL_FROM || 'Ailiur <onboarding@resend.dev>';

  // Dev fallback: no email service configured. Log the link so it's testable.
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.log(
      `\n========================================\n` +
        `🔗  Ailiur magic link (no AUTH_RESEND_KEY set — dev mode)\n` +
        `    to:   ${identifier}\n` +
        `    link: ${url}\n` +
        `========================================\n`
    );
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: identifier,
      subject: 'Sign in to your Ailiur Account',
      html: buildHtml(url),
      text: buildText(url),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend error sending Ailiur magic link: ${res.status} ${detail}`);
  }
}
