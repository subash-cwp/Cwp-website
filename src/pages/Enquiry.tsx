import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, TrendingUp, Target, BarChart3, Users, Zap, Award, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot } from "@/hooks/useHoneypot";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  company: z.string().trim().min(2, "Company name required").max(100),
  budget: z.string().min(1, "Select a budget"),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

const services = [
  { icon: Target, title: "Performance Marketing", desc: "Google Ads, Meta Ads, and paid campaigns tuned for ROAS." },
  { icon: TrendingUp, title: "SEO & Content", desc: "Rank higher, get discovered, and build durable organic traffic." },
  { icon: BarChart3, title: "Growth Analytics", desc: "Attribution, tracking setup, and dashboards that actually help decisions." },
  { icon: Users, title: "Social Media", desc: "Community, creatives, and campaigns that convert followers to buyers." },
  { icon: Zap, title: "Conversion Optimization", desc: "Landing pages and funnels engineered to convert paid traffic." },
  { icon: Award, title: "Brand Strategy", desc: "Positioning, messaging, and identity that scale with your business." },
];

const stats = [
  { n: "100+", l: "Brands scaled" },
  { n: "3x", l: "Avg. growth" },
  { n: "10+", l: "Years experience" },
  { n: "50M+", l: "Ad spend managed" },
];

const why = [
  { t: "Data-driven from day one", d: "Every campaign starts with tracking, attribution, and KPIs — not guesses." },
  { t: "Senior team, no hand-offs", d: "You work directly with strategists who have run 8-figure campaigns." },
  { t: "Transparent reporting", d: "Live dashboards. Weekly calls. No jargon, no hidden fees." },
  { t: "Full-funnel expertise", d: "Awareness to retention — we own the whole growth loop, not just clicks." },
];

const faqs = [
  { q: "How quickly can we get started?", a: "Onboarding takes 3-5 business days. Most campaigns go live in week 2." },
  { q: "What's your minimum engagement?", a: "We work with brands spending ₹1L+/month on ads. No long lock-ins — month-to-month after the first 90 days." },
  { q: "Do you work with international brands?", a: "Yes. We serve clients across India, US, UK, Middle East and Southeast Asia." },
  { q: "What industries do you specialize in?", a: "D2C, SaaS, B2B services, healthcare, education, and real estate." },
];

const Enquiry = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const honeypot = useHoneypot();
  const { settings } = useSiteSettings();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", company: "", budget: "", service: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      if (honeypot.isBot()) {
        setSubmitted(true);
        return;
      }
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.company.trim(),
        message: `Service: ${values.service}\nMonthly budget: ${values.budget}\n\n${values.message || ""}`.trim(),
        source: "enquiry_landing",
      });
      if (error) throw error;

      setSubmitted(true);
      toast({ title: "Thanks! We'll be in touch.", description: "A strategist will reach out within 24 hours." });
      form.reset();
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or call us directly." });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      <SEOHead
        title="Get a Free Marketing Growth Audit — CWP Marketing"
        description="Book a free 30-minute strategy call with CWP Marketing. Performance ads, SEO, and growth consulting for brands ready to scale."
        canonicalUrl="https://consultwithprofessionals.com/enquiry"
      />
      <div className="min-h-screen bg-background text-foreground">
        {/* Minimal top bar */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-40">
          <div className="container-custom flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="CWP Marketing" className="w-9 h-9 rounded-[5%]" />
              <span className="font-semibold hidden sm:inline">CWP Marketing</span>
            </Link>
            <a href="tel:+918610986622" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Phone className="h-4 w-4" /> <span className="hidden sm:inline">+91 86109 86622</span>
            </a>
          </div>
        </header>

        {/* HERO */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
          </div>
          <div className="container-custom relative z-10 grid lg:grid-cols-[1fr_460px] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-foreground/80">Now booking Q3 growth engagements</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                Scale your brand with <span className="text-primary">performance marketing</span> that pays for itself.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                We help D2C, SaaS, and B2B brands unlock predictable growth through Google Ads, SEO, and full-funnel campaigns — with transparent reporting and senior strategists on every account.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Free 30-min growth audit — no obligation",
                  "Custom strategy for your industry & funnel",
                  "Senior team, live dashboards, weekly reviews",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border/50">
                {stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl md:text-3xl font-bold"><span className="text-primary">{s.n}</span></div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div id="lead-form" className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl lg:sticky lg:top-24">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-14 w-14 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">You're in.</h3>
                  <p className="text-muted-foreground text-sm">A strategist will reach out within 24 hours to schedule your free growth audit.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-1">Get your free growth audit</h2>
                  <p className="text-sm text-muted-foreground mb-6">Fill this out and we'll respond within 24 hours.</p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                      <honeypot.HoneypotField />
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Work email</FormLabel><FormControl><Input type="email" placeholder="jane@brand.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" placeholder="+91 98765 43210" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="company" render={({ field }) => (
                        <FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="Your brand" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="service" render={({ field }) => (
                        <FormItem>
                          <FormLabel>I need help with</FormLabel>
                          <FormControl>
                            <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              <option value="">Select a service</option>
                              <option>Performance Marketing (Google/Meta Ads)</option>
                              <option>SEO & Content</option>
                              <option>Full-funnel Growth</option>
                              <option>Analytics & Attribution</option>
                              <option>Brand Strategy</option>
                              <option>Not sure yet</option>
                            </select>
                          </FormControl><FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="budget" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly marketing budget</FormLabel>
                          <FormControl>
                            <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              <option value="">Select a range</option>
                              <option>Under ₹1L / month</option>
                              <option>₹1L – ₹5L / month</option>
                              <option>₹5L – ₹15L / month</option>
                              <option>₹15L+ / month</option>
                            </select>
                          </FormControl><FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Tell us about your goals (optional)</FormLabel><FormControl><Textarea rows={3} placeholder="What are you trying to achieve?" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" disabled={submitting} className="w-full" size="lg">
                        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</> : "Get my free audit"}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">By submitting, you agree to be contacted about your enquiry. We respect your privacy.</p>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-16 md:py-20 border-t border-border/50">
          <div className="container-custom">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">What we do</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Full-stack growth marketing, under one roof.</h2>
              <p className="text-muted-foreground">Six connected services, run by a senior team that treats your brand like a portfolio company.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-16 md:py-20 border-t border-border/50 bg-card/30">
          <div className="container-custom">
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Why CWP</div>
              <h2 className="text-3xl md:text-4xl font-bold">Not just another agency. A growth partner.</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {why.map((w) => (
                <div key={w.t} className="bg-background border border-border rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <h3 className="font-semibold">{w.t}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-8">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 border-t border-border/50">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-12">
              <div className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">FAQ</div>
              <h2 className="text-3xl md:text-4xl font-bold">Common questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group bg-card border border-border rounded-xl p-5 open:border-primary/40">
                  <summary className="cursor-pointer font-medium flex items-center justify-between gap-4">
                    <span>{f.q}</span>
                    <span className="text-primary text-xl leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 border-t border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
          </div>
          <div className="container-custom relative z-10 text-center max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to <span className="text-primary">grow?</span></h2>
            <p className="text-muted-foreground mb-8">Book a free 30-minute strategy call — we'll audit your current setup and share three specific opportunities to unlock growth.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={scrollToForm}>Get my free audit</Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+918610986622"><Phone className="mr-2 h-4 w-4" /> Call us</a>
              </Button>
            </div>
            <div className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-6 flex-wrap">
              <a href="mailto:hello@consultwithprofessionals.com" className="hover:text-primary flex items-center gap-2"><Mail className="h-4 w-4" /> hello@consultwithprofessionals.com</a>
            </div>
          </div>
        </section>

        <footer className="py-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CWP Marketing. All rights reserved. · <Link to="/privacy-policy" className="hover:text-primary">Privacy</Link>
        </footer>
      </div>
    </>
  );
};

export default Enquiry;
