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
    <section className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How We <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our proven 4-step process ensures your marketing delivers measurable results, not just vanity metrics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 text-[120px] font-bold text-primary/5 leading-none pointer-events-none">
                {step.number}
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                <div className="text-sm font-bold text-primary mb-2">
                  STEP {step.number}
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full z-20">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground text-xs">
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
