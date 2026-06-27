import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useHoneypot } from "@/hooks/useHoneypot";

const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const honeypot = useHoneypot();

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    if (honeypot.isBot()) {
      // Silently accept to avoid signalling the bot.
      toast({ title: "Subscribed!", description: "Thank you for subscribing to our newsletter." });
      form.reset();
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: data.email });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "You're already subscribed!", description: "Check your inbox for our latest updates." });
      } else {
        toast({ variant: "destructive", title: "Error", description: "Failed to subscribe. Please try again." });
      }
    } else {
      toast({ title: "Subscribed!", description: "Thank you for subscribing to our newsletter." });
      form.reset();
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-4 sm:p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay Updated with Growth Tips</h3>
        <p className="text-muted-foreground mb-6 text-sm sm:text-base">
          Get exclusive marketing insights, growth strategies, and industry trends delivered to your inbox weekly.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <honeypot.HoneypotField />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
