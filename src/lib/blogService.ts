import { supabase } from '@/integrations/supabase/client';

const client = supabase;

export interface BlogPostRecord {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: string;
  coverImage: string;
  galleryImages: string[];
  category: string;
  tags: string[];
  author: string;
  authorPhoto: string;
  authorDesignation: string;
  featured: boolean;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  readingTime: number;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  attachments: string[];
}

export interface BlogCategoryRecord {
  id: string;
  name: string;
}

export interface BlogTagRecord {
  id: string;
  name: string;
}

export interface BlogFileUploadResult {
  path: string;
  publicUrl: string;
}

const BLOG_STORAGE_KEY = 'mmk_insights_posts_v2';
const CATEGORY_STORAGE_KEY = 'mmk_insights_categories_v2';
const TAG_STORAGE_KEY = 'mmk_insights_tags_v2';

const BLOG_IMAGE_BUCKET = 'blog-images';
const BLOG_PDF_BUCKET = 'blog-pdfs';
const BLOG_MEDIA_BUCKET = 'blog-media';
const AUTHOR_IMAGE_BUCKET = 'author-images';

export const BLOG_BUCKETS = {
  images: BLOG_IMAGE_BUCKET,
  pdfs: BLOG_PDF_BUCKET,
  media: BLOG_MEDIA_BUCKET,
  authorImages: AUTHOR_IMAGE_BUCKET,
};

const estimateReadingTime = (content: string) => Math.max(2, Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 180));

const createId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

export const getSeedBlogPosts = (): BlogPostRecord[] => {
  const now = '2026-07-23T00:00:00.000Z';

  return [normalizeBlogPost({
    id: 'seed-ai-education-paradigm-shift',
    title: 'The Impending Paradigm Shift: A Two-Year Outlook on Artificial Intelligence in Indian Education and the Mechanics of Autonomous AI Self-Evolution',
    slug: 'impending-paradigm-shift-ai-education-india',
    subtitle: 'How recursive AI systems and national policy are reshaping Indian schools, colleges, and clinical training between 2026 and 2028.',
    excerpt: 'The convergence of generative AI, machine learning, and India’s education policy is redefining how students learn, how institutions govern learning, and how AI systems improve themselves.',
    content: `<h2>Introduction</h2><p>The convergence of generative artificial intelligence, machine learning, and national educational policy in India is orchestrating a structural transformation across the academic landscape. In the two-year window from 2026 to 2028, traditional pedagogy is being displaced by AI-native systems that rewrite curriculum design, learning delivery, and professional training.</p><p>At the same time, the underlying models are evolving from static, human-curated systems toward recursively self-improving engines. This report outlines both tracks of that change: the technical mechanics of autonomous AI self-evolution and the campus-level consequences for Indian schools, colleges, and medical institutions.</p><h2>1. The new frontier of AI self-evolution</h2><p>Training AI has reached a bottleneck. The historical dependence on massive pretraining over public web text is now constrained by a shrinking supply of high-quality human-authored data. In response, research labs are turning toward recursive self-improvement, inference-time compute scaling, and verification-based loops.</p><p>The central challenge is the generation-verification gap. A model can only improve itself reliably when it can verify the correctness of its own outputs more cheaply and more accurately than it costs to generate them. If the model generates faster than it can verify, its feedback loop becomes unstable and it risks hallucination accumulation, catastrophic forgetting, or model decay.</p><p>That is why leading laboratories ground their systems in objective environments such as mathematical compilers, software execution sandboxes, or deterministic simulators. Without such grounding, autonomous systems can drift into generative entropy rather than genuine improvement.</p><h2>2. Why this matters for Indian schools</h2><p>In India, these technical shifts are meeting a policy moment. The National Education Policy 2020 and the National Curriculum Framework 2023 are already pushing schools toward AI literacy, computational thinking, multilingual digital learning, and competency-based pedagogy.</p><p>Starting in the 2026–2027 academic cycle, AI literacy and computational thinking are being treated as foundational skills rather than optional electives. CBSE and NCERT are expanding formal modules across school year groups, while national platforms such as DIKSHA are becoming more multilingual and adaptive. This enables teachers to reach students who have traditionally been underserved by English-only digital content.</p><p>At the same time, AI tools are being used to reduce teacher workload by automating lesson planning, attendance administration, and student welfare monitoring. In a system where teachers often carry heavy non-instructional responsibilities, this recovery of time can directly improve classroom quality.</p><h2>3. Higher education is being restructured by discipline</h2><p>Higher education is experiencing different pressures depending on the profession. In engineering, entry-level software roles are being compressed by automation as AI tools increasingly write boilerplate code, test software, and assist with integration work. That means the value of the degree is shifting from syntax literacy toward architecture, verification, context engineering, and human-AI collaboration.</p><p>Computer science curricula are changing accordingly. Universities are replacing rote coding instruction with prompt engineering, model interaction design, bias auditing, and ethical validation. Similar changes are unfolding in pharmacy and medicine. The Pharmacy Council of India has already begun redesigning pharmacy education around data science, machine learning, and AI-supported regulatory workflows. In medicine, competency-based education is being paired with digital logbooks, AI-driven clinical simulations, and research-methodology training.</p><h2>4. The Zoho and India-specific infrastructure shift</h2><p>Software platforms are also adapting to the new educational reality. Zoho Classes 2.0 illustrates a more localized model of digital learning for India. It provides a subject-restricted AI tutor, a 30-second course builder that maps content to accreditation outcomes, and low-code workflows for academic administration. Its value lies in its fit with Indian conditions: multilingual interfaces, lower-cost deployment, and compliance with the Digital Personal Data Protection Act.</p><p>This kind of platform matters because institutional adoption is not just about access to tools. It is about embedding technology into ordinary teaching, administration, and assessment workflows in ways that remain practical for schools and universities with limited staff and uneven digital maturity.</p><h2>5. What institutions must do now</h2><p>The next two years will reward institutions that treat AI as a core operating model rather than a peripheral add-on. Universities, schools, and professional colleges need modular curricula, smaller but more rigorous verification practices, and stronger frameworks for human oversight.</p><p>The competitive advantage will belong to institutions that teach students how to work with AI systems responsibly, verify outputs, and design workflows that combine human judgment with machine-scale analysis. In this environment, the real question is no longer whether AI will enter education. It is whether institutions will adapt quickly enough to use it well.</p><p>India’s education system is at a pivotal threshold. If it responds with policy clarity, teacher enablement, and thoughtful curriculum reform, AI can become a force for broader access and deeper learning. If it responds reactively, the result may be a widening gap between institutions that can adapt and those that remain trapped in legacy systems.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [],
    category: 'Research',
    tags: ['AI', 'Education', 'India', 'Future of Learning'],
    author: 'MMK AI Solutions Research Team',
    authorPhoto: '',
    authorDesignation: 'Research & Strategy',
    featured: true,
    published: true,
    seoTitle: 'The Impending Paradigm Shift in AI and Indian Education',
    seoDescription: 'A two-year outlook on AI self-evolution, policy shifts, and the transformation of Indian schools, higher education, and clinical training.',
    metaKeywords: 'AI education India, future of learning, autonomous AI, NEP 2020, higher education',
    canonicalUrl: '/insights/impending-paradigm-shift-ai-education-india',
    readingTime: 10,
    publishDate: now,
    createdAt: now,
    updatedAt: now,
    viewCount: 0,
    attachments: [],
  })];
};

export const normalizeAttachmentList = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value.map((entry) => entry.trim()).filter(Boolean);
  if (typeof value !== 'string') return [];
  return value.split(',').map((entry) => entry.trim()).filter(Boolean);
};

export const getSlugFromTitle = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const normalizeBlogPost = (post: Partial<BlogPostRecord>): BlogPostRecord => {
  const title = post.title?.trim() || 'Untitled article';
  const slug = (post.slug || getSlugFromTitle(title)).trim().toLowerCase();
  const content = post.content?.trim() || '';
  const now = new Date().toISOString();

  return {
    id: post.id || createId(),
    title,
    slug,
    subtitle: post.subtitle?.trim() || '',
    excerpt: post.excerpt?.trim() || content.slice(0, 160),
    content,
    coverImage: post.coverImage || '',
    galleryImages: post.galleryImages || [],
    category: post.category?.trim() || 'General',
    tags: (post.tags || []).map((tag) => tag.trim()).filter(Boolean),
    author: post.author?.trim() || 'Admin',
    authorPhoto: post.authorPhoto || '',
    authorDesignation: post.authorDesignation?.trim() || 'Research Lead',
    featured: post.featured ?? false,
    published: post.published ?? true,
    seoTitle: post.seoTitle?.trim() || title,
    seoDescription: post.seoDescription?.trim() || post.excerpt?.trim() || content.slice(0, 160),
    metaKeywords: post.metaKeywords?.trim() || '',
    canonicalUrl: post.canonicalUrl?.trim() || '',
    readingTime: post.readingTime || estimateReadingTime(content),
    publishDate: post.publishDate || now,
    createdAt: post.createdAt || now,
    updatedAt: post.updatedAt || now,
    viewCount: post.viewCount || 0,
    attachments: normalizeAttachmentList(post.attachments),
  };
};

export const normalizeSupabaseBlogRow = (row: Record<string, any>): BlogPostRecord => {
  return normalizeBlogPost({
    id: row.id,
    title: row.title,
    slug: row.slug,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image || row.coverImage || '',
    galleryImages: row.gallery_images || [],
    category: row.category,
    tags: row.tags || [],
    author: row.author,
    authorPhoto: row.author_photo || '',
    authorDesignation: row.author_designation,
    featured: row.featured,
    published: Boolean(row.published ?? (row.status === 'published')),
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    metaKeywords: row.meta_keywords,
    canonicalUrl: row.canonical_url,
    readingTime: row.reading_time,
    publishDate: row.publish_date || row.published_at || row.created_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    viewCount: row.view_count || 0,
    attachments: normalizeAttachmentList(row.attachments),
  });
};

const readLocalBlogPosts = (): BlogPostRecord[] => {
  if (typeof window === 'undefined') return getSeedBlogPosts();

  const stored = window.localStorage.getItem(BLOG_STORAGE_KEY);
  if (!stored) return getSeedBlogPosts();

  try {
    const parsed = JSON.parse(stored) as Partial<BlogPostRecord>[];
    const posts = parsed.map((post) => normalizeBlogPost(post));
    const seededPosts = getSeedBlogPosts();
    const hasSeededPost = posts.some((post) => post.slug === seededPosts[0].slug);

    return hasSeededPost ? posts : [...posts, ...seededPosts.filter((post) => !posts.some((existing) => existing.slug === post.slug))];
  } catch {
    return getSeedBlogPosts();
  }
};

const writeLocalBlogPosts = (posts: BlogPostRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
};

const readLocalCategories = (): BlogCategoryRecord[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(CATEGORY_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as BlogCategoryRecord[];
  } catch {
    return [];
  }
};

const writeLocalCategories = (categories: BlogCategoryRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
};

const readLocalTags = (): BlogTagRecord[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(TAG_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as BlogTagRecord[];
  } catch {
    return [];
  }
};

const writeLocalTags = (tags: BlogTagRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TAG_STORAGE_KEY, JSON.stringify(tags));
};

export const getAllBlogPosts = async (): Promise<BlogPostRecord[]> => {
  try {
    const { data, error } = await client
      .from('blogs')
      .select('id, title, slug, subtitle, excerpt, content, cover_image, gallery_images, category, tags, author, author_photo, author_designation, featured, published, seo_title, seo_description, meta_keywords, canonical_url, reading_time, publish_date, created_at, updated_at, view_count, attachments')
      .order('publish_date', { ascending: false });

    if (!error && data) {
      return (data as any[]).map((item) => normalizeSupabaseBlogRow(item));
    }
  } catch {
    // Fall back to local storage when Supabase is unavailable or the schema is not yet present.
  }

  return readLocalBlogPosts().sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

export const getPublicBlogPosts = async (): Promise<BlogPostRecord[]> => {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.published);
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostRecord | null> => {
  try {
    const { data, error } = await client
      .from('blogs')
      .select('id, title, slug, subtitle, excerpt, content, cover_image, gallery_images, category, tags, author, author_photo, author_designation, featured, published, seo_title, seo_description, meta_keywords, canonical_url, reading_time, publish_date, created_at, updated_at, view_count, attachments')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return normalizeSupabaseBlogRow(data);
    }
  } catch {
    // Fallback below.
  }

  return readLocalBlogPosts().find((post) => post.slug === slug) || null;
};

export const createBlogPost = async (input: Partial<BlogPostRecord> & { id?: string }): Promise<BlogPostRecord> => {
  const post = normalizeBlogPost(input);

  try {
    const payload = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      subtitle: post.subtitle,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.coverImage,
      gallery_images: post.galleryImages,
      category: post.category,
      tags: post.tags,
      author: post.author,
      author_photo: post.authorPhoto,
      author_designation: post.authorDesignation,
      featured: post.featured,
      published: post.published,
      status: (post.published ? 'published' : 'draft') as 'published' | 'draft',
      published_at: post.published ? post.publishDate : null,
      seo_title: post.seoTitle,
      seo_description: post.seoDescription,
      meta_keywords: post.metaKeywords,
      canonical_url: post.canonicalUrl,
      reading_time: post.readingTime,
      publish_date: post.publishDate,
      created_at: post.createdAt,
      updated_at: post.updatedAt,
      view_count: post.viewCount,
      attachments: post.attachments,
    };

    const { data, error } = await client.from('blogs').insert(payload).select().single();
    if (!error && data) {
      return normalizeBlogPost({
        ...post,
        coverImage: data.cover_image || post.coverImage,
        galleryImages: data.gallery_images || post.galleryImages,
      });
    }
  } catch {
    // Fallback below.
  }

  const nextPosts = [post, ...readLocalBlogPosts().filter((entry) => entry.id !== post.id)];
  writeLocalBlogPosts(nextPosts);
  return post;
};

export const updateBlogPost = async (id: string, input: Partial<BlogPostRecord>): Promise<BlogPostRecord> => {
  const localPosts = readLocalBlogPosts();
  const existing = localPosts.find((entry) => entry.id === id);
  const merged = normalizeBlogPost({ ...existing, ...input, id });

  try {
    const payload = {
      title: merged.title,
      slug: merged.slug,
      subtitle: merged.subtitle,
      excerpt: merged.excerpt,
      content: merged.content,
      cover_image: merged.coverImage,
      gallery_images: merged.galleryImages,
      category: merged.category,
      tags: merged.tags,
      author: merged.author,
      author_photo: merged.authorPhoto,
      author_designation: merged.authorDesignation,
      featured: merged.featured,
      published: merged.published,
      status: (merged.published ? 'published' : 'draft') as 'published' | 'draft',
      published_at: merged.published ? merged.publishDate : null,
      seo_title: merged.seoTitle,
      seo_description: merged.seoDescription,
      meta_keywords: merged.metaKeywords,
      canonical_url: merged.canonicalUrl,
      reading_time: merged.readingTime,
      publish_date: merged.publishDate,
      updated_at: merged.updatedAt,
      view_count: merged.viewCount,
      attachments: merged.attachments,
    };

    const { data, error } = await client.from('blogs').update(payload).eq('id', id).select().single();
    if (!error && data) {
      return normalizeBlogPost({
        ...merged,
        coverImage: data.cover_image || merged.coverImage,
        galleryImages: data.gallery_images || merged.galleryImages,
      });
    }
  } catch {
    // Fallback below.
  }

  const nextPosts = [...localPosts.filter((entry) => entry.id !== id), merged].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  writeLocalBlogPosts(nextPosts);
  return merged;
};

export const deleteBlogPost = async (id: string) => {
  try {
    await client.from('blogs').delete().eq('id', id);
  } catch {
    // Fallback below.
  }

  const nextPosts = readLocalBlogPosts().filter((entry) => entry.id !== id);
  writeLocalBlogPosts(nextPosts);
};

export const getCategories = async (): Promise<BlogCategoryRecord[]> => {
  try {
    const { data, error } = await client.from('categories').select('id, name, slug').order('name');
    if (!error && data) return (data as Array<{ id: string; name: string; slug?: string }>).map((item) => ({ id: item.id, name: item.name }));
  } catch {
    // Fallback below.
  }

  return readLocalCategories();
};

export const getTags = async (): Promise<BlogTagRecord[]> => {
  try {
    const { data, error } = await client.from('tags').select('id, name, slug').order('name');
    if (!error && data) return (data as Array<{ id: string; name: string; slug?: string }>).map((item) => ({ id: item.id, name: item.name }));
  } catch {
    // Fallback below.
  }

  return readLocalTags();
};

export const createCategory = async (name: string): Promise<BlogCategoryRecord> => {
  const category = { id: createId(), name };
  try {
    const { data, error } = await client.from('categories').insert({ id: category.id, name, slug: getSlugFromTitle(name) }).select('id, name').single();
    if (!error && data) return { id: data.id, name: data.name };
  } catch {
    // Fallback below.
  }

  const nextCategories = [...readLocalCategories(), category].filter((entry, index, arr) => arr.findIndex((item) => item.name.toLowerCase() === entry.name.toLowerCase()) === index);
  writeLocalCategories(nextCategories);
  return category;
};

export const createTag = async (name: string): Promise<BlogTagRecord> => {
  const tag = { id: createId(), name };
  try {
    const { data, error } = await client.from('tags').insert({ id: tag.id, name, slug: getSlugFromTitle(name) }).select('id, name').single();
    if (!error && data) return { id: data.id, name: data.name };
  } catch {
    // Fallback below.
  }

  const nextTags = [...readLocalTags(), tag].filter((entry, index, arr) => arr.findIndex((item) => item.name.toLowerCase() === entry.name.toLowerCase()) === index);
  writeLocalTags(nextTags);
  return tag;
};

export const uploadFile = async (bucket: keyof typeof BLOG_BUCKETS, file: File, path?: string): Promise<BlogFileUploadResult> => {
  const filePath = path ?? `${Date.now()}-${file.name}`;

  try {
    const { data, error } = await client.storage.from(bucket).upload(filePath, file, { upsert: true });
    if (!error && data) {
      const { data: publicUrlData } = client.storage.from(bucket).getPublicUrl(filePath);
      return { path: filePath, publicUrl: publicUrlData.publicUrl };
    }
  } catch {
    // Fallback below.
  }

  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    const preview = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
      reader.onerror = () => reject(new Error('Unable to read file'));
      reader.readAsDataURL(file);
    });
    return { path: filePath, publicUrl: preview };
  }

  return { path: filePath, publicUrl: URL.createObjectURL(file) };
};

export const deleteFile = async (bucket: keyof typeof BLOG_BUCKETS, path: string) => {
  try {
    await client.storage.from(bucket).remove([path]);
  } catch {
    // Ignore cleanup failures in local fallback mode.
  }
};
