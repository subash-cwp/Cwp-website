import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message required").max(500),
});

import { useHoneypot } from "@/hooks/useHoneypot";

export const FooterContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypot = useHoneypot();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    if (honeypot.isBot()) {
      // Silently drop spam.
      setIsSubmitting(false);
      toast({ title: "Message Sent!", description: "We'll get back to you as soon as possible." });
      setFormData({ name: "", email: "", message: "" });
      return;
    }


    try {
      // Save to database
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        source: "footer_form"
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <honeypot.HoneypotField />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="footer-contact-name" className="sr-only">Your name</label>
          <Input
            id="footer-contact-name"
            name="name"
            placeholder="Your Name"
            aria-label="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-background/50 border-border/50 h-10 text-sm"
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="footer-contact-email" className="sr-only">Your email</label>
          <Input
            id="footer-contact-email"
            name="email"
            type="email"
            placeholder="Your Email"
            aria-label="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-background/50 border-border/50 h-10 text-sm"
            disabled={isSubmitting}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="footer-contact-message" className="sr-only">Your message</label>
        <Textarea
          id="footer-contact-message"
          name="message"
          placeholder="Your Message"
          aria-label="Your message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          className="bg-background/50 border-border/50 resize-none text-sm"
          disabled={isSubmitting}
        />
        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full" size="sm" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        Send Message
      </Button>
    </form>
  );
};
