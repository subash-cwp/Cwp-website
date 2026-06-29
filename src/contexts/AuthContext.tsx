import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const MASTER_EMAIL = "subashkanagamani3107@gmail.com";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isContentManager: boolean;
  isMasterAdmin: boolean;
  roles: string[];
  roleChecked: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [roleChecked, setRoleChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRoles = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    setRoles(error || !data ? [] : data.map((r: any) => r.role as string));
    setRoleChecked(true);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setRoleChecked(false);
          setTimeout(() => loadRoles(session.user.id), 0);
        } else {
          setRoles([]);
          setRoleChecked(true);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) loadRoles(session.user.id);
      else setRoleChecked(true);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl, data: { full_name: fullName } }
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setRoles([]);
    setRoleChecked(false);
  };

  const isAdmin = roles.includes("admin");
  const isContentManager = roles.includes("content_manager");
  const isMasterAdmin = (user?.email ?? "").toLowerCase() === MASTER_EMAIL;

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isContentManager, isMasterAdmin, roles, roleChecked, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
