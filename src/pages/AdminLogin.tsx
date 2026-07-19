import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import logo from '@/assets/logo.svg';
import SEO from '@/components/SEO';
import { clearAdminAuth, getAdminAuth, getAdminCredentials, setAdminAuth } from '@/lib/blogStorage';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    clearAdminAuth();
  }, []);

  useEffect(() => {
    if (getAdminAuth()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const storedCredentials = getAdminCredentials();
    const expectedUsername = storedCredentials?.username || 'admin';
    const expectedPassword = storedCredentials?.password || 'admin123';

    if (username.trim() !== expectedUsername || password !== expectedPassword) {
      setError('Invalid administrator credentials.');
      setSubmitting(false);
      return;
    }

    setAdminAuth(true);
    setSubmitting(false);
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <SEO title="Admin Login" noIndex />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full border-4 border-primary/10 shadow-lg">
            <img src={logo} alt="MVR AI & Robotics Academy" className="h-full w-full object-cover" />
          </div>
          <CardTitle className="text-xl">Admin Access</CardTitle>
          <CardDescription>Sign in to manage insights stories securely.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error ? (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in…</> : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
