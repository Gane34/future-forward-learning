export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  galleryImages: string[];
  readingTime: number;
  viewCount: number;
}

export interface BlogPostInput {
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  author?: string;
  published?: boolean;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
}

const BLOG_POSTS_STORAGE_KEY = 'dr_muggu_insights_posts';
const ADMIN_AUTH_STORAGE_KEY = 'admin_auth';
const ADMIN_CREDENTIALS_STORAGE_KEY = 'admin_credentials';
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME?.trim() || 'muggu murali krishna';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.trim() || 'Muggu@1995';

export const getBlogPostsStorageKey = () => BLOG_POSTS_STORAGE_KEY;
export const getAdminAuthStorageKey = () => ADMIN_AUTH_STORAGE_KEY;
export const getAdminCredentialsStorageKey = () => ADMIN_CREDENTIALS_STORAGE_KEY;

const encodeBase64 = (value: string) => {
  if (typeof window === 'undefined') return value;
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const hashPassword = async (password: string) => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((value) => value.toString(16).padStart(2, '0')).join('');
};

const estimateReadingTime = (content: string) => Math.max(2, Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 180));

export const createBlogPost = (input: BlogPostInput): BlogPost => {
  const now = new Date().toISOString();
  const title = input.title.trim();
  const slug = (input.slug || getSlugFromTitle(title)).trim().toLowerCase();

  return {
    id: input.id || crypto.randomUUID(),
    title,
    slug,
    excerpt: input.excerpt?.trim() || input.content.trim(),
    content: input.content.trim(),
    coverImage: input.coverImage || '',
    category: input.category?.trim() || 'General',
    tags: (input.tags || []).map((tag) => tag.trim()).filter(Boolean),
    author: input.author?.trim() || 'Admin',
    published: input.published ?? true,
    featured: input.featured ?? false,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now,
    seoTitle: input.seoTitle?.trim() || title,
    seoDescription: input.seoDescription?.trim() || input.excerpt?.trim() || input.content.trim() || '',
    galleryImages: [],
    readingTime: estimateReadingTime(input.content),
    viewCount: 0,
  };
};

export const normalizeBlogPost = (post: Partial<BlogPost>): BlogPost => createBlogPost({
  id: post.id,
  title: post.title || 'Untitled blog',
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content || '',
  coverImage: post.coverImage,
  category: post.category,
  tags: post.tags,
  author: post.author,
  published: post.published,
  featured: post.featured,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  seoTitle: post.seoTitle,
  seoDescription: post.seoDescription,
});

export const getSlugFromTitle = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const readBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(BLOG_POSTS_STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored) as Partial<BlogPost>[];
    return parsed.map((post) => normalizeBlogPost(post));
  } catch {
    return [];
  }
};

export const writeBlogPosts = (posts: BlogPost[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(BLOG_POSTS_STORAGE_KEY, JSON.stringify(posts));
};

export const saveBlogPost = (post: BlogPost) => {
  const posts = readBlogPosts();
  const existingIndex = posts.findIndex((entry) => entry.id === post.id);
  const nextPosts = existingIndex >= 0 ? posts.map((entry) => (entry.id === post.id ? post : entry)) : [post, ...posts];
  writeBlogPosts(nextPosts);
  return nextPosts;
};

export const deleteBlogPost = (id: string) => {
  const posts = readBlogPosts();
  const nextPosts = posts.filter((post) => post.id !== id);
  writeBlogPosts(nextPosts);
  return nextPosts;
};

export const getPublishedBlogPosts = () => readBlogPosts().filter((post) => post.published);

export const setAdminAuth = (value: boolean) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, value ? 'true' : 'false');
};

export const getAdminAuth = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === 'true';
};

export const clearAdminAuth = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
};

export const setAdminCredentials = async (username: string, password: string) => {
  if (typeof window === 'undefined') return;
  const passwordHash = await hashPassword(password);
  window.localStorage.setItem(ADMIN_CREDENTIALS_STORAGE_KEY, JSON.stringify({ username, passwordHash }));
};

export const getAdminCredentials = async () => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(ADMIN_CREDENTIALS_STORAGE_KEY);
  if (!stored) {
    return { username: ADMIN_USERNAME, passwordHash: await hashPassword(ADMIN_PASSWORD) };
  }

  try {
    return JSON.parse(stored) as { username: string; passwordHash: string };
  } catch {
    return null;
  }
};

export const verifyAdminCredentials = async (username: string, password: string) => {
  const stored = await getAdminCredentials();
  if (!stored) return false;
  const passwordHash = await hashPassword(password);
  return stored.username === username && stored.passwordHash === passwordHash;
};

export const clearAdminCredentials = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ADMIN_CREDENTIALS_STORAGE_KEY);
};
