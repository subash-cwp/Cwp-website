import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Target, Megaphone, LineChart, TrendingUp, Users, Palette, FileText, Share2, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { servicesData } from "@/data/services";

const slugify = (title: string) => {
  const match = servicesData.find(
    (s) => s.title.toLowerCase() === title.toLowerCase()
  );
  if (match) return match.slug;
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Icon mapping for database services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Megaphone,
  LineChart,
  TrendingUp,
  Users,
  Palette,
  FileText,
  Share2,
};

// Fallback services data
const fallbackServices = [
  {
    id: "1",
    icon: "Target",
    title: "Strategy & Planning",
    description: "Make your D2C Brand a strategic powerhouse by providing growth. Build a data' based strategy that gets you exactly where you want to be.",
    features: ["Market Analysis", "Competitor Research", "Growth Roadmap", "KPI Framework"]
  },
  {
    id: "2",
    icon: "Megaphone",
    title: "CRM & Marketing Automation",
    description: "Generate more qualified leads with the most optimized conversion. Complete email marketing setup and automation workflows.",
    features: ["Email Campaigns", "SMS Marketing", "Automation Flows", "Segmentation"]
  },
  {
    id: "3",
    icon: "LineChart",
    title: "Outreach & Demand Generation",
    description: "Generate more qualified leads through targeted outreach. Multichannel strategy to power up lead generation.",
    features: ["Cold Outreach", "LinkedIn Automation", "Lead Nurturing", "Pipeline Building"]
  },
  {
    id: "4",
    icon: "TrendingUp",
    title: "Performance Marketing",
    description: "Make your ad investment work for you. 10x your brand with comprehensive ad strategies.",
    features: ["Meta Ads", "Google Ads", "Retargeting", "Analytics"]
  },
  {
    id: "5",
    icon: "Users",
    title: "SEO & Organic Growth",
    description: "Dominate your organic presence and stand out in Google searches with technical SEO and content strategy.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"]
  },
  {
    id: "6",
    icon: "Palette",
    title: "Creative & Full Branding",
    description: "Stand out with full spectrum user experience & branding. Transform your online presence into a growth' centric business.",
    features: ["Brand Identity", "Logo Design", "Website Design", "UI/UX"]
  },
  {
    id: "7",
    icon: "FileText",
    title: "Content Marketing & Thought Leadership",
    description: "Establish authority and drive organic growth through strategic content and thought leadership.",
    features: ["Blog Writing", "Whitepapers", "Case Studies", "Newsletters"]
  },
  {
    id: "8",
    icon: "Share2",
    title: "Social Media Management",
    description: "Build a strong social presence that engages and converts with monthly content calendars and community management.",
    features: ["Content Calendar", "Community Management", "Influencer Marketing", "Analytics"]
  }
];

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
}

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, title, description, icon, features")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        setServices(fallbackServices);
      } else {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const handleContactClick = () => {
    navigate("/#contact");
  };

  const getIcon = (iconName: string | null) => {
    if (!iconName) return Target;
    return iconMap[iconName] || Target;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Marketing Services — CWP Full-Stack Growth Solutions"
        description="Performance marketing, SEO, content, social, CRM automation, and creative branding services for ambitious D2C, SaaS, and B2B brands."
        keywords="marketing services, performance marketing, SEO services, content marketing, social media management, brand identity"
        canonicalUrl="https://consultwithprofessionals.com/services"
      />
      <JsonLd
        schema={{
          type: "Raw",
          id: "services-itemlist",
          data: {
            "@type": "ItemList",
            name: "CWP Marketing Services",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: s.title,
                description: s.description,
                provider: { "@type": "Organization", name: "CWP Marketing" },
                url: `https://consultwithprofessionals.com/services/${slugify(s.title)}`,
              },
            })),
          },
        }}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-neon-cyan/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative">
          <Breadcrumbs />
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Full' Stack <span className="text-gradient-primary">Growth Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We bring a unique blend of strategic marketing and creative services to help your brand stand out and scale effectively in today's competitive landscape.
            </p>
            <Button size="lg" onClick={handleContactClick}>
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-16">
              {services.map((service, index) => {
                const IconComponent = getIcon(service.icon);
                return (
                  <Card 
                    key={service.id}
                    className="p-8 md:p-12 bg-card border-border/50 hover:border-primary/50 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-start">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary-glow transition-colors">{service.title}</h2>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-6 text-lg">{service.description}</p>
                      </div>
                      
                      <div className="lg:pl-8">
                        {service.features && service.features.length > 0 && (
                          <>
                            <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">What's Included</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {service.features.map((feature, i) => (
                                <div 
                                  key={i}
                                  className="px-4 py-3 bg-background/50 border border-border/50 rounded-lg text-sm text-center hover:border-primary/50 transition-colors"
                                >
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        <Button variant="outline" className="mt-6 w-full" asChild>
                          <Link to={`/services/${slugify(service.title)}`} aria-label={`View ${service.title} details`}>
                            View {service.title} details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/50">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="text-gradient-primary">Transform</span> Your Brand?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's discuss how we can help you achieve your growth goals with our comprehensive marketing solutions.
          </p>
          <Button size="lg" onClick={handleContactClick}>
            Schedule a Consultation <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default Services;
