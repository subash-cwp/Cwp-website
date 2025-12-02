import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary to-background">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--muted-foreground) / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-custom text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border/50 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Trusted by 50+ Brands</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            We build, grow and
            <br />
            help you scale
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            By bringing the best strategic marketing, creative and growth consulting that aligns with your brand&apos;s vision
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <span className="text-sm text-muted-foreground">For:</span>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Startups', 'D2C Brands', 'Founders and Growth-focused Enterprises'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 bg-muted/30 rounded-full text-sm border border-border/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="gap-2 text-lg px-8 py-6"
              onClick={() => window.open('https://calendly.com/cwpmktng', '_blank')}
            >
              Book a Strategy Call
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Work
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">Trusted by 50+ Brands</span>
          </p>
        </div>
      </div>
    </section>
  );
};
