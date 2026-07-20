import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { getAllBlogPosts, getBlogPostBySlug, type BlogPostRecord } from '@/lib/blogService';
import { CalendarDays, Clock3, Eye, Search, Sparkles, Tag as TagIcon, UserRound, ArrowLeft, ExternalLink, FileText, Mail, Newspaper, ChevronRight } from 'lucide-react';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const getReadingTime = (minutes: number) => `${minutes} min read`;

const createTableOfContents = (content: string) => {
  const headings = Array.from(content.matchAll(/<h([2-3])[^>]*>(.*?)<\/h\1>/gi));
  return headings
    .map((match) => ({ level: Number(match[1]), text: match[2].replace(/<[^>]+>/g, '').trim() }))
    .filter((heading) => heading.text);
};

const InsightsPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPostRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const allPosts = await getAllBlogPosts();
      const publishedPosts = allPosts.filter((post) => post.published).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      setPosts(publishedPosts);
      if (slug) {
        const post = publishedPosts.find((entry) => entry.slug === slug) || null;
        setSelectedPost(post);
      } else {
        setSelectedPost(null);
      }
      setLoading(false);
    };

    void loadPosts();
  }, [slug]);

  const featured = useMemo(() => posts.find((post) => post.featured) || posts[0], [posts]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))], [posts]);
  const tags = useMemo(() => ['All', ...Array.from(new Set(posts.flatMap((post) => post.tags)))], [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesTag = activeTag === 'All' || post.tags.includes(activeTag);
      const matchesSearch = !normalizedSearch || [post.title, post.excerpt, post.content, post.author, post.category, ...post.tags].join(' ').toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeTag, posts, search]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const recentPosts = posts.slice(0, 4);
  const popularPosts = [...posts].sort((a, b) => b.viewCount - a.viewCount).slice(0, 4);
  const pdfResources = posts.flatMap((post) => (post.attachments || []).filter((attachment) => attachment.toLowerCase().includes('.pdf')).map((attachment) => ({ ...post, attachment })));
  const toc = selectedPost ? createTableOfContents(selectedPost.content) : [];

  const shareArticle = (post: BlogPostRecord) => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/insights/${post.slug}`;
    if (navigator.share) {
      void navigator.share({ title: post.title, text: post.excerpt, url: shareUrl });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
    }
  };

  if (slug) {
    if (!selectedPost && !loading) {
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

    if (!selectedPost) {
      return <div className="min-h-screen bg-background px-6 py-24 text-white" />;
    }

    const previousPost = posts.find((post, index) => posts[index + 1]?.slug === selectedPost.slug);
    const nextPost = posts.find((post, index) => posts[index - 1]?.slug === selectedPost.slug);

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
            datePublished: selectedPost.publishDate,
            dateModified: selectedPost.updatedAt,
          }}
        />
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Link to="/insights" className="inline-flex w-fit items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to Insights
          </Link>
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl">
            {selectedPost.coverImage ? <img src={selectedPost.coverImage} alt={selectedPost.title} className="h-[320px] w-full object-cover" /> : null}
            <div className="p-8 lg:p-10">
              <div className="flex flex-wrap gap-3 text-sm text-white/70">
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{selectedPost.category}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> {formatDate(selectedPost.publishDate)}</span>
                <span className="inline-flex items-center gap-2"><Clock3 size={16} /> {getReadingTime(selectedPost.readingTime)}</span>
                <span className="inline-flex items-center gap-2"><Eye size={16} /> {selectedPost.viewCount} views</span>
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight">{selectedPost.title}</h1>
              {selectedPost.subtitle ? <p className="mt-3 text-lg text-white/70">{selectedPost.subtitle}</p> : null}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="inline-flex items-center gap-2"><UserRound size={16} /> {selectedPost.author}</span>
                {selectedPost.authorDesignation ? <span>{selectedPost.authorDesignation}</span> : null}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {selectedPost.tags.map((tag) => (<span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm">#{tag}</span>))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => shareArticle(selectedPost)} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm">Share</button>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="space-y-8">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              </div>

              {selectedPost.galleryImages.length > 0 ? (
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
                  <h2 className="text-2xl font-semibold">Image gallery</h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {selectedPost.galleryImages.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${selectedPost.title} gallery ${index + 1}`} className="h-56 w-full rounded-2xl object-cover" />)}
                  </div>
                </div>
              ) : null}

              {selectedPost.attachments.length > 0 ? (
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
                  <h2 className="text-2xl font-semibold">Downloads & resources</h2>
                  <div className="mt-6 space-y-3">
                    {selectedPost.attachments.map((attachment) => (
                      <a key={attachment} href={attachment} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-white/80">
                        <span>{attachment.split('/').pop()}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>

            <aside className="space-y-6">
              {toc.length > 0 ? (
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold">Contents</h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {toc.map((item) => (<li key={item.text} className="pl-2">• {item.text}</li>))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">Related posts</h3>
                <div className="mt-4 space-y-3">
                  {posts.filter((post) => post.id !== selectedPost.id && (post.category === selectedPost.category || post.tags.some((tag) => selectedPost.tags.includes(tag)))).slice(0, 4).map((post) => (
                    <Link key={post.id} to={`/insights/${post.slug}`} className="block rounded-2xl border border-white/10 bg-background/50 p-3 text-sm text-white/80">
                      <div className="font-medium">{post.title}</div>
                      <div className="mt-1 text-white/60">{post.category}</div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-primary/20 to-secondary/10 p-6">
                <h3 className="text-lg font-semibold">Join the newsletter</h3>
                <p className="mt-2 text-sm text-white/70">Receive research updates and new insights directly in your inbox.</p>
                <a href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium">Get updates <ChevronRight className="h-4 w-4" /></a>
              </div>
            </aside>
          </div>

          <div className="flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70">
            {previousPost ? <Link to={`/insights/${previousPost.slug}`} className="inline-flex items-center gap-2">← {previousPost.title}</Link> : <span />}
            {nextPost ? <Link to={`/insights/${nextPost.slug}`} className="inline-flex items-center gap-2">{nextPost.title} →</Link> : <span />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-24 text-white">
      <SEO title="Insights" description="Research-driven insights and stories from the MVR AI & Robotics Academy team." ogUrl="https://mmkaisolutions.com/insights" canonicalUrl="https://mmkaisolutions.com/insights" />
      <div className="mx-auto max-w-7xl space-y-8">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/70">
                <Sparkles size={16} /> Dr. Murali Insights
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight lg:text-5xl">Research, stories, and future-ready thinking from the MMK AI Solutions team.</h1>
              <p className="mt-4 max-w-2xl text-lg text-white/70">Browse the latest articles, discover practical ideas, and explore the research behind the work we are building for children and communities.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70">{posts.length} published stories</div>
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70">{categories.length - 1} categories</div>
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70">{tags.length - 1} tags</div>
              </div>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-background/50 p-6">
              <div className="flex items-center gap-3 text-sm text-white/70"><Search className="h-4 w-4" /> Search across titles, authors, categories, and tags.</div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Search className="h-4 w-4 text-white/60" />
                <input value={search} onChange={(event) => { setSearch(event.target.value); setVisibleCount(6); }} placeholder="Search insights" className="w-full border-0 bg-transparent text-sm outline-none" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => <button key={category} onClick={() => { setActiveCategory(category); setVisibleCount(6); }} className={`rounded-full px-3 py-1.5 text-sm ${activeCategory === category ? 'bg-primary text-white' : 'border border-white/10 bg-white/5 text-white/70'}`}>{category}</button>)}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => <button key={tag} onClick={() => { setActiveTag(tag); setVisibleCount(6); }} className={`rounded-full px-3 py-1.5 text-sm ${activeTag === tag ? 'bg-secondary text-white' : 'border border-white/10 bg-white/5 text-white/70'}`}>#{tag}</button>)}
              </div>
            </div>
          </div>
        </motion.section>

        {featured ? (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
              {featured.coverImage ? <img src={featured.coverImage} alt={featured.title} className="h-64 w-full object-cover" /> : null}
              <div className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white/70"><Sparkles size={16} /> Featured story</div>
                <h2 className="mt-4 text-3xl font-semibold">{featured.title}</h2>
                <p className="mt-3 text-white/70">{featured.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-sm text-white/60">
                  <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> {formatDate(featured.publishDate)}</span>
                  <span className="inline-flex items-center gap-2"><Clock3 size={16} /> {getReadingTime(featured.readingTime)}</span>
                  <span className="inline-flex items-center gap-2"><Eye size={16} /> {featured.viewCount} views</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/insights/${featured.slug}`} className="rounded-full bg-primary px-5 py-3 font-medium text-white">Read article</Link>
                </div>
              </div>
            </motion.article>
            <motion.aside initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-sm text-white/70"><Newspaper className="h-4 w-4" /> Recent posts</div>
              {recentPosts.map((post) => (
                <Link key={post.id} to={`/insights/${post.slug}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-background/50 p-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <div className="text-sm font-medium">{post.title}</div>
                    <div className="mt-1 text-xs text-white/60">{formatDate(post.publishDate)}</div>
                  </div>
                </Link>
              ))}
            </motion.aside>
          </section>
        ) : null}

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Latest articles</h2>
              <span className="text-sm text-white/60">Showing {visiblePosts.length} of {filteredPosts.length}</span>
            </div>
            {loading ? <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-white/70">Loading insights…</div> : null}
            {!loading && visiblePosts.length === 0 ? <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-white/70">No articles matched your filters.</div> : null}
            <div className="grid gap-6 md:grid-cols-2">
              {visiblePosts.map((post) => (
                <motion.article key={post.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                  {post.coverImage ? <img src={post.coverImage} alt={post.title} className="h-44 w-full object-cover" /> : null}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 text-xs text-white/60">
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{post.category}</span>
                      {post.tags.slice(0, 2).map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-background/30 px-3 py-1">#{tag}</span>)}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">{post.title}</h3>
                    <p className="mt-3 text-sm text-white/70">{post.excerpt}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/60">
                      <span className="inline-flex items-center gap-2"><UserRound size={14} /> {post.author}</span>
                      <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> {formatDate(post.publishDate)}</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-sm text-white/60">
                      <span className="inline-flex items-center gap-2"><Clock3 size={14} /> {getReadingTime(post.readingTime)}</span>
                      <span className="inline-flex items-center gap-2"><Eye size={14} /> {post.viewCount}</span>
                    </div>
                    <Link to={`/insights/${post.slug}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-medium text-white">Read more <ChevronRight className="h-4 w-4" /></Link>
                  </div>
                </motion.article>
              ))}
            </div>
            {visibleCount < filteredPosts.length ? <button onClick={() => setVisibleCount((value) => value + 4)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">Load more</button> : null}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">Popular posts</h3>
              <div className="mt-4 space-y-3">
                {popularPosts.map((post) => (
                  <Link key={post.id} to={`/insights/${post.slug}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-background/50 p-3">
                    <div className="rounded-full bg-primary/10 p-2 text-primary"><FileText className="h-4 w-4" /></div>
                    <div>
                      <div className="text-sm font-medium">{post.title}</div>
                      <div className="mt-1 text-xs text-white/60">{post.viewCount} views</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-primary/20 to-secondary/10 p-6">
              <div className="flex items-center gap-2 text-sm text-white/70"><Mail className="h-4 w-4" /> Newsletter</div>
              <h3 className="mt-3 text-xl font-semibold">Stay current with the latest research and stories.</h3>
              <p className="mt-2 text-sm text-white/70">Get updates when new articles, PDFs, and project notes are published.</p>
              <a href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium">Subscribe <ChevronRight className="h-4 w-4" /></a>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">PDF resources</h3>
              <div className="mt-4 space-y-3">
                {pdfResources.length === 0 ? <div className="text-sm text-white/60">No PDFs uploaded yet.</div> : pdfResources.slice(0, 4).map((resource) => (
                  <a key={`${resource.id}-${resource.attachment}`} href={resource.attachment} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/50 px-3 py-3 text-sm text-white/80">
                    <span>{resource.title}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default InsightsPage;
