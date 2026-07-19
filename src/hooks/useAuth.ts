import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabaseConfigured = Boolean(
    import.meta.env.VITE_SUPABASE_URL &&
      import.meta.env.VITE_SUPABASE_URL !== "https://placeholder.supabase.co" &&
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY &&
      import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY !== "placeholder-key"
  );

  useEffect(() => {
    if (!supabaseConfigured) {
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      // Set up auth state listener FIRST
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);

          if (session?.user) {
            // Check admin role using setTimeout to avoid Supabase auth deadlock
            setTimeout(async () => {
              const { data } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", session.user.id)
                .eq("role", "admin")
                .maybeSingle();
              setIsAdmin(!!data);
              setLoading(false);
            }, 0);
          } else {
            setIsAdmin(false);
            setLoading(false);
          }
        }
      );

      // THEN get initial session
      void supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) setLoading(false);
      }).catch(() => {
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch {
      setLoading(false);
    }
  }, [supabaseConfigured]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return { user, session, isAdmin, loading, signIn, signOut };
}
