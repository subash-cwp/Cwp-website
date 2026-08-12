import { useEffect, useState } from "react";
import { Target, Megaphone, LineChart, TrendingUp, Users, Palette, FileText, Share2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { withSalesServices } from "@/data/services";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Megaphone,
  LineChart,
  TrendingUp,
  Users,
  Palette,
  FileText,
  Share2
};

// Fallback services
const fallbackServices = [
  {
    id: "1",
    icon: "Target",
    title: "Strategy & Planning",
    description: "Make your D2C Brand a strategic powerhouse by providing growth",
    features: [
      "Build a data' based strategy that gets you exactly where you want to be",
      "Enhance UX & conversion optimization",
      "Break down your objectives into a simplified, actionable road map"
    ]
  },
  {
    id: "2",
    icon: "Megaphone",
    title: "CRM & Marketing Automation",
    description: "Generate more qualified leads with the most optimized conversion",
    features: [
      "Complete email marketing setup (2-3 templates)",
      "Email and SMS marketing audit",
      "Implement email & SMS segmentation",
      "Devise Email/SMS automation & workflows"
    ]
  },
  {
    id: "3",
    icon: "LineChart",
    title: "Outreach & Demand Generation",
    description: "Generate more qualified leads with the most optimized conversion",
    features: [
      "Increase your conversion rate by 30%",
      "Generate sales leads through targeted cold emails",
      "Multichannel strategy to power up lead generation"
    ]
  },
  {
    id: "4",
    icon: "TrendingUp",
    title: "Performance Marketing",
    description: "Make your ad investment work for you. 10x your brand with our guidance",
    features: [
      "Increase your brand ROAS by 10x",
      "Comprehensive ad strategies from landing page design to ad copies",
      "Optimize campaigns and ad budgets"
    ]
  },
  {
    id: "5",
    icon: "Users",
    title: "SEO & Organic Growth",
    description: "Dominate your organic presence and stand out in Google searches",
    features: [
      "Technical SEO overhaul to position your website on the first page",
      "Keyword research (enable the search on SERPs)",
      "Content strategy for organic long' term growth"
    ]
  },
  {
    id: "6",
    icon: "Palette",
    title: "Creative & Full Branding",
    description: "Stand out. Make a full spectrum user experience & branding",
    features: [
      "Bring quality and imagination in your creative assets",
      "Dynamic, brand consistency, and UX' friendly website",
      "Transform your online presence into a growth' centric business"
    ]
  },
  {
    id: "7",
    icon: "FileText",
    title: "Content Marketing & Thought Leadership",
    description: "Establish authority with strategic content",
    features: [
      "Drip campaigns, newsletters, long' form content, and lead magnets",
      "Thought leadership content to establish founders as industry authorities"
    ]
  },
  {
    id: "8",
    icon: "Share2",
    title: "Social Media Management & Branding",
    description: "Monthly content calendars, designs, and community management",
    features: [
      "Follower growth, engagement campaigns, reels, stories, and posts",
      "Performance tracking and analytics for social growth",
      "Influencer collaborations to boost credibility and reach"
    ]
  }
];

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      
      const base = error || !data || data.length === 0 ? fallbackServices : data;
      setServices(withSalesServices(base) as Service[]);
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="section-spacing relative overflow-hidden">
        <div className="container-custom flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section-spacing relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-neon-cyan/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient-primary relative">
              Services
              <span className="absolute -inset-2 bg-primary/10 blur-2xl -z-10" />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We bring a unique blend of strategic marketing and creative services to help your brand stand out and scale effectively in today's competitive landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon || "Target"] || Target;
            return (
              <Card
                key={service.id}
                className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-500 group relative overflow-hidden hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-primary via-neon-cyan to-primary bg-[length:200%_100%] animate-border-spin" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1px' }} />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-glow transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2 group-hover:text-muted-foreground/90 transition-colors">
                          <span className="text-primary mt-1 group-hover:scale-125 transition-transform inline-block">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};