import { useState, useEffect } from "react";
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
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useHoneypot } from "@/hooks/useHoneypot";
import { SEOHead } from "@/components/SEOHead";
import { ScrollAnimationWrapper } from "@/components/ScrollAnimationWrapper";
import { ParallaxSection } from "@/components/ParallaxSection";
import { row1Logos, row2Logos, row3Logos, useMarqueeCopies } from "@/components/ClientLogos";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid business email").max(255),
  phone: z.string().trim().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  company: z.string().trim().min(2, "Company name required").max(100),
  message: z.string().trim().max(2000).optional(),
});
type FormValues = z.infer<typeof schema>;

const benefits = [
  "Generate Quality Leads",
  "Convert More Leads Into Customers",
  "Improve Lead-to-Customer Conversion",
  "Build Predictable Growth",
];

const socialProof = [
  { icon: Award, text: "10+ Years of Growth Marketing Experience" },
  { icon: TrendingUp, text: "Marketing + Sales Expertise" },
  { icon: Users, text: "Dedicated Growth & Revenue Team" },
];

const services = [
  { num: "01", icon: Target, title: "Digital Marketing Strategy", desc: "Build a growth strategy around your business goals, audience, market and revenue targets." },
  { num: "02", icon: BarChart3, title: "Performance Marketing", desc: "Run Google Ads, Meta Ads and paid campaigns focused on qualified leads, customer acquisition and measurable ROI." },
  { num: "03", icon: TrendingUp, title: "SEO & Organic Growth", desc: "Improve search visibility, attract relevant organic traffic and create sustainable growth through search engine optimization." },
  { num: "04", icon: Users, title: "Social Media Marketing", desc: "Build your brand, engage your audience and create social strategies that support awareness, leads and sales." },
  { num: "05", icon: Zap, title: "Content Marketing", desc: "Create content that builds trust, attracts the right audience and supports the customer journey." },
  { num: "06", icon: Award, title: "Personal Branding", desc: "Build a stronger professional presence and position founders, executives and experts as trusted voices in their market." },
  { num: "07", icon: Sparkles, title: "Influencer Marketing", desc: "Connect your brand with relevant creators and influencers to reach targeted audiences and build credibility." },
  { num: "08", icon: Phone, title: "Lead Generation & Outreach", desc: "Generate qualified prospects through targeted campaigns, prospecting, LinkedIn outreach and email outreach." },
  { num: "09", icon: Handshake, title: "Sales Development", desc: "Qualify leads, set appointments, manage follow-ups and help build a consistent sales pipeline." },
  { num: "10", icon: CheckCircle2, title: "Sales Conversion & Closing", desc: "Support opportunity management, follow-ups and sales conversations to help move qualified prospects toward closed deals." },
  { num: "11", icon: Target, title: "Conversion Optimization", desc: "Improve landing pages, forms, funnels and conversion journeys so more of your traffic becomes leads and customers." },
  { num: "12", icon: BarChart3, title: "Growth Analytics", desc: "Track marketing, pipeline and sales performance so you know what is working and where revenue opportunities are being lost." },
];

const industries = [
  "Startups",
  "SaaS & Technology",
  "B2B Businesses",
  "Professional Services",
  "Real Estate",
  "MSMEs & Growing Businesses",
  "E-Commerce & D2C Brands",
  "Healthcare & Clinics",
  "Education & EdTech",
  "Finance & FinTech",
  "IT & Software Companies",
  "Manufacturing & Industrial",
  "Consulting & Agencies",
  "Hospitality & Travel",
  "Retail & Consumer Brands",
  "Construction & Infrastructure",
  "Legal & Business Services",
  "Recruitment & HR Services",
];

const serviceOptions = [
  "Complete Marketing + Sales Support",
  "Lead Generation & Outreach",
  "Sales & Pipeline Management",
  "Performance Marketing",
  "SEO & Organic Growth",
  "Social Media Marketing",
  "Content & Brand Growth",
  "Personal Branding",
  "Influencer Marketing",
];

const challengeOptions = [
  "We need more qualified leads",
  "We are not converting enough leads into customers",
  "Our sales pipeline needs improvement",
  "Our follow-ups are not working",
  "Deals are taking too long to close",
  "Our marketing is not generating enough ROI",
  "We need a complete marketing and sales growth team",
];

const processSteps = ["Attract", "Qualify", "Engage", "Convert", "Close"];

const revenueFunnel = [
  "Traffic",
  "Qualified Leads",
  "Sales Conversations",
  "Opportunities",
  "Negotiation",
  "Closed Deals",
  "Revenue",
];

const ownMatrix = {
  marketing: [
    "Growth Strategy",
    "Performance Marketing",
    "SEO",
    "Google Ads",
    "Meta Ads",
    "Social Media Marketing",
    "Content Marketing",
    "Personal Branding",
    "Influencer Marketing",
    "Landing Pages",
    "CRO",
    "Analytics",
    "Marketing Automation",
  ],
  sales: [
    "Lead Generation",
    "Prospecting",
    "LinkedIn Outreach",
    "Email Outreach",
    "Lead Qualification",
    "Appointment Setting",
    "Sales Follow-ups",
    "Pipeline Management",
    "Opportunity Management",
    "Closing Support",
    "Sales Reporting",
  ],
};

const marketingCapabilities = [
  "Performance Marketing",
  "SEO",
  "Content",
  "Social Media",
  "Brand Strategy",
  "Website / Landing Pages",
  "Marketing Automation",
];

const salesCapabilities = [
  "Lead Generation",
  "Prospecting",
  "LinkedIn Outreach",
  "Email Outreach",
  "Appointment Setting",
  "Lead Qualification",
  "Sales Follow-ups",
  "Pipeline Management",
  "Closing Support",
];

const results = [
  { brand: "D2C Skincare Brand", before: "1.4x ROAS", after: "4.6x ROAS", note: "in 90 days" },
  { brand: "B2B SaaS", before: "38 MQLs/month", after: "212 MQLs/month", note: "in 6 months" },
  { brand: "Healthcare Clinic Chain", before: "₹820 CPL", after: "₹190 CPL", note: "in 120 days" },
];

const why = [
  { t: "Marketing + Sales Expertise", d: "We combine digital marketing and sales expertise to help businesses move from traffic and leads toward measurable revenue." },
  { t: "Trusted By 100+ Businesses", d: "Businesses across industries trust CWP to support their growth, lead generation and marketing performance." },
  { t: "10+ Years Of Growth Marketing Experience", d: "Our team brings years of experience across performance marketing, SEO, lead generation, conversion and sales growth." },
  { t: "Senior Team, No Unnecessary Hand-Offs", d: "Work directly with experienced strategists and specialists focused on your business goals." },
  { t: "Transparent Reporting", d: "Track marketing, leads, pipeline and performance through clear reporting and regular reviews." },
  { t: "One Partner. Full Growth Journey.", d: "From generating demand to converting opportunities, one team supports the journey." },
];

const faqs = [
  { q: "How quickly can we get started?", a: "After the initial consultation, we review your current marketing and sales setup and recommend the most practical next steps." },
  { q: "What's your minimum engagement?", a: "We recommend a plan based on your goals, current stage, services required and expected growth opportunity." },
  { q: "Can you support sales, not just marketing?", a: "Yes. CWP combines marketing, lead generation, sales development, follow-ups, pipeline management and conversion support." },
  { q: "Who do you work with?", a: "We work with startups, SaaS and technology companies, B2B businesses, professional services, real estate brands, MSMEs and growing businesses." },
  { q: "Do you provide performance marketing?", a: "Yes. We manage Google Ads, Meta Ads and other performance campaigns focused on qualified leads, customer acquisition and measurable ROI." },
];

const Enquiry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const logoCopies = useMarqueeCopies(row1Logos.length, 180);
  const [submitting, setSubmitting] = useState(false);
  const honeypot = useHoneypot();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [challenge, setChallenge] = useState<string>("");
  const [serviceError, setServiceError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const toggleService = (option: string) => {
    setServiceError(false);
    setSelectedServices((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };

  const openForm = () => {
    if (selectedServices.length === 0) {
      setServiceError(true);
      return;
    }
    setFormOpen(true);
  };

  useEffect(() => {
    const existing = document.querySelector('script[src*="AW-18303056513"]');
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=AW-18303056513";
    document.head.appendChild(script);

    const inline = document.createElement("script");
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-18303056513');
    `;
    document.head.appendChild(inline);
  }, []);

  useEffect(() => {
    const existing = document.querySelector('script[src*="clarity.ms/tag/xlp1trzywp"]');
    if (existing) return;

    const clarityScript = document.createElement("script");
    clarityScript.type = "text/javascript";
    clarityScript.async = true;
    clarityScript.src = "https://www.clarity.ms/tag/xlp1trzywp";

    const inline = document.createElement("script");
    inline.type = "text/javascript";
    inline.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "xlp1trzywp");
    `;

    document.head.appendChild(clarityScript);
    document.head.appendChild(inline);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", company: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      if (honeypot.isBot()) { navigate("/thank-you"); return; }
      const { supabase } = await import("@/integrations/supabase/client");
      const servicesLine = selectedServices.length ? selectedServices.join(", ") : "Not specified";
      const composedMessage = `Services needed: ${servicesLine}\nBiggest challenge: ${challenge || "Not specified"}\n\n${values.message?.trim() || "No additional requirements provided."}`;
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.company.trim(),
        message: composedMessage,
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
              service: servicesLine,
              message: composedMessage,
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
            message: composedMessage,
            source: "enquiry_landing",
          },
        })
        .catch((err) => console.error("Sheet append failed", err));

      form.reset();
      navigate("/thank-you");
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "Something went wrong", description: "Please try again or call us directly." });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => setFormOpen(true);

  const foldCta = (label = "Get your free 30-min audit call") => (
    <div className="mt-10 flex flex-col items-center gap-3 text-center px-4">
      <Button
        size="lg"
        onClick={scrollToForm}
        className="w-full sm:w-auto gap-2 text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 hover-lift hover-glow group relative overflow-hidden"
      >
        <span className="relative z-10">{label}</span>
        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </Button>
      <span className="text-sm text-muted-foreground">
        30 minutes. One growth conversation. A growth &amp; revenue plan built for your business.
      </span>
    </div>
  );

  return (
    <>
      <SEOHead
        title="Generate More Leads. Close More Sales. — CWP"
        description="CWP is your extended growth & revenue team — demand generation, sales development, pipeline management and closing support. Book a free 30-min session."
        canonicalUrl="https://consultwithprofessionals.com/enquiry"
      />

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden enquiry-page">
        <div className="relative z-10">
          {/* Minimal top bar */}
          <header className="border-b border-border/60 bg-background/80 backdrop-blur-lg sticky top-0 z-40 animate-slide-up">
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
          <section className="relative overflow-hidden pt-6 pb-14 md:pt-8 md:pb-20">
            {/* Light background with subtle CWP accents */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/60 to-background">
              <div className="absolute inset-0 grid-pattern opacity-60" />
              {!isMobile && (
                <>
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute inset-0 opacity-10">
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
                          left: `${(i * 37) % 100}%`,
                          top: `${(i * 53) % 100}%`,
                          animationDelay: `${(i % 5) * 0.8}s`,
                          animationDuration: `${5 + (i % 5)}s`,
                        }}
                      >
                        {i % 3 === 0 ? (
                          <div className="w-2 h-2 bg-primary/40 rounded-full" />
                        ) : i % 3 === 1 ? (
                          <div className="w-3 h-3 border border-primary/40 rotate-45" />
                        ) : (
                          <div className="w-2 h-2 bg-primary/40" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="container-custom relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* LEFT COPY */}
              <div className="order-2 md:order-1 min-w-0 md:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-primary/30 backdrop-blur-sm animate-slide-up hover:border-primary/50 transition-colors mb-6">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
                  <span className="text-sm text-muted-foreground">Free 30-Min Growth Audit</span>
                </div>

                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up break-words"
                  style={{ animationDelay: "0.1s" }}
                >
                  We Generate Quality Leads &amp; Convert{" "}
                  <span className="text-gradient-primary">Them Into Sales</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  CWP is a digital marketing agency in Chennai helping businesses generate qualified leads through smart marketing and turn those opportunities into real customers and sales. We handle both marketing and sales for your business, bringing the entire growth journey together under one team.
                </p>

                <ul className="space-y-3 mb-8 animate-slide-up" style={{ animationDelay: "0.25s" }}>
                  {socialProof.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="text-foreground/90 text-sm md:text-base">{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid sm:grid-cols-2 gap-3 mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  {benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-card/40 border border-border/50">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/90">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <Button
                    size="lg"
                    onClick={scrollToForm}
                    className="w-full sm:w-auto h-auto whitespace-normal gap-2 text-sm sm:text-base px-5 sm:px-6 py-4 sm:py-6 hover-lift hover-glow group relative overflow-hidden"
                  >
                    <span className="relative z-10 text-left">Book My Free Audit Call</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </div>
              </div>

              {/* RIGHT: SERVICE SELECTOR */}
              <div
                id="lead-form"
                className="relative order-1 md:order-2 md:col-span-5 min-w-0 w-full max-w-md mx-auto md:max-w-none lg:sticky lg:top-24 animate-scale-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/60 via-neon-cyan/40 to-neon-purple/60 rounded-2xl blur-2xl opacity-80" />
                <div className="absolute -inset-[2px] bg-gradient-to-br from-primary via-neon-cyan to-neon-purple rounded-2xl opacity-70" />
                <div className="relative bg-card/95 backdrop-blur-xl border-2 border-primary/40 rounded-2xl p-5 sm:p-6 shadow-[0_0_60px_rgba(255,199,0,0.18)]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />

                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold tracking-wider text-primary uppercase">Free 30-Min Audit Call</span>

                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1">How Can We Help?</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5">Tell us where your business needs growth support.</p>

                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3">What do you need help with?</p>
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4 gap-y-2.5 mb-5">
                    {serviceOptions.map((option) => {
                      const checked = selectedServices.includes(option);
                      return (
                        <label
                          key={option}
                          className="flex items-center gap-2.5 cursor-pointer group text-[13px] sm:text-sm"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={() => toggleService(option)}
                            aria-label={option}
                          />
                          <span className={`transition-colors ${checked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3">Where is your biggest challenge today?</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {challengeOptions.map((option) => {
                      const active = challenge === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setChallenge(active ? "" : option)}
                          aria-pressed={active}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                            active
                              ? "bg-primary/15 border-primary text-foreground font-medium"
                              : "bg-card/40 border-border/60 text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {serviceError && (
                    <p className="text-sm text-destructive mb-4">Please select at least one option.</p>
                  )}

                  <Button
                    size="lg"
                    onClick={openForm}
                    className="w-full gap-2 hover-lift hover-glow group relative overflow-hidden animate-shake-attention"
                  >
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center pt-3">
                    No obligation. We respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 2 — DETAILS MODAL */}
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogContent className="max-w-2xl w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold">
                  Let's talk about your growth &amp; revenue goals.
                </DialogTitle>
                <DialogDescription>
                  {selectedServices.length > 0
                    ? `You selected: ${selectedServices.join(", ")}`
                    : "Tell us a bit about you and we'll take it from there."}
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
                  <honeypot.HoneypotField />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Name</FormLabel>
                        <FormControl><Input placeholder="Jane Doe" {...field} className="bg-background/70 border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="98765 43210"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            className="bg-background/70 border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Business Email</FormLabel>
                        <FormControl><Input type="email" placeholder="jane@brand.com" {...field} className="bg-background/70 border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="company" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Brand / Business Name</FormLabel>
                        <FormControl><Input placeholder="Your brand" {...field} className="bg-background/70 border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Your message (optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What are you looking to achieve? Share your goals, challenges, or any specific requirements..." {...field} className="min-h-[100px] resize-y bg-background/70 border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/30" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full gap-2 hover-lift hover-glow group relative overflow-hidden"
                  >
                    {submitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                    ) : (
                      <>
                        <span className="relative z-10">Let's Talk</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to be contacted about your enquiry.
                  </p>
                </form>
              </Form>
            </DialogContent>
          </Dialog>


          {/* BRANDS */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <ParallaxSection speed={0.3} direction="up">
              <section className="relative py-16 md:py-20 border-t border-border/50 overflow-hidden">
                <div className="container-custom">
                  <div className="max-w-2xl mb-12 text-center mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">Trusted by 100+ Businesses</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Businesses We've Helped <span className="text-gradient-primary">Grow</span>
                  </h2>
                  <p className="text-muted-foreground mt-3">Trusted by startups, growing businesses, B2B companies, professional services, real estate brands and established businesses.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[row1Logos, row2Logos, row3Logos].map((row, i) => {
                    const track = Array.from({ length: row.length * logoCopies }).map((_, idx) => row[idx % row.length]);
                    return (
                      <div key={i} className="relative overflow-hidden py-4">
                        <div className={`flex gap-3 md:gap-8 ${i % 2 === 0 ? "animate-scroll-rtl" : "animate-scroll-ltr"} items-center`}>
                          {track.map((logo, index) => (
                            <div
                              key={index}
                              className={`flex-shrink-0 flex items-center justify-center h-11 px-2 py-1.5 md:h-16 md:px-4 md:py-3 rounded-lg md:rounded-xl border ${
                                logo.dark ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100"
                              }`}
                            >
                              <img
                                src={logo.src}
                                alt={logo.alt}
                                loading="lazy"
                                decoding="async"
                                width={120}
                                height={40}
                                className="h-6 md:h-10 w-auto max-w-[70px] md:max-w-[120px] object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="container-custom">{foldCta()}</div>
              </section>
            </ParallaxSection>
          </ScrollAnimationWrapper>

          {/* RESULTS — Before vs After */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <section className="relative py-16 md:py-20 border-t border-border/50">
              <div className="container-custom">
                <div className="max-w-2xl mb-12 text-center mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">Real Results</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Marketing That Drives <span className="text-gradient-primary">Measurable Growth</span>
                  </h2>
                  <p className="text-muted-foreground mt-3">See how we have helped businesses improve leads, acquisition efficiency and marketing performance.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {results.map((r, i) => (
                    <div
                      key={r.brand}
                      className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-primary/40 via-border/60 to-transparent hover-lift animate-slide-up"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="relative h-full rounded-3xl bg-card/80 backdrop-blur-sm p-6 overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative flex items-center justify-between gap-3 mb-6">
                          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">{r.brand}</p>
                          <span className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-4 h-4 text-primary" />
                          </span>
                        </div>

                        <div className="relative flex items-stretch gap-3">
                          <div className="flex-1 rounded-2xl bg-muted/40 border border-border/50 px-4 py-3">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Before</div>
                            <div className="text-lg font-semibold text-muted-foreground line-through decoration-muted-foreground/40">
                              {r.before}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                              <ArrowRight className="w-4 h-4 text-primary" />
                            </span>
                          </div>
                          <div className="flex-1 rounded-2xl bg-primary/10 border border-primary/30 px-4 py-3">
                            <div className="text-[10px] uppercase tracking-widest text-primary mb-1">After</div>
                            <div className="text-xl font-bold text-gradient-primary">{r.after}</div>
                          </div>
                        </div>

                        <div className="relative mt-5 pt-4 border-t border-border/50 flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="text-xs font-medium text-muted-foreground">{r.note}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {foldCta()}
              </div>
            </section>
          </ScrollAnimationWrapper>

          {/* INDUSTRIES SERVED */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <section className="relative py-16 md:py-20 border-t border-border/50">
              <div className="container-custom">
                <div className="max-w-2xl mb-10 text-center mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">Who We Help</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Helping Businesses Generate <span className="text-gradient-primary">Leads &amp; Sales</span>
                  </h2>
                  <p className="text-muted-foreground mt-3">
                    CWP combines marketing, lead generation and sales expertise to help businesses attract the right customers and close more opportunities.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {industries.map((ind) => (
                    <span
                      key={ind}
                      className="px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-border/60 text-sm text-foreground/90 hover:border-primary/50 transition-colors"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
                {foldCta()}
              </div>
            </section>
          </ScrollAnimationWrapper>

          {/* SERVICES */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <ParallaxSection speed={0.3} direction="up">
              <section className="relative py-20 border-t border-border/50">
                <div className="container-custom">
                  <div className="max-w-2xl mb-14 text-center mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold tracking-widest uppercase text-primary">What We Do</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                      Our End-to-End Marketing <span className="text-gradient-primary">Services That Deliver Leads &amp; Sales</span>
                    </h2>
                    <p className="text-muted-foreground">
                      From attracting the right audience to converting opportunities into customers, CWP combines digital marketing services, performance marketing and sales support under one team.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map(({ icon: Icon, title, desc, num }, i) => (
                      <div
                        key={title}
                        className="group relative bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover-lift hover:border-primary/40 transition-all animate-slide-up"
                        style={{ animationDelay: `${i * 0.08}s` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                        <div className="relative flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:animate-pulse-glow">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-xs font-bold tracking-widest text-primary/70">{num}</span>
                        </div>
                        <h3 className="font-semibold mb-2 relative">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed relative">{desc}</p>
                      </div>
                    ))}
                  </div>
                  {foldCta()}
                </div>
              </section>
            </ParallaxSection>
          </ScrollAnimationWrapper>

          {/* MARKETING + SALES */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <section className="relative py-16 md:py-20 border-t border-border/50">
              <div className="container-custom">
                <div className="max-w-2xl mb-10 text-center mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">Marketing + Sales</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Marketing Creates Demand. <span className="text-gradient-primary">Sales Converts It Into Revenue.</span>
                  </h2>
                  <p className="text-muted-foreground mt-3">
                    Many businesses invest heavily in marketing but still struggle to turn leads into customers. CWP brings marketing and sales together so your growth does not stop at lead generation.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
                  {processSteps.map((step, i) => (
                    <div key={step} className="flex items-center gap-2 md:gap-3">
                      <span className="px-4 py-2 rounded-xl bg-card/70 border border-primary/30 text-sm font-semibold uppercase tracking-wider">
                        {step}
                      </span>
                      {i < processSteps.length - 1 && <ArrowRight className="w-4 h-4 text-primary shrink-0" />}
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/60 p-6">
                    <h3 className="font-semibold mb-4">Marketing capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {marketingCapabilities.map((c) => (
                        <span key={c} className="px-3 py-1.5 rounded-full bg-muted/40 border border-border/50 text-xs text-foreground/90">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-primary/30 p-6">
                    <h3 className="font-semibold mb-4">Sales capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {salesCapabilities.map((c) => (
                        <span key={c} className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs text-foreground/90">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {foldCta()}
              </div>
            </section>
          </ScrollAnimationWrapper>

          {/* WE DON'T STOP AT LEADS + REVENUE FUNNEL */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <section className="relative py-16 md:py-20 border-t border-border/50">
              <div className="container-custom grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    We don't stop at <span className="text-gradient-primary">generating leads.</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A lead is only the beginning. CWP can support the journey from prospecting and qualification to sales conversations, follow-ups, pipeline management and closing — helping businesses turn opportunities into customers.
                  </p>
                  <p className="mt-6 text-sm font-medium text-primary">One team supporting the entire growth journey.</p>
                </div>
                <div className="space-y-2">
                  {revenueFunnel.map((stage, i) => (
                    <div
                      key={stage}
                      className="mx-auto rounded-xl border border-primary/25 bg-card/70 backdrop-blur-sm px-4 py-3 text-center text-sm font-medium"
                      style={{ width: `${100 - i * 7}%` }}
                    >
                      {stage}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollAnimationWrapper>

          {/* WHAT CWP CAN OWN */}
          <ScrollAnimationWrapper animation="slide-up" threshold={0.1}>
            <section className="relative py-16 md:py-20 border-t border-border/50">
              <div className="container-custom max-w-4xl">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">What CWP Can Own</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    One extended team across <span className="text-gradient-primary">growth &amp; revenue</span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Marketing</h3>
                    <ul className="space-y-2.5">
                      {ownMatrix.marketing.map((m) => (
                        <li key={m} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-primary/30 bg-card/60 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Sales</h3>
                    <ul className="space-y-2.5">
                      {ownMatrix.sales.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-center text-muted-foreground mt-8">
                  Instead of coordinating multiple vendors, work with one extended team across your growth and revenue functions.
                </p>
                {foldCta()}
              </div>
            </section>
          </ScrollAnimationWrapper>


          {/* WHY US */}
          <ScrollAnimationWrapper animation="slide-in-left" threshold={0.15}>
          <section className="relative py-20 border-t border-border/50 overflow-hidden">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="container-custom relative">
                <div className="max-w-2xl mb-14 mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">Why CWP</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold">
                    Not just another agency. Your <span className="text-gradient-primary">extended growth &amp; revenue team.</span>
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
                {foldCta()}
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
                {foldCta()}
              </div>
            </section>
          </ScrollAnimationWrapper>

          {/* FINAL CTA */}
          <ScrollAnimationWrapper animation="scale-in" threshold={0.2}>
            <section className="relative py-24 border-t border-border/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/70 to-background">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-primary/10 blur-3xl" style={{ animationDelay: "1s" }} />
              </div>
              <div className="container-custom relative z-10 text-center max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Need More Leads — or More Sales From the <span className="text-gradient-primary">Leads You Already Have?</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Let's identify where your growth is getting stuck and build a practical plan around it.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    size="lg"
                    onClick={scrollToForm}
                    className="gap-2 text-base px-8 py-6 hover-lift hover-glow group relative overflow-hidden"
                  >
                    <span className="relative z-10">Talk to CWP</span>
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

        <WhatsAppButton />
      </div>
    </>
  );
};

export default Enquiry;
