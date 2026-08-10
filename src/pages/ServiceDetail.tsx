import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Target,
  Megaphone,
  LineChart,
  TrendingUp,
  Users,
  Palette,
  FileText,
  Share2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { servicesData, getServiceBySlug, type ServiceItem } from "@/data/services";
import { getServiceDetail } from "@/data/serviceDetails";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceItem | undefined>(() =>
    slug ? getServiceBySlug(slug) : undefined
  );

  useEffect(() => {
    setService(slug ? getServiceBySlug(slug) : undefined);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold mb-4">Service not found</h1>
            <p className="text-muted-foreground mb-8">
              The service you're looking for doesn't exist or has moved.
            </p>
            <Button asChild>
              <Link to="/services">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Services
              </Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Target;
  const canonical = `https://consultwithprofessionals.com/services/${service.slug}`;
  const related = servicesData.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: canonical,
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: "CWP Marketing",
      url: "https://consultwithprofessionals.com",
    },
    areaServed: "Global",
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={service.keywords}
        canonicalUrl={canonical}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-neon-cyan/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <Breadcrumbs />
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              CWP Services
            </Badge>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">
                <span className="text-gradient-primary">{service.title}</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => navigate("/contact")}>
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">
                  <ArrowLeft className="mr-2 w-4 h-4" /> All Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container-custom grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {service.description}
            </p>

            <h3 className="text-xl font-bold mb-4">Key Benefits</h3>
            <ul className="space-y-3 mb-10">
              {service.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-4">
            <Card className="p-6 bg-card border-border/50">
              <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                What's Included
              </h4>
              <div className="space-y-2">
                {service.features.map((f, i) => (
                  <div
                    key={i}
                    className="px-4 py-3 bg-background/50 border border-border/50 rounded-lg text-sm"
                  >
                    {f}
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6" onClick={() => navigate("/contact")}>
                Talk to an Expert
              </Button>
            </Card>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-card/40">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((s) => {
              const RIcon = iconMap[s.icon] || Target;
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group block p-6 bg-card border border-border/50 rounded-xl hover:border-primary/50 transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <RIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{s.shortDescription}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default ServiceDetail;
