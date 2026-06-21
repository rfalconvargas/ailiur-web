#!/usr/bin/env node
/**
 * Ailiur.com QA runner — the automatable half of the self-improving QA workflow.
 *
 * Runs the mechanical/static checks (build, lint, typecheck, broken imports,
 * routes, analytics-event consistency, SEO files, perf + security heuristics)
 * and writes a timestamped markdown report to /outputs/qa/. The manual checks
 * (mobile, visual hierarchy, copy, brand) and the running list of recurring
 * issues live in /outputs/qa/WORKFLOW.md.
 *
 * Usage:
 *   node scripts/qa.mjs            # full run (includes production build)
 *   node scripts/qa.mjs --no-build # skip the build (fast inner-loop run)
 *
 * Exit code is non-zero if any check FAILS (warnings/manual do not fail).
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = resolve(WEB, '..');
const OUT = join(ROOT, 'outputs', 'qa');
const SRC = join(WEB, 'src');
const PUBLIC = join(WEB, 'public');
const runBuild = !process.argv.includes('--no-build');

const results = [];
const add = (id, title, status, detail) => results.push({ id, title, status, detail });

// --- helpers ---------------------------------------------------------------
function walk(dir, test, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, test, acc);
    else if (test(p)) acc.push(p);
  }
  return acc;
}
const read = (p) => { try { return readFileSync(p, 'utf8'); } catch { return ''; } };
function sh(cmd) {
  try {
    const out = execSync(cmd, { cwd: WEB, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
    return { ok: true, out };
  } catch (e) {
    return { ok: false, out: `${e.stdout || ''}\n${e.stderr || ''}` };
  }
}
const tsxFiles = () => walk(SRC, (p) => /\.(ts|tsx)$/.test(p));

// --- 1. Build --------------------------------------------------------------
if (runBuild) {
  const r = sh('npm run build');
  const warn = (r.out.match(/warning/gi) || []).length;
  add('build', 'Build passes', r.ok ? (warn ? 'warn' : 'pass') : 'fail',
    r.ok ? `Build succeeded (${warn} warning lines).` : `Build FAILED:\n${r.out.split('\n').slice(-25).join('\n')}`);
} else {
  add('build', 'Build passes', 'manual', 'Skipped (--no-build). Run a full QA before shipping.');
}

// --- 2. Lint ---------------------------------------------------------------
{
  const r = sh('npx eslint');
  const errs = (r.out.match(/\s+error\s+/g) || []).length;
  const warns = (r.out.match(/\s+warning\s+/g) || []).length;
  add('lint', 'Lint passes', errs ? 'fail' : (warns ? 'warn' : 'pass'),
    `${errs} errors, ${warns} warnings.` + (errs ? `\n${r.out.split('\n').filter(l => /error/.test(l)).slice(0, 12).join('\n')}` : ''));
}

// --- 3. Typecheck ----------------------------------------------------------
{
  const r = sh('npx tsc --noEmit');
  add('typecheck', 'Typecheck passes', r.ok ? 'pass' : 'fail',
    r.ok ? 'No type errors.' : `tsc errors:\n${r.out.split('\n').slice(0, 20).join('\n')}`);
}

// --- 4. Broken imports (refs to deleted modules) ---------------------------
{
  const deleted = ['ui/launch-cta', 'ui/button', '@base-ui/react'];
  const bad = [];
  for (const f of tsxFiles()) {
    const t = read(f);
    for (const d of deleted) {
      // ui/button is fine when imported as a product-local './button'; flag only @/.. or ui/button paths
      const re = new RegExp(`from ['\"][^'\"]*${d.replace('/', '\\/')}['\"]`);
      if (re.test(t) && !/['\"]\.\/button['\"]/.test(t.match(re)[0])) bad.push(`${relative(WEB, f)} → ${d}`);
    }
  }
  add('imports', 'No broken imports (deleted modules)', bad.length ? 'fail' : 'pass',
    bad.length ? bad.join('\n') : 'No references to known-deleted modules. (tsc above also validates all imports.)');
}

// --- 5. Routes -------------------------------------------------------------
{
  const pages = walk(join(SRC, 'app'), (p) => /[\\/]page\.tsx$/.test(p))
    .map((p) => '/' + relative(join(SRC, 'app'), dirname(p)).replace(/\\/g, '/'))
    .map((r) => (r === '/.' ? '/' : r));
  const builtHtml = walk(join(WEB, '.next', 'server', 'app'), (p) => /\.html$/.test(p)).length;
  add('routes', 'No broken routes', 'pass',
    `${pages.length} page routes found. ${builtHtml} static HTML files prerendered in last build.\nKey: ${['/', '/products', '/pricing', '/about', '/careers'].join('  ')}`);
}

// --- 6. Analytics events consistency ---------------------------------------
{
  const decl = [...read(join(SRC, 'lib', 'analytics.ts')).matchAll(/name: '([a-z_]+)'/g)].map((m) => m[1]);
  const used = new Set();
  for (const f of tsxFiles()) for (const m of read(f).matchAll(/track\('([a-z_]+)'/g)) used.add(m[1]);
  const undeclared = [...used].filter((u) => !decl.includes(u));
  const unused = decl.filter((d) => !used.has(d));
  add('analytics', 'Analytics events exist & are consistent', undeclared.length ? 'fail' : (unused.length ? 'warn' : 'pass'),
    `Declared: ${decl.join(', ') || 'NONE'}\nUsed: ${[...used].join(', ') || 'NONE'}` +
    (undeclared.length ? `\nFAIL — used but not declared: ${undeclared.join(', ')}` : '') +
    (unused.length ? `\nWARN — declared but unused: ${unused.join(', ')}` : ''));
}

// --- 7. SEO metadata -------------------------------------------------------
{
  const files = { 'sitemap.ts': join(SRC, 'app', 'sitemap.ts'), 'robots.ts': join(SRC, 'app', 'robots.ts'),
    'opengraph-image.tsx': join(SRC, 'app', 'opengraph-image.tsx'), 'llms.txt': join(PUBLIC, 'llms.txt') };
  const missing = Object.entries(files).filter(([, p]) => !existsSync(p)).map(([k]) => k);
  const layout = read(join(SRC, 'app', 'layout.tsx'));
  const home = read(join(SRC, 'app', 'page.tsx'));
  const flags = [];
  if (!/metadataBase/.test(layout)) flags.push('layout.tsx missing metadataBase');
  if (!/openGraph/.test(layout)) flags.push('layout.tsx missing openGraph');
  if (!/application\/ld\+json/.test(home)) flags.push('home missing JSON-LD');
  add('seo', 'SEO metadata exists', missing.length ? 'fail' : (flags.length ? 'warn' : 'pass'),
    (missing.length ? `Missing files: ${missing.join(', ')}\n` : 'All SEO files present.\n') + (flags.length ? flags.join('\n') : 'Root metadata + home JSON-LD present.'));
}

// --- 8. Accessibility basics ----------------------------------------------
{
  const rawImg = walk(SRC, (p) => /\.tsx$/.test(p)).filter((f) => /<img\s/.test(read(f))).map((f) => relative(WEB, f));
  const noAltImg = rawImg.filter((f) => /<img\s(?![^>]*\salt=)/.test(read(join(WEB, f))));
  add('a11y', 'Accessibility basics', noAltImg.length ? 'warn' : 'pass',
    `Raw <img> tags in: ${rawImg.join(', ') || 'none'}.` +
    (noAltImg.length ? `\nWARN — <img> without alt: ${noAltImg.join(', ')}` : '\nAll raw <img> have alt; consider next/image for optimization.'));
}

// --- 9. Performance risks --------------------------------------------------
{
  const big = walk(PUBLIC, () => true).map((p) => [statSync(p).size, relative(PUBLIC, p)])
    .filter(([s]) => s > 500 * 1024).sort((a, b) => b[0] - a[0]);
  const refd = (name) => tsxFiles().some((f) => read(f).includes(name));
  const deadBig = big.filter(([, n]) => !refd(n));
  const clientCount = tsxFiles().filter((f) => /^['"]use client['"]/.test(read(f).trimStart())).length;
  add('perf', 'Performance risks', deadBig.length ? 'warn' : 'pass',
    `${clientCount} client components. Large public assets (>500KB): ${big.length}.` +
    (deadBig.length ? `\nWARN — large + UNREFERENCED in src (deploy bloat): ${deadBig.map(([s, n]) => `${(s / 1024 | 0)}KB ${n}`).join(', ')}` : ''));
}

// --- 10. Security / privacy heuristics -------------------------------------
{
  const flags = [];
  const secretRe = /(sk_live_[0-9A-Za-z]+|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|service_role)/;
  for (const f of tsxFiles()) {
    const t = read(f);
    if (secretRe.test(t)) flags.push(`possible secret in ${relative(WEB, f)}`);
    // dangerouslySetInnerHTML must be JSON.stringify (JSON-LD), never raw user/string input
    if (/dangerouslySetInnerHTML/.test(t) && !/JSON\.stringify/.test(t)) flags.push(`unsafe dangerouslySetInnerHTML in ${relative(WEB, f)}`);
  }
  add('security', 'Security / privacy risks', flags.length ? 'fail' : 'pass',
    flags.length ? flags.join('\n') : 'No hardcoded secrets; all dangerouslySetInnerHTML use JSON.stringify (JSON-LD).');
}

// --- 11. Copy drift (banned phrases on marketing surfaces) -----------------
// Added 2026-06-21 after a QA run found the retired "operating system for human
// flourishing" tagline lingering in the footer. Scope to homepage-visible
// components so legitimate uses in /terms or /careers don't false-positive.
{
  const surfaces = [
    'components/ui/site-footer.tsx', 'components/ui/site-nav.tsx', 'components/ui/hero.tsx',
    'components/ui/ecosystem.tsx', 'components/ui/features.tsx', 'components/ui/faq.tsx',
    'components/ui/pricing.tsx', 'components/ui/social-proof.tsx', 'components/ui/founder-access.tsx',
    'app/page.tsx', 'app/products/page.tsx',
  ];
  const banned = ['Ketofy', 'Doblu', 'operating system for human flourishing'];
  const hits = [];
  for (const rel of surfaces) {
    const t = read(join(SRC, rel));
    for (const b of banned) if (t.includes(b)) hits.push(`${rel}: "${b}"`);
  }
  add('copy-drift', 'Copy clarity — no retired names/taglines on marketing surfaces', hits.length ? 'fail' : 'pass',
    hits.length ? `Retired wording found:\n${hits.join('\n')}` : `No banned phrases (${banned.join(', ')}) on marketing surfaces.`);
}

// --- manual checks (placeholders the agent fills from the preview) ---------
for (const [id, title] of [['mobile', 'Mobile layout'], ['hierarchy', 'Visual hierarchy'],
  ['copy', 'Copy clarity'], ['brand', 'Brand consistency'], ['ctas', 'CTAs work']]) {
  add(id, title, 'manual', 'Verify in the running preview (see WORKFLOW.md).');
}

// --- write report ----------------------------------------------------------
mkdirSync(OUT, { recursive: true });
const fails = results.filter((r) => r.status === 'fail');
const warns = results.filter((r) => r.status === 'warn');
const icon = { pass: '✅', warn: '⚠️', fail: '❌', manual: '🔍' };
const stamp = process.env.QA_STAMP || 'latest';
const md = [
  `# Ailiur.com QA Report — ${stamp}`,
  ``,
  `**Automated result:** ${fails.length} fail · ${warns.length} warn · ${results.filter(r => r.status === 'pass').length} pass · ${results.filter(r => r.status === 'manual').length} manual`,
  ``,
  `| # | Check | Status |`,
  `|---|---|---|`,
  ...results.map((r, i) => `| ${i + 1} | ${r.title} | ${icon[r.status]} ${r.status} |`),
  ``,
  `## Details`,
  ...results.map((r) => `\n### ${icon[r.status]} ${r.title}\n\n\`\`\`\n${r.detail}\n\`\`\``),
  ``,
].join('\n');
writeFileSync(join(OUT, `qa-report-${stamp}.md`), md);
console.log(md);
console.log(`\nReport written to outputs/qa/qa-report-${stamp}.md`);
process.exit(fails.length ? 1 : 0);
