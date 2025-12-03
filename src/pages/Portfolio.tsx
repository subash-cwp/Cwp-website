import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrendingUp, Users, Target, ArrowRight, Quote, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const portfolioItems = [
  {
    title: "D2C Fashion Brand Scale-Up",
    category: "E-commerce",
    description: "Helped a fashion D2C brand scale from 50K to 5M monthly revenue through strategic performance marketing and conversion optimization.",
    challenge: "The brand was struggling with low ROAS and inconsistent revenue despite significant ad spend.",
    solution: "We implemented a comprehensive strategy including audience segmentation, creative testing, and conversion rate optimization.",
    metrics: [
      { icon: TrendingUp, label: "Revenue Growth", value: "10x" },
      { icon: Users, label: "Customer Base", value: "15K+" },
      { icon: Target, label: "ROAS", value: "8.5x" }
    ],
    tags: ["Meta Ads", "Email Marketing", "CRO"],
    testimonial: "CWP transformed our business. We went from struggling to thriving in just 6 months."
  },
  {
    title: "SaaS Lead Generation",
    category: "B2B SaaS",
    description: "Generated 1000+ qualified enterprise leads for a B2B SaaS platform through multi-channel demand generation and cold outreach.",
    challenge: "The SaaS company needed to fill their sales pipeline with qualified enterprise leads.",
    solution: "We developed a multi-channel approach combining LinkedIn ads, cold email sequences, and content marketing.",
    metrics: [
      { icon: Users, label: "Qualified Leads", value: "1000+" },
      { icon: Target, label: "Conversion Rate", value: "35%" },
      { icon: TrendingUp, label: "Pipeline Value", value: "$2.5M" }
    ],
    tags: ["LinkedIn Ads", "Cold Email", "Content Marketing"],
    testimonial: "The quality of leads we received exceeded our expectations. Our sales team was finally able to focus on closing."
  },
  {
    title: "Organic SEO Dominance",
    category: "Tech Startup",
    description: "Positioned a tech startup on page 1 of Google for 50+ target keywords, driving 200K+ monthly organic traffic.",
    challenge: "Zero organic visibility in a highly competitive tech niche with strong incumbent players.",
    solution: "Comprehensive SEO overhaul including technical fixes, content strategy, and strategic link building.",
    metrics: [
      { icon: Users, label: "Monthly Traffic", value: "200K+" },
      { icon: Target, label: "Keywords Ranked", value: "50+" },
      { icon: TrendingUp, label: "Organic Leads", value: "3x" }
    ],
    tags: ["SEO", "Content Strategy", "Technical SEO"],
    testimonial: "We went from invisible to dominant in our space. The organic traffic now drives 60% of our revenue."
  },
  {
    title: "Complete Brand Transformation",
    category: "Healthcare",
    description: "Rebuilt brand identity and digital presence for a healthcare company, resulting in 5x increase in patient inquiries.",
    challenge: "Outdated brand image and poor digital presence affecting patient acquisition.",
    solution: "Full brand overhaul including new visual identity, website redesign, and targeted social media campaigns.",
    metrics: [
      { icon: Users, label: "Patient Inquiries", value: "5x" },
      { icon: Target, label: "Brand Awareness", value: "+250%" },
      { icon: TrendingUp, label: "Engagement Rate", value: "45%" }
    ],
    tags: ["Branding", "Website Design", "Social Media"],
    testimonial: "Our new brand resonates with patients. We've seen a dramatic increase in trust and inquiries."
  },
  {
    title: "E-commerce Revenue Explosion",
    category: "Consumer Goods",
    description: "Scaled a consumer goods brand from ₹10L to ₹2Cr monthly revenue through integrated marketing campaigns.",
    challenge: "Stagnant growth despite having great products and decent market fit.",
    solution: "Implemented full-funnel marketing strategy with focus on customer retention and LTV optimization.",
    metrics: [
      { icon: TrendingUp, label: "Revenue Growth", value: "20x" },
      { icon: Users, label: "Repeat Customers", value: "45%" },
      { icon: Target, label: "CAC Reduction", value: "-40%" }
    ],
    tags: ["Performance Marketing", "Email Automation", "Retention"],
    testimonial: "CWP didn't just help us grow, they helped us build a sustainable business model."
  },
  {
    title: "B2B Market Expansion",
    category: "Manufacturing",
    description: "Helped a manufacturing company enter new markets and generate ₹5Cr in new business within 12 months.",
    challenge: "Needed to expand into new geographic markets with zero existing presence or relationships.",
    solution: "Strategic content marketing, LinkedIn outreach, and partnership development strategy.",
    metrics: [
      { icon: TrendingUp, label: "New Revenue", value: "₹5Cr" },
      { icon: Users, label: "New Markets", value: "5" },
      { icon: Target, label: "Deal Size", value: "+65%" }
    ],
    tags: ["B2B Marketing", "LinkedIn", "Content Strategy"],
    testimonial: "We couldn't have entered these markets without CWP's strategic guidance and execution."
  }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...new Set(portfolioItems.map((item) => item.category))];

  const filteredItems = useMemo(() => {
    let result = portfolioItems;

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const handleContactClick = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Portfolio - Our Success Stories | CWP Marketing"
        description="Explore our portfolio of successful marketing campaigns. See how we've helped D2C, SaaS, and B2B brands achieve 10x ROAS, generate leads, and scale revenue."
        keywords="marketing portfolio, case studies, success stories, ROAS, lead generation, brand growth"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative">
          <Breadcrumbs />
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              Our Work
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Success <span className="text-gradient-primary">Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real results for real businesses. See how we've helped brands achieve exceptional growth through strategic marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container-custom">
          {/* Search */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === activeCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results count */}
          {(searchQuery || activeCategory !== "All") && (
            <p className="text-center text-muted-foreground mt-4">
              {filteredItems.length} project{filteredItems.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </section>

      {/* Portfolio Items */}
      <section className="py-20">
        <div className="container-custom">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No projects found</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredItems.map((item, index) => (
                <Card 
                  key={index}
                  className="p-8 md:p-12 bg-card border-border/50 hover:border-primary/50 transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <Badge variant="secondary" className="text-primary border-primary/30">
                        {item.category}
                      </Badge>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary-glow transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">{item.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">The Challenge</h4>
                        <p className="text-muted-foreground">{item.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Our Solution</h4>
                        <p className="text-muted-foreground">{item.solution}</p>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-background/50 rounded-lg border border-border/50">
                      {item.metrics.map((metric, i) => (
                        <div key={i} className="text-center">
                          <metric.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Testimonial */}
                    <div className="flex items-start gap-4 p-6 bg-primary/5 rounded-lg border border-primary/20">
                      <Quote className="w-8 h-8 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground italic">{item.testimonial}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/50">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Be Our Next <span className="text-gradient-primary">Success Story</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <Button size="lg" onClick={handleContactClick}>
            Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default Portfolio;
