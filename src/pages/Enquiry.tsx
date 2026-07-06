import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  CheckCircle2,
  TrendingUp,
  Target,
  BarChart3,
  Users,
  Zap,
  Award,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot } from "@/hooks/useHoneypot";
import { SEOHead } from "@/components/SEOHead";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { ParallaxSection } from "@/components/ParallaxSection";
import { InteractiveParticles } from "@/components/InteractiveParticles";
import { row1Logos, row2Logos, row3Logos } from "@/components/ClientLogos";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  company: z.string().trim().min(2, "Company name required").max(100),
  service: z.string().min(1, "Select a service"),
  message: z.string().trim().max(1000).optional(),
});
type FormValues = z.infer<typeof schema>;

const services = [
  { icon: Target, title: "Performance Marketing", desc: "Google & Meta Ads tuned for real business results, not vanity metrics." },
  { icon: TrendingUp, title: "SEO & Content", desc: "Rank higher and build durable, compounding organic traffic." },
  { icon: BarChart3, title: "Growth Analytics", desc: "Attribution, tracking, and dashboards that drive decisions." },
  { icon: Users, title: "Social Media", desc: "Communities and creatives that convert followers to buyers." },
  { icon: Zap, title: "Conversion Optimization", desc: "Landing pages and funnels engineered to convert traffic." },
  { icon: Award, title: "Brand Strategy", desc: "Positioning and identity that scale with your business." },
];

const stats = [
  { n: "100+", l: "Brands scaled" },
  { n: "3x", l: "Avg. growth" },
  { n: "10+", l: "Years experience" },
  { n: "200+", l: "Campaigns managed" },
];

const why = [
  { t: "Data-driven from day one", d: "Every campaign starts with tracking, attribution, and KPIs — not guesses." },
  { t: "Senior team, no hand-offs", d: "You work directly with strategists who've run 8-figure campaigns." },
  { t: "Transparent reporting", d: "Live dashboards. Weekly calls. No jargon, no hidden fees." },
  { t: "Full-funnel expertise", d: "Awareness to retention — we own the whole growth loop, not just clicks." },
];

const faqs = [
  { q: "How quickly can we get started?", a: "Onboarding takes 3–5 business days. Most campaigns go live in week 2." },
  { q: "What's your minimum engagement?", a: "We start with a 90-day growth sprint, then continue month-to-month." },
  { q: "Do you work with international brands?", a: "Yes — clients across India, US, UK, Middle East and Southeast Asia." },
  { q: "What industries do you specialize in?", a: "D2C, SaaS, B2B services, healthcare, education, and real estate." },
];

const Enquiry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const honeypot = useHoneypot();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", company: "", service: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      if (honeypot.isBot()) { setSubmitted(true); return; }
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.company.trim(),
        message: `Service: ${values.service}\n\n${values.message || ""}`.trim(),
        source: "enquiry_landing",
      });
      if (error) throw error;

      // Fire-and-forget team notification email
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "enquiry-notification",
            idempotencyKey: `enquiry-${values.email.trim().toLowerCase()}-${Date.now()}`,
            templateData: {
              name: values.name.trim(),
              email: values.email.trim(),
              phone: values.phone.trim(),
              company: values.company.trim(),
              service: values.service,
              message: values.message?.trim() || "",
              submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            },
          },
        })
        .catch((err) => console.error("Team notification failed", err));

      // Fire-and-forget append to Google Sheet
      supabase.functions
        .invoke("append-lead-to-sheet", {
          body: {
            name: values.name.trim(),
            email: values.email.trim(),
            phone: values.phone.trim(),
            company: values.company.trim(),
            message: `Service: ${values.service}\n\n${values.message || ""}`.trim(),
            source: "enquiry_landing",
          },
        })
        .catch((err) => console.error("Sheet append failed", err));

      setSubmitted(true);
      form.reset();
      // Scroll the success card into view on mobile
      setTimeout(() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or call us directly." });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () =>
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      <SEOHead
        title="Get a Free Marketing Growth Audit — CWP Marketing"
        description="Book a free 30-minute strategy call with CWP Marketing. Performance ads, SEO, and growth consulting for brands ready to scale."
        canonicalUrl="https://consultwithprofessionals.com/enquiry"
      />

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <InteractiveParticles />

        <div className="relative z-10">
          {/* Minimal top bar */}
          <header className="border-b border-border/50 bg-background/70 backdrop-blur-lg sticky top-0 z-40 animate-slide-up">
            <div className="container-custom flex items-center justify-between h-16">
              <Link to="/" className="flex items-center group">
                <img src={logo} alt="CWP" className="w-9 h-9 rounded-[5%] group-hover:scale-110 transition-transform" />
              </Link>
              <a href="tel:+918610986622" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4" /> <span className="hidden sm:inline">+91 86109 86622</span>
              </a>
            </div>
          </header>

          {/* HERO */}
          <section className="relative overflow-hidden py-16 md:py-24">
            {/* Animated background — matches home hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background">
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
              <div className="absolute inset-0 opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                    style={{ top: `${20 + i * 15}%`, left: "-10%", right: "-10%", transform: "rotate(-15deg)" }}
                  />
                ))}
              </div>
              {/* Floating shapes */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${5 + Math.random() * 5}s`,
                    }}
                  >
                    {i % 3 === 0 ? (
                      <div className="w-2 h-2 bg-primary/40 rounded-full" />
                    ) : i % 3 === 1 ? (
                      <div className="w-3 h-3 border border-neon-cyan/40 rotate-45" />
                    ) : (
                      <div className="w-2 h-2 bg-neon-purple/40" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="container-custom relative z-10 grid lg:grid-cols-[1fr_460px] gap-12 items-start">
              {/* LEFT COPY */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-primary/30 backdrop-blur-sm animate-slide-up hover:border-primary/50 transition-colors mb-6">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
                  <span className="text-sm text-muted-foreground">Now booking Q3 growth engagements</span>
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  End-to-end marketing that{" "}
                  <span className="text-gradient-primary">builds</span>
                  <br />
                  and <span className="text-gradient-primary">scales</span> your brand.
                </h1>

                <p className="text-lg text-muted-foreground max-w-xl mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  We help D2C, SaaS, and B2B brands unlock predictable growth through strategy, creative, SEO, paid media, and full-funnel campaigns — with transparent reporting and senior strategists on every account.
                </p>

                <ul className="space-y-3 mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  {[
                    "Free 30-min growth audit — no obligation",
                    "Custom strategy for your industry & funnel",
                    "Senior team, live dashboards, weekly reviews",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="text-foreground/90">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <Button
                    size="lg"
                    onClick={scrollToForm}
                    className="gap-2 text-base px-8 py-6 hover-lift hover-glow group relative overflow-hidden"
                  >
                    <span className="relative z-10">Get my free audit</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-base px-8 py-6 hover-lift glow-border" asChild>
                    <a href="tel:+918610986622"><Phone className="mr-2 h-4 w-4" /> Talk to a strategist</a>
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border/50 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                  {stats.map((s) => (
                    <div key={s.l}>
                      <div className="text-2xl md:text-3xl font-bold text-gradient-primary">{s.n}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT FORM */}
              <div
                id="lead-form"
                className="relative lg:sticky lg:top-24 animate-scale-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-neon-cyan/20 to-neon-purple/30 rounded-2xl blur-xl opacity-60" />
                <div className="relative bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl p-6 md:p-8 shadow-2xl">
                  {submitted ? (
                    <div className="text-center py-8 animate-fade-in">
                      <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mx-auto mb-5 animate-pulse-glow">
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">You're in. 🎉</h3>
                      <p className="text-muted-foreground text-sm mb-6">
                        Thanks for reaching out. A senior strategist will be in touch within <span className="text-foreground font-semibold">24 hours</span>.
                      </p>

                      <div className="text-left bg-secondary/40 border border-border/60 rounded-xl p-5 mb-6">
                        <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">What happens next</p>
                        <ol className="space-y-3 text-sm">
                          {[
                            "We review your enquiry and pull together a quick baseline audit.",
                            "A strategist emails you to schedule a 30-min discovery call.",
                            "On the call, you'll get 3 specific growth opportunities — free.",
                          ].map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary shrink-0">{i + 1}</span>
                              <span className="text-foreground/90 leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <Button asChild size="lg" className="flex-1 gap-2 hover-lift">
                          <a href="tel:+918610986622"><Phone className="h-4 w-4" /> Call us now</a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="flex-1 gap-2">
                          <a href="https://wa.me/918610986622" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
                        <Link to="/case-studies" className="text-primary hover:underline">Browse case studies →</Link>
                        <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Back to home</Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-xs font-semibold tracking-wider text-primary uppercase">Free growth audit</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-1">Let's talk growth.</h2>
                      <p className="text-sm text-muted-foreground mb-6">We respond within 24 hours.</p>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                          <honeypot.HoneypotField />
                          <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Full name</FormLabel>
                              <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Work email</FormLabel>
                                <FormControl><Input type="email" placeholder="jane@brand.com" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Phone</FormLabel>
                                <FormControl><Input type="tel" placeholder="+91 98765 43210" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <FormField control={form.control} name="company" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Company</FormLabel>
                              <FormControl><Input placeholder="Your brand" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="service" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">I need help with</FormLabel>
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
                          <FormField control={form.control} name="message" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Your goals (optional)</FormLabel>
                              <FormControl><Textarea rows={3} placeholder="What are you trying to achieve?" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <Button
                            type="submit"
                            disabled={submitting}
                            size="lg"
                            className="w-full gap-2 hover-lift hover-glow group relative overflow-hidden mt-2"
                          >
                            {submitting ? (
                              <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                            ) : (
                              <>
                                <span className="relative z-10">Get my free audit</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                              </>
                            )}
                          </Button>
                          <p className="text-xs text-muted-foreground text-center pt-1">
                            By submitting, you agree to be contacted about your enquiry.
                          </p>
                        </form>
                      </Form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* BRANDS */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <ParallaxSection speed={0.3} direction="up">
              <section className="relative py-16 md:py-20 border-t border-border/50 overflow-hidden">
                <div className="container-custom">
                  <div className="max-w-2xl mb-12 text-center mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                      <span className="text-xs font-semibold tracking-widest uppercase text-primary">Trusted by</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      100+ brands we've helped <span className="text-gradient-primary">grow</span>
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {[row1Logos, row2Logos, row3Logos].map((row, i) => (
                    <div key={i} className="relative overflow-hidden py-4">
                      <div className={`flex gap-8 md:gap-12 ${i % 2 === 0 ? "animate-scroll-rtl" : "animate-scroll-ltr"} items-center`}>
                        {[...row, ...row, ...row, ...row].map((logo, index) => (
                          <div
                            key={index}
                            className={`flex-shrink-0 flex items-center justify-center h-16 px-4 py-3 rounded-xl border ${
                              logo.dark ? "bg-black/60 border-border/60" : "bg-card/60 backdrop-blur-sm border-border/60"
                            }`}
                          >
                            <img
                              src={logo.src}
                              alt={logo.alt}
                              loading="lazy"
                              className="h-8 md:h-10 w-auto max-w-[120px] object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ParallaxSection>
          </ScrollAnimationWrapper>

          {/* SERVICES */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <ParallaxSection speed={0.3} direction="up">
              <section className="relative py-20 border-t border-border/50">
                <div className="container-custom">
                  <div className="max-w-2xl mb-14 text-center mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold tracking-widest uppercase text-primary">What we do</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                      Full-stack <span className="text-gradient-primary">growth marketing</span>, under one roof.
                    </h2>
                    <p className="text-muted-foreground">
                      Six connected services, run by a senior team that treats your brand like a portfolio company.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map(({ icon: Icon, title, desc }, i) => (
                      <div
                        key={title}
                        className="group relative bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover-lift hover:border-primary/40 transition-all animate-slide-up"
                        style={{ animationDelay: `${i * 0.08}s` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                        <div className="relative w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2 relative">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed relative">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </ParallaxSection>
          </ScrollAnimationWrapper>

          {/* WHY US */}
          <ScrollAnimationWrapper animation="slide-in-left" threshold={0.15}>
            <section className="relative py-20 border-t border-border/50 overflow-hidden">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="container-custom relative">
                <div className="max-w-2xl mb-14 mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">Why CWP</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Not just another agency. A <span className="text-gradient-primary">growth partner.</span>
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {why.map((w, i) => (
                    <div
                      key={w.t}
                      className="group relative bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover-lift transition-all"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:animate-pulse-glow">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{w.t}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{w.d}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollAnimationWrapper>

          {/* FAQ */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.15}>
            <section className="py-20 border-t border-border/50">
              <div className="container-custom max-w-3xl">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">FAQ</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Common <span className="text-gradient-primary">questions</span>
                  </h2>
                </div>
                <div className="space-y-3">
                  {faqs.map((f) => (
                    <details
                      key={f.q}
                      className="group bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-5 open:border-primary/40 transition-colors"
                    >
                      <summary className="cursor-pointer font-medium flex items-center justify-between gap-4 list-none">
                        <span>{f.q}</span>
                        <span className="text-primary text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          </ScrollAnimationWrapper>

          {/* FINAL CTA */}
          <ScrollAnimationWrapper animation="scale-in" threshold={0.2}>
            <section className="relative py-24 border-t border-border/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/15 blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-neon-cyan/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
              </div>
              <div className="container-custom relative z-10 text-center max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Ready to <span className="text-gradient-primary">grow?</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Book a free 30-minute strategy call — we'll audit your current setup and share three specific opportunities to unlock growth.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    size="lg"
                    onClick={scrollToForm}
                    className="gap-2 text-base px-8 py-6 hover-lift hover-glow group relative overflow-hidden"
                  >
                    <span className="relative z-10">Get my free audit</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-base px-8 py-6 hover-lift glow-border" asChild>
                    <a href="tel:+918610986622"><Phone className="mr-2 h-4 w-4" /> Call us</a>
                  </Button>
                </div>
                <div className="mt-10 text-sm text-muted-foreground flex items-center justify-center gap-6 flex-wrap">
                  <a href="mailto:hello@consultwithprofessionals.com" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Mail className="h-4 w-4" /> hello@consultwithprofessionals.com
                  </a>
                </div>
              </div>
            </section>
          </ScrollAnimationWrapper>

          <footer className="py-6 border-t border-border/50 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} CWP Marketing. All rights reserved. ·{" "}
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Enquiry;
