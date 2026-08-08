import { Mail, Phone, MessageCircle, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSection } from "@/hooks/usePageContent";
import { sanitizeHeading } from "@/lib/sanitizeHtml";

export const ContactHero = () => {
  const c = useSection<{ badge: string; headingHtml: string; subheading: string; primaryLabel: string; phoneLabel: string; phoneHref: string }>(
    "contact",
    "hero",
    {
      badge: "Let's Start a Conversation",
      headingHtml: 'Get in <span class="text-gradient-primary">Touch</span>',
      subheading:
        "Ready to transform your business? We're here to help you achieve your marketing goals with strategic solutions tailored to your needs.",
      primaryLabel: "Send a Message",
      phoneLabel: "Call Us Now",
      phoneHref: "tel:+918610986622",
    },
  );
  const scrollToForm = () => {
    document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30">
          <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-8 border border-primary/15 rounded-full animate-[spin_45s_linear_infinite_reverse]" />
          <div className="absolute inset-16 border border-primary/10 rounded-full animate-[spin_30s_linear_infinite]" />
        </div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{c.badge}</span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up"
            dangerouslySetInnerHTML={{ __html: sanitizeHeading(c.headingHtml) }}
          />

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {c.subheading}
          </p>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="gap-2 hover-glow" onClick={scrollToForm}>
              <Mail className="w-5 h-5" />
              {c.primaryLabel}
            </Button>
            <Button size="lg" variant="outline" className="gap-2 glow-border" asChild>
              <a href={c.phoneHref}>
                <Phone className="w-5 h-5" />
                {c.phoneLabel}
              </a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <button 
              onClick={scrollToForm}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/50 hover:border-primary/50 transition-colors"
            >
              <ArrowDown className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-primary/20 rotate-45 animate-float hidden lg:block" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-primary/10 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 right-32 w-8 h-8 border border-neon-cyan/30 rotate-12 animate-float hidden lg:block" style={{ animationDelay: '4s' }} />
    </section>
  );
};
