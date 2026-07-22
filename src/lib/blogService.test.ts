import { describe, expect, it } from 'vitest';
import { normalizeAttachmentList, normalizeSupabaseBlogRow } from './blogService';

describe('normalizeAttachmentList', () => {
  it('splits comma-separated attachment values and removes blanks', () => {
    expect(normalizeAttachmentList('https://example.com/guide.pdf, , https://example.com/notes.pdf')).toEqual([
      'https://example.com/guide.pdf',
      'https://example.com/notes.pdf',
    ]);
  });
});

describe('normalizeSupabaseBlogRow', () => {
  it('maps Supabase blog rows into the app blog post shape', () => {
    const result = normalizeSupabaseBlogRow({
      id: 'blog-1',
      title: 'New CMS Article',
      slug: 'new-cms-article',
      subtitle: 'A subtitle',
      excerpt: 'Summary',
      content: 'Body content',
      cover_image: 'https://cdn.example.com/image.jpg',
      gallery_images: ['https://cdn.example.com/one.jpg'],
      category: 'Research',
      tags: ['AI', 'Learning'],
      author: 'Muggu',
      author_photo: 'https://cdn.example.com/author.jpg',
      author_designation: 'Lead',
      featured: true,
      published: true,
      status: 'published',
      seo_title: 'SEO title',
      seo_description: 'SEO description',
      meta_keywords: 'ai,learning',
      canonical_url: 'https://example.com/article',
      reading_time: 6,
      publish_date: '2025-01-01T00:00:00.000Z',
      created_at: '2025-01-01T00:00:00.000Z',
      updated_at: '2025-01-02T00:00:00.000Z',
      view_count: 42,
      attachments: ['https://example.com/file.pdf'],
      author_id: null,
      category_id: null,
      created_at: '2025-01-01T00:00:00.000Z',
      updated_at: '2025-01-02T00:00:00.000Z',
    } as any);

    expect(result.title).toBe('New CMS Article');
    expect(result.coverImage).toBe('https://cdn.example.com/image.jpg');
    expect(result.published).toBe(true);
    expect(result.attachments).toEqual(['https://example.com/file.pdf']);
  });
});
