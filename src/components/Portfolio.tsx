import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

const portfolioItems = [
  {
    title: "D2C Fashion Brand Scale-Up",
    category: "E-commerce",
    description: "Helped a fashion D2C brand scale from 50K to 5M monthly revenue through strategic performance marketing and conversion optimization.",
    metrics: [
      { icon: TrendingUp, label: "Revenue Growth", value: "10x" },
      { icon: Users, label: "Customer Base", value: "15K+" },
      { icon: Target, label: "ROAS", value: "8.5x" }
    ],
    tags: ["Meta Ads", "Email Marketing", "CRO"]
  },
  {
    title: "SaaS Lead Generation",
    category: "B2B SaaS",
    description: "Generated 1000+ qualified enterprise leads for a B2B SaaS platform through multi-channel demand generation and cold outreach.",
    metrics: [
      { icon: Users, label: "Qualified Leads", value: "1000+" },
      { icon: Target, label: "Conversion Rate", value: "35%" },
      { icon: TrendingUp, label: "Pipeline Value", value: "$2.5M" }
    ],
    tags: ["LinkedIn Ads", "Cold Email", "Content Marketing"]
  },
  {
    title: "Organic SEO Dominance",
    category: "Tech Startup",
    description: "Positioned a tech startup on page 1 of Google for 50+ target keywords, driving 200K+ monthly organic traffic.",
    metrics: [
      { icon: Users, label: "Monthly Traffic", value: "200K+" },
      { icon: Target, label: "Keywords Ranked", value: "50+" },
      { icon: TrendingUp, label: "Organic Leads", value: "3x" }
    ],
    tags: ["SEO", "Content Strategy", "Technical SEO"]
  },
  {
    title: "Complete Brand Transformation",
    category: "Healthcare",
    description: "Rebuilt brand identity and digital presence for a healthcare company, resulting in 5x increase in patient inquiries.",
    metrics: [
      { icon: Users, label: "Patient Inquiries", value: "5x" },
      { icon: Target, label: "Brand Awareness", value: "+250%" },
      { icon: TrendingUp, label: "Engagement Rate", value: "45%" }
    ],
    tags: ["Branding", "Website Design", "Social Media"]
  }
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="section-spacing relative">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="container-custom relative">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Success <span className="text-gradient-primary relative">
              Stories
              <span className="absolute -inset-2 bg-primary/10 blur-2xl -z-10 animate-pulse-glow" />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Real results for real businesses. See how we've helped brands achieve exceptional growth.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/case-studies">View All Case Studies</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <Card 
              key={index}
              className="p-8 bg-card border-border/50 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden cursor-pointer hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="text-primary border-primary/30 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                    {item.category}
                  </Badge>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-glow transition-colors">{item.title}</h3>
                <p className="text-muted-foreground mb-6 group-hover:text-foreground/90 transition-colors">{item.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border/50 group-hover:border-primary/30 transition-colors">
                  {item.metrics.map((metric, i) => (
                    <div 
                      key={i} 
                      className="text-center transform group-hover:scale-105 transition-transform"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      <metric.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-bold text-primary mb-1 group-hover:text-primary-glow transition-colors">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="text-xs group-hover:border-primary/50 group-hover:bg-primary/5 transition-all"
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
