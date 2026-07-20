import { supabase } from '@/integrations/supabase/client';

const client = supabase as any;

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

export interface AuthorRecord {
  id: string;
  name: string;
  photo: string;
  designation: string;
  biography: string;
  qualifications: string;
  linkedIn: string;
  email: string;
  researchInterests: string[];
  publications: string[];
  articlesWritten: string[];
}

export interface MediaAssetRecord {
  id: string;
  title: string;
  type: 'image' | 'pdf' | 'video' | 'infographic' | 'zip' | 'dataset';
  url: string;
  category: string;
  description: string;
  uploadedAt: string;
  sizeLabel?: string;
}

export interface DownloadRecord {
  id: string;
  title: string;
  url: string;
  category: string;
  author: string;
  downloads: number;
  year: number;
  uploadedAt: string;
}

export interface NewsletterSubscriberRecord {
  id: string;
  email: string;
  name: string;
  interests: string[];
  subscribedAt: string;
  source: string;
}

export interface BlogFileUploadResult {
  path: string;
  publicUrl: string;
}

const BLOG_STORAGE_KEY = 'mmk_insights_posts_v2';
const CATEGORY_STORAGE_KEY = 'mmk_insights_categories_v2';
const TAG_STORAGE_KEY = 'mmk_insights_tags_v2';
const AUTHOR_STORAGE_KEY = 'mmk_insights_authors_v2';
const MEDIA_STORAGE_KEY = 'mmk_insights_media_v2';
const DOWNLOAD_STORAGE_KEY = 'mmk_insights_downloads_v2';
const NEWSLETTER_STORAGE_KEY = 'mmk_insights_newsletter_v2';

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

export const getSlugFromTitle = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const normalizeBlogPost = (post: Partial<BlogPostRecord>): BlogPostRecord => {
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
    attachments: post.attachments || [],
  };
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

const readLocalAuthors = (): AuthorRecord[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(AUTHOR_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as AuthorRecord[];
  } catch {
    return [];
  }
};

const writeLocalAuthors = (authors: AuthorRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTHOR_STORAGE_KEY, JSON.stringify(authors));
};

const readLocalMedia = (): MediaAssetRecord[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(MEDIA_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as MediaAssetRecord[];
  } catch {
    return [];
  }
};

const writeLocalMedia = (media: MediaAssetRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(media));
};

const readLocalDownloads = (): DownloadRecord[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(DOWNLOAD_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as DownloadRecord[];
  } catch {
    return [];
  }
};

const writeLocalDownloads = (downloads: DownloadRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DOWNLOAD_STORAGE_KEY, JSON.stringify(downloads));
};

const readLocalSubscribers = (): NewsletterSubscriberRecord[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(NEWSLETTER_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as NewsletterSubscriberRecord[];
  } catch {
    return [];
  }
};

const writeLocalSubscribers = (subscribers: NewsletterSubscriberRecord[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(subscribers));
};

export const getAllBlogPosts = async (): Promise<BlogPostRecord[]> => {
  try {
    const { data, error } = await client
      .from('blogs')
      .select('id, title, slug, subtitle, excerpt, content, cover_image, gallery_images, category, tags, author, author_photo, author_designation, featured, published, seo_title, seo_description, meta_keywords, canonical_url, reading_time, publish_date, created_at, updated_at, view_count, attachments')
      .order('publish_date', { ascending: false });

    if (!error && data) {
      return (data as any[]).map((item) => normalizeBlogPost({
        id: item.id,
        title: item.title,
        slug: item.slug,
        subtitle: item.subtitle,
        excerpt: item.excerpt,
        content: item.content,
        coverImage: item.cover_image || item.coverImage,
        galleryImages: item.gallery_images || [],
        category: item.category,
        tags: item.tags || [],
        author: item.author,
        authorPhoto: item.author_photo || '',
        authorDesignation: item.author_designation,
        featured: item.featured,
        published: item.published,
        seoTitle: item.seo_title,
        seoDescription: item.seo_description,
        metaKeywords: item.meta_keywords,
        canonicalUrl: item.canonical_url,
        readingTime: item.reading_time,
        publishDate: item.publish_date || item.created_at,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        viewCount: item.view_count || 0,
        attachments: item.attachments || [],
      }));
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
      return normalizeBlogPost({
        id: data.id,
        title: data.title,
        slug: data.slug,
        subtitle: data.subtitle,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.cover_image || '',
        galleryImages: data.gallery_images || [],
        category: data.category,
        tags: data.tags || [],
        author: data.author,
        authorPhoto: data.author_photo || '',
        authorDesignation: data.author_designation,
        featured: data.featured,
        published: data.published,
        seoTitle: data.seo_title,
        seoDescription: data.seo_description,
        metaKeywords: data.meta_keywords,
        canonicalUrl: data.canonical_url,
        readingTime: data.reading_time,
        publishDate: data.publish_date || data.created_at,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        viewCount: data.view_count || 0,
        attachments: data.attachments || [],
      });
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
    const { data, error } = await client.from('blog_categories').select('*').order('name');
    if (!error && data) return data as BlogCategoryRecord[];
  } catch {
    // Fallback below.
  }

  return readLocalCategories();
};

export const getTags = async (): Promise<BlogTagRecord[]> => {
  try {
    const { data, error } = await client.from('blog_tags').select('*').order('name');
    if (!error && data) return data as BlogTagRecord[];
  } catch {
    // Fallback below.
  }

  return readLocalTags();
};

export const createCategory = async (name: string): Promise<BlogCategoryRecord> => {
  const category = { id: createId(), name };
  try {
    const { data, error } = await client.from('blog_categories').insert({ id: category.id, name }).select().single();
    if (!error && data) return data as BlogCategoryRecord;
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
    const { data, error } = await client.from('blog_tags').insert({ id: tag.id, name }).select().single();
    if (!error && data) return data as BlogTagRecord;
  } catch {
    // Fallback below.
  }

  const nextTags = [...readLocalTags(), tag].filter((entry, index, arr) => arr.findIndex((item) => item.name.toLowerCase() === entry.name.toLowerCase()) === index);
  writeLocalTags(nextTags);
  return tag;
};

export const getAuthors = async (): Promise<AuthorRecord[]> => {
  try {
    const { data, error } = await client.from('authors').select('*').order('name');
    if (!error && data) return data as AuthorRecord[];
  } catch {
    // Fallback below.
  }

  return readLocalAuthors();
};

export const createAuthor = async (input: Partial<AuthorRecord>): Promise<AuthorRecord> => {
  const author: AuthorRecord = {
    id: input.id || createId(),
    name: input.name?.trim() || 'New author',
    photo: input.photo || '',
    designation: input.designation?.trim() || 'Research Lead',
    biography: input.biography?.trim() || '',
    qualifications: input.qualifications?.trim() || '',
    linkedIn: input.linkedIn?.trim() || '',
    email: input.email?.trim() || '',
    researchInterests: input.researchInterests || [],
    publications: input.publications || [],
    articlesWritten: input.articlesWritten || [],
  };

  try {
    const { data, error } = await client.from('authors').insert(author).select().single();
    if (!error && data) return data as AuthorRecord;
  } catch {
    // Fallback below.
  }

  const nextAuthors = [author, ...readLocalAuthors().filter((entry) => entry.id !== author.id)];
  writeLocalAuthors(nextAuthors);
  return author;
};

export const getMediaLibrary = async (): Promise<MediaAssetRecord[]> => {
  try {
    const { data, error } = await client.from('media_library').select('*').order('uploaded_at', { ascending: false });
    if (!error && data) return data as MediaAssetRecord[];
  } catch {
    // Fallback below.
  }

  return readLocalMedia();
};

export const createMediaAsset = async (input: Partial<MediaAssetRecord>): Promise<MediaAssetRecord> => {
  const asset: MediaAssetRecord = {
    id: input.id || createId(),
    title: input.title?.trim() || 'Media asset',
    type: input.type || 'image',
    url: input.url || '',
    category: input.category?.trim() || 'General',
    description: input.description?.trim() || '',
    uploadedAt: input.uploadedAt || new Date().toISOString(),
    sizeLabel: input.sizeLabel || 'New',
  };

  try {
    const { data, error } = await client.from('media_library').insert(asset).select().single();
    if (!error && data) return data as MediaAssetRecord;
  } catch {
    // Fallback below.
  }

  const nextMedia = [asset, ...readLocalMedia().filter((entry) => entry.id !== asset.id)];
  writeLocalMedia(nextMedia);
  return asset;
};

export const getDownloads = async (): Promise<DownloadRecord[]> => {
  try {
    const { data, error } = await client.from('downloads').select('*').order('downloads', { ascending: false });
    if (!error && data) return data as DownloadRecord[];
  } catch {
    // Fallback below.
  }

  return readLocalDownloads();
};

export const createDownload = async (input: Partial<DownloadRecord>): Promise<DownloadRecord> => {
  const asset: DownloadRecord = {
    id: input.id || createId(),
    title: input.title?.trim() || 'Resource download',
    url: input.url || '',
    category: input.category?.trim() || 'General',
    author: input.author?.trim() || 'MMK AI Solutions',
    downloads: input.downloads || 0,
    year: input.year || new Date().getFullYear(),
    uploadedAt: input.uploadedAt || new Date().toISOString(),
  };

  try {
    const { data, error } = await client.from('downloads').insert(asset).select().single();
    if (!error && data) return data as DownloadRecord;
  } catch {
    // Fallback below.
  }

  const nextDownloads = [asset, ...readLocalDownloads().filter((entry) => entry.id !== asset.id)];
  writeLocalDownloads(nextDownloads);
  return asset;
};

export const createNewsletterSubscriber = async (input: Partial<NewsletterSubscriberRecord>): Promise<NewsletterSubscriberRecord> => {
  const subscriber: NewsletterSubscriberRecord = {
    id: input.id || createId(),
    email: input.email?.trim() || '',
    name: input.name?.trim() || 'Reader',
    interests: input.interests || [],
    subscribedAt: input.subscribedAt || new Date().toISOString(),
    source: input.source || 'insights',
  };

  try {
    const { data, error } = await client.from('newsletter_subscribers').insert(subscriber).select().single();
    if (!error && data) return data as NewsletterSubscriberRecord;
  } catch {
    // Fallback below.
  }

  const nextSubscribers = [subscriber, ...readLocalSubscribers().filter((entry) => entry.email.toLowerCase() !== subscriber.email.toLowerCase())];
  writeLocalSubscribers(nextSubscribers);
  return subscriber;
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
