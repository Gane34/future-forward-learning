import { describe, expect, it } from 'vitest';
import { createBlogPost, getSlugFromTitle, normalizeBlogPost } from './blogStorage';

describe('blog storage helpers', () => {
  it('creates a slug from a title', () => {
    expect(getSlugFromTitle('How AI Changed Everything!')).toBe('how-ai-changed-everything');
  });

  it('normalizes a blog post with defaults', () => {
    const post = createBlogPost({
      title: 'My New Post',
      content: 'Hello world',
      excerpt: 'Short summary',
      category: 'Research',
      tags: ['ai', 'healthcare'],
      author: 'Admin',
      published: true,
      featured: false,
      seoTitle: 'My New Post',
      seoDescription: 'Short summary',
      coverImage: ''
    });

    expect(post.slug).toBe('my-new-post');
    expect(post.published).toBe(true);
    expect(post.tags).toEqual(['ai', 'healthcare']);
  });

  it('normalizes an existing blog post with missing fields', () => {
    const result = normalizeBlogPost({
      id: '1',
      title: 'Existing article',
      slug: '',
      excerpt: '',
      content: 'Body',
      coverImage: '',
      category: 'News',
      tags: [],
      author: '',
      published: false,
      featured: false,
      createdAt: '',
      updatedAt: '',
      seoTitle: '',
      seoDescription: ''
    });

    expect(result.slug).toBe('existing-article');
    expect(result.excerpt).toBe('Body');
    expect(result.author).toBe('Admin');
  });

  it('fills in the richer blog metadata defaults', () => {
    const result = normalizeBlogPost({
      id: '2',
      title: 'Research note',
      slug: '',
      excerpt: '',
      content: 'Body content that should be used to estimate reading time.',
      coverImage: '',
      category: 'Research',
      tags: ['ai'],
      author: '',
      published: true,
      featured: true,
      createdAt: '',
      updatedAt: '',
      seoTitle: '',
      seoDescription: ''
    });

    expect(result.readingTime).toBeGreaterThan(0);
    expect(result.viewCount).toBe(0);
    expect(result.galleryImages).toEqual([]);
  });
});
