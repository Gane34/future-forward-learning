import { Link } from 'react-router-dom';
import { BookOpen, FileText, ImageIcon, Sparkles, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { readBlogPosts } from '@/lib/blogStorage';

const AdminHome = () => {
  const posts = readBlogPosts();
  const published = posts.filter((post) => post.published).length;
  const drafts = posts.filter((post) => !post.published).length;
  const featured = posts.filter((post) => post.featured).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Monitor your insights content from one place.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{published}</div>
            <p className="text-sm text-muted-foreground">Live on the insights page</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{drafts}</div>
            <p className="text-sm text-muted-foreground">Saved but not published</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{featured}</div>
            <p className="text-sm text-muted-foreground">Highlighted on the insights home</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Media</CardTitle>
            <ImageIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">0</div>
            <p className="text-sm text-muted-foreground">Upload and preview covers</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link to="/admin/blogs/new" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Create new blog</Link>
          <Link to="/insights" className="rounded-full border border-border px-4 py-2 text-sm font-medium">Preview insights</Link>
          <Link to="/admin/profile" className="rounded-full border border-border px-4 py-2 text-sm font-medium">Edit profile</Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {posts.slice(0, 4).map((post) => (
            <div key={post.id} className="flex items-center justify-between rounded-xl border border-border bg-background/70 p-3">
              <div>
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-muted-foreground">{post.category} • {post.published ? 'Published' : 'Draft'}</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" /> {post.author}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHome;
