import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

export const Hero = () => {
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
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Trusted by 50+ Brands</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We <span className="text-gradient-primary">build</span>, grow and
            <br />
            help you <span className="relative inline-block">
              <span className="text-gradient-primary">scale</span>
              <span className="absolute -inset-1 bg-primary/20 blur-xl -z-10 animate-pulse-glow" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            By bringing the best strategic marketing, creative and growth consulting that aligns with your brand&apos;s vision
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-sm text-muted-foreground">For:</span>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Startups', 'D2C Brands', 'Founders and Growth-focused Enterprises'].map((tag, i) => (
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <MagneticButton strength={0.5} range={120}>
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8 py-6 hover-lift hover-glow group relative overflow-hidden"
                onClick={() => window.open('https://calendly.com/narenethiraj', '_blank')}
              >
                <span className="relative z-10">Book a Strategy Call</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.5} range={120}>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 hover-lift glow-border group"
                onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Our Work
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Button>
            </MagneticButton>
          </div>

          <p className="text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <span className="text-primary font-semibold">Trusted by 50+ Brands</span>
          </p>
        </div>
      </div>
    </section>
  );
};
