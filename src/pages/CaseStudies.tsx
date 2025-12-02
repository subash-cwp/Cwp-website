import { TrendingUp, Users, DollarSign, Target, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LazyImage } from "@/components/LazyImage";
import { Link } from "react-router-dom";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      company: "TechFlow SaaS",
      industry: "B2B Software",
      challenge: "Low website traffic and minimal qualified lead generation",
      solution: "Implemented comprehensive SEO strategy, content marketing, and lead nurturing campaigns",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      metrics: [
        { icon: TrendingUp, label: "Organic Traffic", value: "+425%" },
        { icon: Users, label: "Qualified Leads", value: "+580/month" },
        { icon: DollarSign, label: "Revenue Growth", value: "+340%" },
        { icon: Target, label: "Conversion Rate", value: "8.3%" }
      ],
      tags: ["SEO", "Content Marketing", "Lead Generation"],
      duration: "6 months"
    },
    {
      id: 2,
      company: "Urban Eats",
      industry: "Food & Beverage",
      challenge: "Low social media engagement and brand awareness in competitive market",
      solution: "Developed viral social media campaigns, influencer partnerships, and user-generated content strategy",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      metrics: [
        { icon: Users, label: "Social Followers", value: "+125K" },
        { icon: TrendingUp, label: "Engagement Rate", value: "+780%" },
        { icon: DollarSign, label: "Online Orders", value: "+290%" },
        { icon: Target, label: "Brand Mentions", value: "+1.2K/month" }
      ],
      tags: ["Social Media", "Influencer Marketing", "Content Creation"],
      duration: "4 months"
    },
    {
      id: 3,
      company: "FinSecure",
      industry: "FinTech",
      challenge: "High customer acquisition costs and low email engagement",
      solution: "Optimized paid advertising campaigns and implemented marketing automation",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      metrics: [
        { icon: DollarSign, label: "CAC Reduction", value: "-68%" },
        { icon: Users, label: "Email Open Rate", value: "42%" },
        { icon: TrendingUp, label: "ROI Increase", value: "+450%" },
        { icon: Target, label: "Conversion Rate", value: "11.2%" }
      ],
      tags: ["Paid Ads", "Email Marketing", "Marketing Automation"],
      duration: "5 months"
    },
    {
      id: 4,
      company: "GreenHome",
      industry: "Sustainability",
      challenge: "Limited online presence and difficulty reaching target audience",
      solution: "Built SEO-optimized website, implemented content strategy, and launched Google Ads campaigns",
      image: "https://images.unsplash.com/photo-1472152083436-a6eede6efad9?w=800&q=80",
      metrics: [
        { icon: TrendingUp, label: "Website Traffic", value: "+620%" },
        { icon: Users, label: "Lead Volume", value: "+410/month" },
        { icon: DollarSign, label: "Sales Growth", value: "+285%" },
        { icon: Target, label: "Market Share", value: "+15%" }
      ],
      tags: ["SEO", "Paid Ads", "Web Development"],
      duration: "8 months"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Case Studies - Marketing Success Stories | CWP"
        description="Explore our detailed case studies showcasing real results. See how we helped businesses achieve 400%+ traffic growth, generate leads, and increase revenue."
        keywords="marketing case studies, success stories, SEO results, lead generation, revenue growth"
      />
      <Navbar />
      <WhatsAppButton />
      <BackToTop />

      {/* Hero Section */}
      <section className="section-spacing pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              Real Results, Real Growth
            </h1>
            <p className="text-xl text-muted-foreground">
              See how we've helped businesses across industries achieve remarkable growth through data-driven marketing strategies.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <Card key={study.id} className="overflow-hidden">
                <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  <div className={`aspect-[4/3] ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <LazyImage 
                      src={study.image} 
                      alt={study.company}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-semibold text-muted-foreground">{study.industry}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{study.duration} project</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{study.company}</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-2">Challenge</h3>
                        <p className="text-foreground">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-muted-foreground mb-2">Solution</h3>
                        <p className="text-foreground">{study.solution}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center p-4 bg-muted/30 rounded-lg">
                          <metric.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                          <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button asChild className="w-full md:w-auto">
                      <Link to={`/case-studies/${study.id}`}>
                        View Full Case Study <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center p-12 bg-gradient-to-r from-primary via-primary to-accent rounded-2xl text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Let's discuss how we can achieve similar results for your business.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="/#contact">Get Your Free Strategy Session</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
