import { Card } from "@/components/ui/card";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Audit",
    description: "We deep-dive into your business, analyze your current marketing efforts, understand your target audience, and identify growth opportunities and bottlenecks."
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Strategy Development",
    description: "Based on insights, we create a data-driven roadmap with clear objectives, channel selection, budget allocation, and timeline. Every decision is backed by research and market analysis."
  },
  {
    icon: Rocket,
    number: "03",
    title: "Execution & Launch",
    description: "Our team implements the strategy across chosen channels - setting up campaigns, creating content, designing assets, and launching with precision. We test, iterate, and optimize continuously."
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Optimization & Scale",
    description: "We monitor performance daily, analyze data weekly, and optimize monthly. As campaigns mature, we double down on what works and scale winning strategies for exponential growth."
  }
];

export const Process = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      {/* Diagonal accent lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent w-full"
            style={{
              top: `${30 + i * 20}%`,
              transform: `rotate(${-10 + i * 5}deg)`,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How We <span className="text-gradient-primary relative">
              Work
              <span className="absolute -inset-2 bg-primary/10 blur-2xl -z-10 animate-pulse-glow" />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our proven 4-step process ensures your marketing delivers measurable results, not just vanity metrics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-500 relative overflow-hidden group hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Large number background */}
              <div className="absolute top-0 right-0 text-[120px] font-bold text-primary/5 leading-none pointer-events-none group-hover:text-primary/10 group-hover:scale-110 transition-all duration-500">
                {step.number}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-neon-cyan/0 group-hover:from-primary/5 group-hover:to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <step.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                </div>
                
                <div className="text-sm font-bold text-primary mb-2 group-hover:text-primary-glow transition-colors">
                  STEP {step.number}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-glow transition-colors">{step.title}</h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {step.description}
                </p>
              </div>

              {/* Connecting arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full z-20 animate-pulse-glow">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground text-xs font-bold">
                    →
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
