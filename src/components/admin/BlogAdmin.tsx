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
  deleteBlogPost,
  getPublishedBlogPosts,
  readBlogPosts,
  saveBlogPost,
  type BlogPost,
} from '@/lib/blogStorage';
import { CalendarDays, Clock3, Eye, ImageIcon, Plus, Save, Sparkles, Trash2 } from 'lucide-react';

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: 'General',
  tags: '',
  author: 'Admin',
  published: false,
  featured: false,
  seoTitle: '',
  seoDescription: '',
};

const BlogAdmin = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    setPosts(readBlogPosts());
  }, []);

  const selectedPost = useMemo(() => posts.find((post) => post.id === selectedPostId) || null, [posts, selectedPostId]);

  const startNew = () => {
    setSelectedPostId(null);
    setCoverPreview(null);
    setForm(emptyForm);
  };

  const editPost = (post: BlogPost) => {
    setSelectedPostId(post.id);
    setCoverPreview(post.coverImage || null);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      category: post.category,
      tags: post.tags.join(', '),
      author: post.author,
      published: post.published,
      featured: post.featured,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setCoverPreview(result);
      setForm((current) => ({ ...current, coverImage: result }));
    };
    reader.readAsDataURL(file);
  };

  const saveCurrent = async (publish: boolean) => {
    if (!form.title.trim() || !form.content.trim()) {
      toast({ title: 'Missing fields', description: 'Add a title and content before saving.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const post = createBlogPost({
      id: selectedPost?.id,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      category: form.category,
      tags: form.tags.split(',').map((tag) => tag.trim()),
      author: form.author,
      published: publish,
      featured: form.featured,
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.excerpt || form.content.slice(0, 160),
      createdAt: selectedPost?.createdAt,
      updatedAt: new Date().toISOString(),
    });

    saveBlogPost(post);
    const nextPosts = readBlogPosts();
    setPosts(nextPosts);
    setSelectedPostId(post.id);
    toast({ title: publish ? 'Published' : 'Draft saved', description: publish ? 'Your blog is now live.' : 'Your draft is safely stored.' });
    setSubmitting(false);
  };

  const removePost = (post: BlogPost) => {
    deleteBlogPost(post.id);
    setPosts(readBlogPosts());
    if (selectedPostId === post.id) {
      setSelectedPostId(null);
      setForm(emptyForm);
    }
    toast({ title: 'Deleted', description: 'The blog post was removed.' });
  };

  const publishedPosts = useMemo(() => getPublishedBlogPosts(), [posts]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Blog CMS</h2>
          <p className="text-sm text-muted-foreground">Create, edit, publish, and manage your insights content.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={startNew}><Plus className="mr-2 h-4 w-4" />New Post</Button>
          <Button onClick={() => void saveCurrent(false)} disabled={submitting}><Save className="mr-2 h-4 w-4" />Save Draft</Button>
          <Button onClick={() => void saveCurrent(true)} disabled={submitting}><Sparkles className="mr-2 h-4 w-4" />Publish</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
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
                      <span className="inline-flex items-center gap-1"><CalendarDays size={12} /> {new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-1"><Clock3 size={12} /> {Math.max(2, Math.ceil(post.content.split(/\s+/).filter(Boolean).length / 180))} min read</span>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    <Badge variant={post.published ? 'default' : 'secondary'}>{post.published ? 'Published' : 'Draft'}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => removePost(post)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
                {post.featured ? <p className="mt-2 text-xs text-primary">Featured</p> : null}
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
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" value={form.tags} onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" value={form.excerpt} onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover image</Label>
              <div className="flex flex-col gap-2">
                <Input id="coverImage" value={form.coverImage} onChange={(event) => setForm((current) => ({ ...current, coverImage: event.target.value }))} placeholder="Paste a URL or upload a file" />
                <div className="flex items-center gap-2">
                  <input id="cover-image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  <label htmlFor="cover-image-upload" className="inline-flex cursor-pointer items-center rounded-full border border-border bg-background px-3 py-2 text-sm font-medium">
                    <ImageIcon className="mr-2 h-4 w-4" />Upload file
                  </label>
                </div>
                {coverPreview ? <img src={coverPreview} alt="Cover preview" className="h-48 w-full rounded-2xl object-cover" /> : null}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" value={form.content} onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))} rows={12} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO title</Label>
              <Input id="seoTitle" value={form.seoTitle} onChange={(event) => setForm((current) => ({ ...current, seoTitle: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO description</Label>
              <Textarea id="seoDescription" value={form.seoDescription} onChange={(event) => setForm((current) => ({ ...current, seoDescription: event.target.value }))} rows={3} />
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
