import type { MetadataRoute } from 'next';

/**
 * Robots policy for the parent site. Allows traditional crawlers and the major
 * AI crawlers explicitly (GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot,
 * Google-Extended) so Ailiur is discoverable in AI answers, not just search.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = { allow: '/', disallow: ['/account', '/dashboard', '/api/'] };
  return {
    rules: [
      { userAgent: '*', ...allowAll },
      { userAgent: 'GPTBot', ...allowAll },
      { userAgent: 'OAI-SearchBot', ...allowAll },
      { userAgent: 'ChatGPT-User', ...allowAll },
      { userAgent: 'ClaudeBot', ...allowAll },
      { userAgent: 'Claude-Web', ...allowAll },
      { userAgent: 'PerplexityBot', ...allowAll },
      { userAgent: 'Google-Extended', ...allowAll },
    ],
    sitemap: 'https://www.ailiur.com/sitemap.xml',
    host: 'https://www.ailiur.com',
  };
}
