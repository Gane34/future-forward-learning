import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminMedia = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');

  const saveUrl = () => {
    if (!url.trim()) {
      toast({ title: 'Missing URL', description: 'Enter an image URL to preview it.', variant: 'destructive' });
      return;
    }

    toast({ title: 'Preview ready', description: 'The image URL is ready to use in a blog post.' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Media</h1>
        <p className="mt-2 text-sm text-muted-foreground">Preview and reuse cover image URLs from anywhere.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cover image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input id="image-url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/cover.jpg" />
          </div>
          <Button onClick={saveUrl}>Preview</Button>
          {url ? <img src={url} alt="Preview" className="h-48 w-full rounded-2xl object-cover" onError={(event) => { (event.currentTarget as HTMLImageElement).style.display = 'none'; }} /> : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMedia;
