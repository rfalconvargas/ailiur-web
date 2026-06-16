import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { getAllPosts, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Ailiur',
  description:
    'Field notes on human optimization, local-first AI, metabolic health, and building the Ailiur ecosystem.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative mx-auto w-full max-w-5xl px-4 pb-24 pt-36 sm:pt-44">
      <header className="mx-auto max-w-2xl text-center">
        <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          Blog
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
          Field notes from the ecosystem.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground/70">
          Ideas on local-first AI, human optimization, and building Ailiur — the operating system
          for human flourishing.
        </p>
      </header>

      <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post, i) => (
          <SmartLink
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group glass flex flex-col rounded-[var(--radius-card)] p-8 transition-transform hover:-translate-y-1 ${
              i === 0 ? 'sm:col-span-2' : ''
            }`}
          >
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-foreground/50">
              <span className="rounded-full bg-accent-green/15 px-2.5 py-1 text-accent-green">
                {post.category}
              </span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
              {post.title}
            </h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/70">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-foreground/55">
                {post.author} · {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                Read
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </SmartLink>
        ))}
      </section>
    </main>
  );
}
