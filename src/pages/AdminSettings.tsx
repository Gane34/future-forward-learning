import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { clearAdminCredentials, getAdminCredentials, setAdminCredentials } from '@/lib/blogStorage';

const AdminSettings = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const credentials = getAdminCredentials();
    if (credentials) {
      setUsername(credentials.username);
      setPassword(credentials.password);
    }
  }, []);

  const saveCredentials = () => {
    setAdminCredentials(username.trim() || 'admin', password.trim());
    toast({ title: 'Credentials updated', description: 'The admin account details were stored locally for this browser.' });
  };

  const clearSaved = () => {
    clearAdminCredentials();
    setUsername('admin');
    setPassword('');
    toast({ title: 'Cleared', description: 'Saved admin credentials were removed.' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage the local admin credentials used for this browser session.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Admin credentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={saveCredentials}>Save credentials</Button>
            <Button variant="outline" onClick={clearSaved}>Clear saved credentials</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
