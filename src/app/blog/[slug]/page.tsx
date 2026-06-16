import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { getAllPosts, getPost, formatDate, type Block } from '@/lib/blog';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post not found — Ailiur' };
  return {
    title: post.seo.title,
    description: post.seo.description,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

function BlockView({ block }: { block: Block }) {
  if (block.type === 'h2') {
    return (
      <h2 className="mt-14 font-display text-[clamp(1.6rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-foreground">
        {block.text}
      </h2>
    );
  }
  if (block.type === 'callout') {
    return (
      <aside className="glass-strong my-10 rounded-[var(--radius-card)] border-l-4 border-accent-green px-7 py-6">
        <p className="font-display text-xl font-extrabold leading-snug tracking-tight text-foreground sm:text-2xl">
          {block.text}
        </p>
      </aside>
    );
  }
  return <p className="mt-5 text-[17px] leading-[1.75] text-foreground/80">{block.text}</p>;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative mx-auto w-full max-w-3xl px-4 pb-24 pt-36 sm:pt-44">
      <SmartLink
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/60 transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All posts
      </SmartLink>

      <article className="mt-8">
        <header>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-foreground/50">
            <span className="rounded-full bg-accent-green/15 px-2.5 py-1 text-accent-green">
              {post.category}
            </span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground/70">{post.excerpt}</p>
          <p className="mt-6 text-sm text-foreground/55">
            By {post.author} · {formatDate(post.date)}
          </p>
        </header>

        <div className="mt-10 border-t border-white/40 pt-2">
          {post.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </article>

      <div className="glass-strong mt-16 flex flex-col items-center gap-4 rounded-[var(--radius-panel)] px-8 py-10 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
          Explore the Ailiur ecosystem
        </h2>
        <p className="max-w-md text-[15px] leading-relaxed text-foreground/70">
          One connected system for learning, health, wealth, media, and creativity — powered by the
          Unified Context Mesh.
        </p>
        <SmartLink
          href="/pricing"
          className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
        >
          See pricing
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </SmartLink>
      </div>
    </main>
  );
}
