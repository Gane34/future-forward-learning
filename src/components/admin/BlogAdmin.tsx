import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  createBlogPost,
  createCategory,
  createTag,
  deleteBlogPost,
  getAllBlogPosts,
  getCategories,
  getSlugFromTitle,
  getTags,
  updateBlogPost,
  uploadFile,
  type BlogCategoryRecord,
  type BlogPostRecord,
  type BlogTagRecord,
  BLOG_BUCKETS,
} from '@/lib/blogService';
import { CalendarDays, Clock3, Eye, ImageIcon, Plus, Save, Sparkles, Trash2, Copy, ExternalLink, FileText } from 'lucide-react';

const emptyForm = {
  title: '',
  subtitle: '',
  excerpt: '',
  content: '',
  coverImage: '',
  galleryImages: '' as string,
  category: 'General',
  tags: '' as string,
  author: 'Dr. Murali Krishna',
  authorPhoto: '',
  authorDesignation: 'Research Lead',
  attachments: '' as string,
  published: false,
  featured: false,
  seoTitle: '',
  seoDescription: '',
  metaKeywords: '',
  canonicalUrl: '',
  readingTime: 5,
};

const BlogAdmin = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [categories, setCategories] = useState<BlogCategoryRecord[]>([]);
  const [tags, setTags] = useState<BlogTagRecord[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [authorPreview, setAuthorPreview] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const load = async () => {
      const [allPosts, allCategories, allTags] = await Promise.all([getAllBlogPosts(), getCategories(), getTags()]);
      setPosts(allPosts);
      setCategories(allCategories);
      setTags(allTags);
    };
    void load();
  }, []);

  const selectedPost = useMemo(() => posts.find((post) => post.id === selectedPostId) || null, [posts, selectedPostId]);
  const publishedPosts = useMemo(() => posts.filter((post) => post.published), [posts]);

  const startNew = () => {
    setSelectedPostId(null);
    setCoverPreview(null);
    setAuthorPreview(null);
    setForm({ ...emptyForm });
  };

  const editPost = (post: BlogPostRecord) => {
    setSelectedPostId(post.id);
    setCoverPreview(post.coverImage || null);
    setAuthorPreview(post.authorPhoto || null);
    setForm({
      title: post.title,
      subtitle: post.subtitle,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      galleryImages: post.galleryImages.join(', '),
      category: post.category,
      tags: post.tags.join(', '),
      author: post.author,
      authorPhoto: post.authorPhoto,
      authorDesignation: post.authorDesignation,
      attachments: post.attachments.join(', '),
      published: post.published,
      featured: post.featured,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      metaKeywords: post.metaKeywords,
      canonicalUrl: post.canonicalUrl,
      readingTime: post.readingTime,
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, mode: 'cover' | 'author') => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { publicUrl } = await uploadFile(mode === 'cover' ? 'images' : 'authorImages', file);
      if (mode === 'cover') {
        setCoverPreview(publicUrl);
        setForm((current) => ({ ...current, coverImage: publicUrl }));
      } else {
        setAuthorPreview(publicUrl);
        setForm((current) => ({ ...current, authorPhoto: publicUrl }));
      }
      toast({ title: 'Upload complete', description: 'The file has been attached to the blog entry.' });
    } catch {
      toast({ title: 'Upload failed', description: 'The file could not be uploaded right now.', variant: 'destructive' });
    }
  };

  const handleAttachmentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { publicUrl } = await uploadFile('pdfs', file);
      setForm((current) => ({
        ...current,
        attachments: current.attachments ? `${current.attachments}, ${publicUrl}` : publicUrl,
      }));
      toast({ title: 'PDF uploaded', description: 'The file is ready to attach to this post.' });
    } catch {
      toast({ title: 'Upload failed', description: 'The PDF could not be uploaded right now.', variant: 'destructive' });
    }
  };

  const saveCurrent = async (publish: boolean) => {
    if (!form.title.trim() || !form.content.trim()) {
      toast({ title: 'Missing fields', description: 'Add a title and content before saving.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const normalizedTags = form.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    const normalizedGallery = form.galleryImages.split(',').map((image) => image.trim()).filter(Boolean);
    const normalizedAttachments = form.attachments.split(',').map((attachment) => attachment.trim()).filter(Boolean);
    const slug = getSlugFromTitle(form.title);

    const postPayload = {
      id: selectedPost?.id,
      title: form.title,
      slug,
      subtitle: form.subtitle,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      galleryImages: normalizedGallery,
      category: form.category,
      tags: normalizedTags,
      author: form.author,
      authorPhoto: form.authorPhoto,
      authorDesignation: form.authorDesignation,
      featured: form.featured,
      published: publish,
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.excerpt || form.content.slice(0, 160),
      metaKeywords: form.metaKeywords,
      canonicalUrl: form.canonicalUrl || `/insights/${slug}`,
      readingTime: form.readingTime || 5,
      publishDate: selectedPost?.publishDate || new Date().toISOString(),
      createdAt: selectedPost?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: selectedPost?.viewCount || 0,
      attachments: normalizedAttachments,
    };

    try {
      const savedPost = selectedPost ? await updateBlogPost(selectedPost.id, postPayload) : await createBlogPost(postPayload);
      const nextPosts = await getAllBlogPosts();
      setPosts(nextPosts);
      setSelectedPostId(savedPost.id);
      toast({ title: publish ? 'Published' : 'Draft saved', description: publish ? 'Your blog is now live on the insights page.' : 'Your draft is safely stored.' });
    } catch {
      toast({ title: 'Save failed', description: 'The blog could not be saved right now.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const removePost = async (post: BlogPostRecord) => {
    try {
      await deleteBlogPost(post.id);
      const nextPosts = await getAllBlogPosts();
      setPosts(nextPosts);
      if (selectedPostId === post.id) {
        setSelectedPostId(null);
        setForm({ ...emptyForm });
      }
      toast({ title: 'Deleted', description: 'The blog post was removed.' });
    } catch {
      toast({ title: 'Delete failed', description: 'The blog could not be removed right now.', variant: 'destructive' });
    }
  };

  const duplicatePost = async (post: BlogPostRecord) => {
    const duplicatePayload = {
      ...post,
      id: undefined,
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy`,
      published: false,
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishDate: new Date().toISOString(),
    };
    try {
      const savedPost = await createBlogPost(duplicatePayload as any);
      const nextPosts = await getAllBlogPosts();
      setPosts(nextPosts);
      setSelectedPostId(savedPost.id);
      editPost(savedPost);
      toast({ title: 'Duplicated', description: 'A draft copy has been created.' });
    } catch {
      toast({ title: 'Duplicate failed', description: 'The blog could not be duplicated.', variant: 'destructive' });
    }
  };

  const addCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    try {
      const created = await createCategory(trimmed);
      setCategories((current) => [...current.filter((entry) => entry.id !== created.id), created]);
      setForm((current) => ({ ...current, category: created.name }));
      setNewCategory('');
      toast({ title: 'Category added', description: `${created.name} is now available.` });
    } catch {
      toast({ title: 'Category failed', description: 'The category could not be created.', variant: 'destructive' });
    }
  };

  const addTag = async () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    try {
      const created = await createTag(trimmed);
      setTags((current) => [...current.filter((entry) => entry.id !== created.id), created]);
      setForm((current) => ({ ...current, tags: current.tags ? `${current.tags}, ${created.name}` : created.name }));
      setNewTag('');
      toast({ title: 'Tag added', description: `${created.name} is now available.` });
    } catch {
      toast({ title: 'Tag failed', description: 'The tag could not be created.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Content Management</h2>
          <p className="text-sm text-muted-foreground">Create, edit, publish, and organize your insights content.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={startNew}><Plus className="mr-2 h-4 w-4" />New Post</Button>
          <Button onClick={() => void saveCurrent(false)} disabled={submitting}><Save className="mr-2 h-4 w-4" />Save Draft</Button>
          <Button onClick={() => void saveCurrent(true)} disabled={submitting}><Sparkles className="mr-2 h-4 w-4" />Publish</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Your posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts yet. Start with your first article.</p>
            ) : posts.map((post) => (
              <div key={post.id} className="rounded-xl border border-border bg-background/70 p-3">
                <div className="flex items-start justify-between gap-3">
                  <button type="button" onClick={() => editPost(post)} className="text-left">
                    <div className="font-medium">{post.title}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><CalendarDays size={12} /> {new Date(post.publishDate).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-1"><Clock3 size={12} /> {post.readingTime} min read</span>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    <Badge variant={post.published ? 'default' : 'secondary'}>{post.published ? 'Published' : 'Draft'}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => void removePost(post)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                {post.featured ? <p className="mt-2 text-xs text-primary">Featured</p> : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => void duplicatePost(post)}><Copy className="mr-2 h-3.5 w-3.5" />Duplicate</Button>
                  <Link to={`/insights/${post.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-muted-foreground"><ExternalLink className="h-3.5 w-3.5" />Preview</Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selectedPost ? 'Edit post' : 'Create new post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" value={form.author} onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorDesignation">Author designation</Label>
                <Input id="authorDesignation" value={form.authorDesignation} onChange={(event) => setForm((current) => ({ ...current, authorDesignation: event.target.value }))} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input id="subtitle" value={form.subtitle} onChange={(event) => setForm((current) => ({ ...current, subtitle: event.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} placeholder="AI, Research, Robotics" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Short description</Label>
              <Textarea id="excerpt" value={form.excerpt} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Rich content</Label>
              <Textarea id="content" value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} rows={14} placeholder="Use HTML or plain text content. Headings, lists, links, and embedded media can be added here." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Featured image</Label>
              <div className="flex flex-col gap-2">
                <Input id="coverImage" value={form.coverImage} onChange={(event) => setForm((current) => ({ ...current, coverImage: event.target.value }))} placeholder="Paste a URL or upload a file" />
                <div className="flex items-center gap-2">
                  <input id="cover-image-upload" type="file" accept="image/*" className="hidden" onChange={(event) => void handleImageUpload(event, 'cover')} />
                  <label htmlFor="cover-image-upload" className="inline-flex cursor-pointer items-center rounded-full border border-border bg-background px-3 py-2 text-sm font-medium">
                    <ImageIcon className="mr-2 h-4 w-4" />Upload image
                  </label>
                </div>
                {coverPreview ? <img src={coverPreview} alt="Cover preview" className="h-48 w-full rounded-2xl object-cover" /> : null}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="galleryImages">Gallery images</Label>
              <Input id="galleryImages" value={form.galleryImages} onChange={(event) => setForm((current) => ({ ...current, galleryImages: event.target.value }))} placeholder="Paste comma-separated image URLs" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachments">PDF attachments</Label>
              <div className="flex flex-col gap-2">
                <Input id="attachments" value={form.attachments} onChange={(event) => setForm((current) => ({ ...current, attachments: event.target.value }))} placeholder="Paste PDF URLs or upload files" />
                <div className="flex items-center gap-2">
                  <input id="pdf-upload" type="file" accept="application/pdf" className="hidden" onChange={(event) => void handleAttachmentUpload(event)} />
                  <label htmlFor="pdf-upload" className="inline-flex cursor-pointer items-center rounded-full border border-border bg-background px-3 py-2 text-sm font-medium">
                    <FileText className="mr-2 h-4 w-4" />Upload PDF
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorPhoto">Author photo</Label>
              <div className="flex flex-col gap-2">
                <Input id="authorPhoto" value={form.authorPhoto} onChange={(event) => setForm((current) => ({ ...current, authorPhoto: event.target.value }))} placeholder="Paste a URL or upload a file" />
                <div className="flex items-center gap-2">
                  <input id="author-photo-upload" type="file" accept="image/*" className="hidden" onChange={(event) => void handleImageUpload(event, 'author')} />
                  <label htmlFor="author-photo-upload" className="inline-flex cursor-pointer items-center rounded-full border border-border bg-background px-3 py-2 text-sm font-medium">
                    <ImageIcon className="mr-2 h-4 w-4" />Upload author photo
                  </label>
                </div>
                {authorPreview ? <img src={authorPreview} alt="Author preview" className="h-16 w-16 rounded-full object-cover" /> : null}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO title</Label>
                <Input id="seoTitle" value={form.seoTitle} onChange={(event) => setForm((current) => ({ ...current, seoTitle: event.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input id="canonicalUrl" value={form.canonicalUrl} onChange={(event) => setForm((current) => ({ ...current, canonicalUrl: event.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO description</Label>
              <Textarea id="seoDescription" value={form.seoDescription} onChange={(event) => setForm((current) => ({ ...current, seoDescription: event.target.value }))} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">Meta keywords</Label>
              <Input id="metaKeywords" value={form.metaKeywords} onChange={(event) => setForm((current) => ({ ...current, metaKeywords: event.target.value }))} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} />
                featured article
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={form.published} onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))} />
                publish immediately
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newCategory">Add category</Label>
                <div className="flex gap-2">
                  <Input id="newCategory" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Research" />
                  <Button type="button" variant="outline" onClick={() => void addCategory()}>Add</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newTag">Add tag</Label>
                <div className="flex gap-2">
                  <Input id="newTag" value={newTag} onChange={(event) => setNewTag(event.target.value)} placeholder="AI" />
                  <Button type="button" variant="outline" onClick={() => void addTag()}>Add</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => void saveCurrent(false)} disabled={submitting}><Save className="mr-2 h-4 w-4" />Save draft</Button>
              <Button onClick={() => void saveCurrent(true)} disabled={submitting}><Sparkles className="mr-2 h-4 w-4" />Publish</Button>
            </div>
            <div className="rounded-xl border border-border bg-background/70 p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Eye className="h-4 w-4" />{publishedPosts.length} published articles are currently visible on the insights page.</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-border bg-background/70 p-4 text-sm text-muted-foreground">
        <span>Use this panel to manage your blog content without changing the rest of the site.</span>
        <Link to="/insights" className="font-medium text-primary">Preview insights</Link>
      </div>
    </div>
  );
};

export default BlogAdmin;
