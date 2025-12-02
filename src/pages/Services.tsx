import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Megaphone, LineChart, TrendingUp, Users, Palette, FileText, Share2, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Target,
    title: "Strategy & Planning",
    subtitle: "Market research, CRO, Paid Ads consultation, Email flow audit",
    description: "Make your D2C Brand a strategic powerhouse by providing growth",
    bullets: [
      "Build a data-based strategy that gets you exactly where you want to be",
      "Enhance UX & conversion optimization",
      "Break down your objectives into a simplified, actionable road map"
    ],
    features: ["Market Analysis", "Competitor Research", "Growth Roadmap", "KPI Framework"]
  },
  {
    icon: Megaphone,
    title: "CRM & Marketing Automation",
    subtitle: "Email & SMS",
    description: "Generate more qualified leads with the most optimized conversion",
    bullets: [
      "Complete email marketing setup (2-3 templates)",
      "Email and SMS marketing audit",
      "Implement email & SMS segmentation",
      "Devise Email/SMS automation & workflows"
    ],
    features: ["Email Campaigns", "SMS Marketing", "Automation Flows", "Segmentation"]
  },
  {
    icon: LineChart,
    title: "Outreach & Demand Generation",
    subtitle: "Paid Ads, B2B, & Cold Email",
    description: "Generate more qualified leads with the most optimized conversion",
    bullets: [
      "Increase your conversion rate by 30%",
      "Generate sales leads through targeted cold emails",
      "Multichannel strategy to power up lead generation",
      "Build opportunity"
    ],
    features: ["Cold Outreach", "LinkedIn Automation", "Lead Nurturing", "Pipeline Building"]
  },
  {
    icon: TrendingUp,
    title: "Performance Marketing",
    subtitle: "Meta Ads, Google, Retargeting, LinkedIn Ads",
    description: "Make your ad investment work for you. 10x your brand with our guidance",
    bullets: [
      "Increase your brand ROAS by 10x",
      "Comprehensive ad strategies from landing page design to ad copies",
      "Optimize campaigns and ad budgets",
      "Hyper retargeting, lead ads and look-a-like ads"
    ],
    features: ["Meta Ads", "Google Ads", "Retargeting", "Analytics"]
  },
  {
    icon: Users,
    title: "SEO & Organic Growth",
    subtitle: "Long-term, scalable results",
    description: "Dominate your organic presence and stand out in Google searches",
    bullets: [
      "Technical SEO overhaul to position your website on the first page",
      "Keyword research (enable the search on SERPs)",
      "Content strategy for organic long-term growth",
      "Improve organic visibility, traffic, and authority"
    ],
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"]
  },
  {
    icon: Palette,
    title: "Creative & Full Branding",
    subtitle: "Logo, Brand Identity, UX/UI, Website",
    description: "Stand out. Make a full spectrum user experience & branding",
    bullets: [
      "Bring quality and imagination in your creative assets",
      "Dynamic, brand consistency, and UX-friendly website",
      "Transform your online presence into a growth-centric business",
      "Content work and customly designed photo shoot (branding)"
    ],
    features: ["Brand Identity", "Logo Design", "Website Design", "UI/UX"]
  },
  {
    icon: FileText,
    title: "Content Marketing & Thought Leadership",
    subtitle: "Blogs, whitepapers, case studies tailored to buyer journey",
    description: "Establish authority and drive organic growth through strategic content",
    bullets: [
      "Drip campaigns, newsletters, long-form content, and lead magnets",
      "Thought leadership content to establish founders and leaders as industry authorities"
    ],
    features: ["Blog Writing", "Whitepapers", "Case Studies", "Newsletters"]
  },
  {
    icon: Share2,
    title: "Social Media Management & Branding",
    subtitle: "Monthly content calendars, designs, and community management",
    description: "Build a strong social presence that engages and converts",
    bullets: [
      "Follower growth, engagement campaigns, reels, stories, and posts",
      "Performance tracking and analytics for social growth",
      "Influencer collaborations to boost credibility and reach"
    ],
    features: ["Content Calendar", "Community Management", "Influencer Marketing", "Analytics"]
  }
];

const Services = () => {
  const handleContactClick = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-neon-cyan/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Full-Stack <span className="text-gradient-primary">Growth Solutions</span>
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
          <div className="space-y-16">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="p-8 md:p-12 bg-card border-border/50 hover:border-primary/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary-glow transition-colors">{service.title}</h2>
                        <p className="text-primary text-sm">{service.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 text-lg">{service.description}</p>
                    
                    <ul className="space-y-3">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="lg:pl-8">
                    <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">What's Included</h4>
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
                    <Button variant="outline" className="mt-6 w-full" onClick={handleContactClick}>
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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