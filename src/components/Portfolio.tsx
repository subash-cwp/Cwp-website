import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, Users, Target } from "lucide-react";

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
    <section id="portfolio" className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results for real businesses. See how we've helped brands achieve exceptional growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <Card key={index} className="p-8 bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,214,0,0.1)] group">
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="text-primary">
                  {item.category}
                </Badge>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground mb-6">{item.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border/50">
                {item.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <metric.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
