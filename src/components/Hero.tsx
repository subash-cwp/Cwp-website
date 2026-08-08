import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSection } from "@/hooks/usePageContent";
import { sanitizeHeading } from "@/lib/sanitizeHtml";

interface HeroContent {
  badge: string;
  headingHtml: string;
  subheading: string;
  tagsLabel: string;
  tags: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

const DEFAULTS: HeroContent = {
  badge: "Trusted by 100+ Brands",
  headingHtml:
    'End-to-end marketing that <span class="text-gradient-primary">builds</span><br/>and <span class="text-gradient-primary">scales</span> your brand',
  subheading:
    "Strategy, creative, performance, and retention — everything ambitious D2C, SaaS and B2B brands need to grow.",
  tagsLabel: "For:",
  tags: ["Startups", "D2C Brands", "Founders and Growth' focused Enterprises"],
  primaryCtaLabel: "Book a Strategy Call",
  primaryCtaHref: "https://calendly.com/narenethiraj",
  secondaryCtaLabel: "View Our Work",
  secondaryCtaHref: "#portfolio",
};

export const Hero = () => {
  const c = useSection<HeroContent>("home", "hero", DEFAULTS);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        {/* Diagonal lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                left: '-10%',
                right: '-10%',
                transform: `rotate(-15deg)`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-2 h-2 bg-primary/40 rounded-full" />
            ) : i % 3 === 1 ? (
              <div className="w-3 h-3 border border-neon-cyan/40 rotate-45" />
            ) : (
              <div className="w-2 h-2 bg-neon-purple/40" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 container-custom text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-primary/30 backdrop-blur-sm animate-slide-up hover:border-primary/50 transition-colors group">
            <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{c.badge}</span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-slide-up"
            style={{ animationDelay: '0.1s' }}
            dangerouslySetInnerHTML={{ __html: sanitizeHeading(c.headingHtml) }}
          />

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {c.subheading}
          </p>

          {c.tags?.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <span className="text-sm text-muted-foreground">{c.tagsLabel}</span>
              <div className="flex flex-wrap gap-3 justify-center">
                {c.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-muted/30 rounded-full text-sm border border-border/30 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-default hover-lift"
                    style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <Button
              size="lg"
              className="gap-2 text-lg px-8 py-6 hover-lift hover-glow group relative overflow-hidden"
              onClick={() => window.open(c.primaryCtaHref, c.primaryCtaHref.startsWith('http') ? '_blank' : '_self')}
            >
              <span className="relative z-10">{c.primaryCtaLabel}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 hover-lift glow-border group"
              onClick={() => {
                if (c.secondaryCtaHref.startsWith('#')) {
                  document.querySelector(c.secondaryCtaHref)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open(c.secondaryCtaHref, c.secondaryCtaHref.startsWith('http') ? '_blank' : '_self');
                }
              }}
            >
              {c.secondaryCtaLabel}
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </div>


        </div>
      </div>
    </section>
  );
};
