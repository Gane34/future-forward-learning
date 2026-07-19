import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import { getPublishedBlogPosts, type BlogPost } from '@/lib/blogStorage';
import { CalendarDays, Clock3, Tag, UserRound, Sparkles } from 'lucide-react';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const getReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 180))} min read`;
};

const InsightsPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(getPublishedBlogPosts());
  }, []);

  const featured = useMemo(() => posts.find((post) => post.featured) || posts[0], [posts]);
  const selectedPost = useMemo(() => posts.find((post) => post.slug === slug) || null, [posts, slug]);

  if (slug) {
    if (!selectedPost) {
      return (
        <div className="min-h-screen bg-background px-6 py-24 text-white">
          <SEO title="Blog not found" description="The requested insight could not be found." noIndex />
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h1 className="text-3xl font-semibold">Insight not found</h1>
            <p className="mt-3 text-white/70">The article you are looking for is unavailable or has been removed.</p>
            <Link to="/insights" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 font-medium text-white">
              Back to insights
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background px-6 py-24 text-white">
        <SEO
          title={selectedPost.seoTitle || selectedPost.title}
          description={selectedPost.seoDescription || selectedPost.excerpt}
          ogType="article"
          ogUrl={`https://mmkaisolutions.com/insights/${selectedPost.slug}`}
          canonicalUrl={`https://mmkaisolutions.com/insights/${selectedPost.slug}`}
          structuredData={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: selectedPost.title,
            description: selectedPost.seoDescription || selectedPost.excerpt,
            author: { '@type': 'Person', name: selectedPost.author },
            datePublished: selectedPost.createdAt,
            dateModified: selectedPost.updatedAt,
          }}
        />
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          {selectedPost.coverImage ? (
            <img src={selectedPost.coverImage} alt={selectedPost.title} className="h-[320px] w-full rounded-3xl object-cover" />
          ) : null}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{selectedPost.category}</span>
              <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> {formatDate(selectedPost.createdAt)}</span>
              <span className="inline-flex items-center gap-2"><Clock3 size={16} /> {getReadingTime(selectedPost.content)}</span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight">{selectedPost.title}</h1>
            <p className="mt-4 text-lg text-white/70">{selectedPost.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="inline-flex items-center gap-2"><UserRound size={16} /> {selectedPost.author}</span>
              {selectedPost.tags.length > 0 ? (
                <span className="inline-flex items-center gap-2"><Tag size={16} /> {selectedPost.tags.join(', ')}</span>
              ) : null}
            </div>
            <div className="prose prose-invert mt-10 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n/g, '<br />') }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-24 text-white">
      <SEO title="Insights" description="Insights and stories from the MVR AI & Robotics Academy team." ogUrl="https://mmkaisolutions.com/insights" canonicalUrl="https://mmkaisolutions.com/insights" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
              <Sparkles size={16} /> Insights & updates
            </div>
            <h1 className="text-4xl font-semibold">Latest articles</h1>
            <p className="mt-3 max-w-2xl text-white/70">Read the latest published insights from our team.</p>
          </div>
        </div>

        {featured ? (
          <div className="mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              {featured.coverImage ? <img src={featured.coverImage} alt={featured.title} className="h-full min-h-[280px] w-full object-cover" /> : null}
              <div className="flex flex-col justify-center p-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/70">
                  <Sparkles size={16} /> Featured article
                </div>
                <h2 className="mt-4 text-3xl font-semibold">{featured.title}</h2>
                <p className="mt-4 text-white/70">{featured.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
                  <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> {formatDate(featured.createdAt)}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 size={16} /> {getReadingTime(featured.content)}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/insights/${featured.slug}`} className="rounded-full bg-primary px-5 py-3 font-medium text-white">
                    Read article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} to={`/insights/${post.slug}`} className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10">
              {post.coverImage ? <img src={post.coverImage} alt={post.title} className="mb-5 h-44 w-full rounded-2xl object-cover" /> : null}
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{post.category}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> {formatDate(post.createdAt)}</span>
              </div>
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p className="mt-3 text-white/70">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-white/60">
                <span>{post.author}</span>
                <span>{getReadingTime(post.content)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
