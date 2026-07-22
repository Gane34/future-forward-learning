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
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(BLOG_STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored) as Partial<BlogPostRecord>[];
    return parsed.map((post) => normalizeBlogPost(post));
  } catch {
    return [];
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
