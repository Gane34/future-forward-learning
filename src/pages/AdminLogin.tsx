import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import logo from "@/assets/logo.svg";
import SEO from "@/components/SEO";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // Simple Hardcoded Auth Check as requested
    if (password !== "muggumuralikrishna1995") {
      setError("Invalid password. Access denied.");
      setSubmitting(false);
      return;
    }

    // Set local storage auth
    localStorage.setItem("admin_auth", "true");

    // Attempt Supabase sign in just in case, but rely on local auth for this specific request flow if needed
    // For now, we prioritize the requested password flow.
    // If we want to keep existing auth we can try it, but user specifically asked for this password.
    // We will bypass supabase auth for this specific prototype phase or use it if credentials match.
    // simpler:

    setTimeout(() => {
      navigate("/admin");
      setSubmitting(false);
    }, 1000);

    // Short delay to let auth state propagate
    setTimeout(() => {
      navigate("/admin");
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <SEO title="Admin Login" noIndex={true} />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full overflow-hidden border-4 border-primary/10 shadow-lg">
            <img src={logo} alt="MVR AI Academy" className="w-full h-full object-cover" />
          </div>
          <CardTitle className="text-xl">Admin Access</CardTitle>
          <CardDescription>Sign in to manage MVR AI Academy stories</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@futurminds.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
