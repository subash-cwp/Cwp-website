import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const IDLE_MS = 30 * 60 * 1000; // 30 minutes

export function useIdleSignOut() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!user) return;

    const reset = () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(async () => {
        await signOut();
        toast({ title: "Signed out", description: "You were idle for too long." });
        navigate("/auth");
      }, IDLE_MS);
    };

    const events: (keyof WindowEventMap)[] = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      events.forEach((ev) => window.removeEventListener(ev, reset));
    };
  }, [user, signOut, navigate, toast]);
}
