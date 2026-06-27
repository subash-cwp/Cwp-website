import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Pricing() {
  const { settings } = useSiteSettings();
  const plans = [
    {
      name: "Starter",
      price: "$2,500",
      period: "/month",
      description: "Perfect for small businesses looking to establish their digital presence",
      features: [
        "Social Media Management (2 platforms)",
        "Content Creation (8 posts/month)",
        "Basic SEO Optimization",
        "Monthly Performance Report",
        "Email Support",
        "Brand Guidelines Setup"
      ],
      popular: false
    },
    {
      name: "Growth",
      price: "$5,500",
      period: "/month",
      description: "Ideal for growing businesses ready to scale their marketing efforts",
      features: [
        "Social Media Management (4 platforms)",
        "Content Creation (16 posts/month)",
        "Advanced SEO & Content Marketing",
        "Paid Advertising Management ($2k ad spend)",
        "Bi' weekly Performance Reports",
        "Email & Phone Support",
        "A/B Testing & Optimization",
        "Lead Generation Campaigns",
        "Dedicated Account Manager"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Comprehensive solutions for established businesses seeking maximum growth",
      features: [
        "Full' Stack Marketing Management",
        "Unlimited Content Creation",
        "Enterprise SEO Strategy",
        "Multi' Channel Paid Advertising",
        "Weekly Strategy Meetings",
        "24/7 Priority Support",
        "Advanced Analytics & BI",
        "Marketing Automation",
        "Custom CRM Integration",
        "Dedicated Marketing Team",
        "Quarterly Strategy Reviews"
      ],
      popular: false
    }
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pricing" }
  ];

  const handleBookCall = () => {
    const calendlyLink = settings.integrations.calendlyLink || "https://calendly.com/narenethiraj";
    window.open(calendlyLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <BackToTop />
      
      <SEOHead 
        title="Pricing - Marketing Plans"
        description="Choose the perfect marketing plan for your business. Transparent pricing with proven strategies and dedicated support."
        keywords="marketing pricing, digital marketing plans, marketing packages"
      />

      {/* Hero Section */}
      <section className="section-spacing pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your business growth. All plans include our proven strategies and dedicated support.
            </p>
          </div>

          {/* Pricing Cards */}
          <h2 className="sr-only">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`p-8 relative ${plan.popular ? 'border-primary border-2 shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={handleBookCall}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </Card>
            ))}
          </div>

          {/* FAQ Note */}
          <div className="text-center mt-16 p-8 bg-muted/30 rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Not sure which plan is right for you?</h2>
            <p className="text-muted-foreground mb-6">
              Book a free strategy call and we'll help you choose the perfect package for your business goals and budget.
            </p>
            <Button size="lg" onClick={handleBookCall}>
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}