import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = "https://xztsijmsttkwmzcrjhlk.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6dHNpam1zdHRrd216Y3JqaGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODg3OTQsImV4cCI6MjA4MDI2NDc5NH0.63UupfviC2bQVvgrFrym7EL1XvTdmhC35IPT8sHG7Kw";

type State = "loading" | "valid" | "invalid" | "already" | "submitting" | "done" | "error";

const Unsubscribe = () => {
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState<string>("");
  const token = new URLSearchParams(window.location.search).get("token") || "";

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } }
        );
        const data = await res.json();
        if (!res.ok) { setState("invalid"); return; }
        if (data.alreadyUnsubscribed) { setEmail(data.email || ""); setState("already"); return; }
        setEmail(data.email || "");
        setState("valid");
      } catch { setState("invalid"); }
    })();
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    try {
      const { error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) throw error;
      setState("done");
    } catch { setState("error"); }
  };

  return (
    <>
      <SEOHead title="Unsubscribe — CWP Marketing" description="Manage your email preferences." />
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl p-8 text-center">
          {state === "loading" && <><Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-4" /><p className="text-muted-foreground">Verifying your request…</p></>}
          {state === "invalid" && <><XCircle className="mx-auto h-10 w-10 text-destructive mb-4" /><h1 className="text-xl font-bold mb-2">Invalid or expired link</h1><p className="text-sm text-muted-foreground">This unsubscribe link is no longer valid.</p></>}
          {state === "already" && <><CheckCircle2 className="mx-auto h-10 w-10 text-primary mb-4" /><h1 className="text-xl font-bold mb-2">You're already unsubscribed</h1><p className="text-sm text-muted-foreground">{email} will no longer receive these emails.</p></>}
          {(state === "valid" || state === "submitting") && (
            <>
              <h1 className="text-xl font-bold mb-2">Unsubscribe from emails</h1>
              <p className="text-sm text-muted-foreground mb-6">Confirm you want to stop receiving emails at <strong className="text-foreground">{email}</strong>.</p>
              <Button onClick={confirm} disabled={state === "submitting"} size="lg" className="w-full">
                {state === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Unsubscribing…</> : "Confirm unsubscribe"}
              </Button>
            </>
          )}
          {state === "done" && <><CheckCircle2 className="mx-auto h-10 w-10 text-primary mb-4" /><h1 className="text-xl font-bold mb-2">You're unsubscribed</h1><p className="text-sm text-muted-foreground">{email} won't receive further emails.</p></>}
          {state === "error" && <><XCircle className="mx-auto h-10 w-10 text-destructive mb-4" /><h1 className="text-xl font-bold mb-2">Something went wrong</h1><p className="text-sm text-muted-foreground">Please try again in a moment.</p></>}
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
