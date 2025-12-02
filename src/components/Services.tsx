import { Target, Megaphone, LineChart, TrendingUp, Users, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Target,
    title: "Strategy & Planning",
    subtitle: "Market research, CRO, Paid Ads consultation, Email flow audit",
    description: "Make your D2C Brand a strategic powerhouse by providing growth.",
    bullets: [
      "Build a data-based strategy that gets you exactly where you want to be",
      "Enhance UX & conversion optimization",
      "Break down your objectives into a simplified, actionable road map"
    ]
  },
  {
    icon: Megaphone,
    title: "CRM & Marketing Automation",
    subtitle: "Email & SMS",
    description: "Generate more qualified leads with the most optimized conversion.",
    bullets: [
      "Complete email marketing setup (2-3 templates)",
      "Email and SMS marketing audit",
      "Implement email & SMS segmentation",
      "Devise Email/SMS automation & workflows"
    ]
  },
  {
    icon: LineChart,
    title: "Outreach & Demand Generation",
    subtitle: "Paid Ads, B2B, & Cold Email",
    description: "Generate more qualified leads with the most optimized conversion.",
    bullets: [
      "Increase your conversion rate by 30%",
      "Generate sales leads through targeted cold emails",
      "Multichannel strategy to power up lead generation",
      "Build opportunity"
    ]
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    subtitle: "Meta Ads, Google, Retargeting, LinkedIn Ads",
    description: "Make your ad investment work for you. 10x your brand with our guidance.",
    bullets: [
      "Increase your brand ROAS by 10x",
      "Comprehensive ad strategies from landing page design to ad copies",
      "Optimize campaigns and ad budgets",
      "Hyper retargeting, lead ads and look-a-like ads"
    ]
  },
  {
    icon: Users,
    title: "SEO & Organic Growth",
    subtitle: "Long-term, scalable results",
    description: "Dominate your organic presence and stand out in Google searches.",
    bullets: [
      "Technical SEO overhaul to position your website on the first page",
      "Keyword research (enable the search on SERPs)",
      "Content strategy for organic long-term growth",
      "I.org organic visibility, traffic, and authority"
    ]
  },
  {
    icon: Palette,
    title: "Creative & Full Branding",
    subtitle: "Logo, Brand Identity, UX/UI, Website",
    description: "Stand out. Make a full spectrum user experience & branding.",
    bullets: [
      "Bring quality and imagination in your creative assets",
      "Dynamic, brand consistency, and UX-friendly website",
      "Transform your online presence into a growth-centric business",
      "Content work and customly designed photo shoot (branding)"
    ]
  }
];

export const Services = () => {
  return (
    <section id="services" className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We bring a unique blend of strategic marketing and creative services to help your brand stand out and scale effectively in today's competitive landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,214,0,0.1)] group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-primary mb-3">{service.subtitle}</p>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              
              <ul className="space-y-2">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
