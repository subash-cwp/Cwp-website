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
  const detail = getServiceDetail(service.slug);

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
    ...(detail
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.title} deliverables`,
            itemListElement: detail.deliverables.map((d) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: d.title, description: d.description },
            })),
          },
        }
      : {}),
  };

  const faqJsonLd = detail
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: detail.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;


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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {service.description}
            </p>
            {detail && (
              <p className="text-muted-foreground leading-relaxed mb-8">{detail.intro}</p>
            )}

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


      {detail && (
        <>
          {/* Outcomes */}
          <section className="py-10 border-y border-border/50 bg-card/30">
            <div className="container-custom grid sm:grid-cols-3 gap-6">
              {detail.outcomes.map((o, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">
                    {o.metric}
                  </div>
                  <p className="text-sm text-muted-foreground">{o.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Who it's for */}
          <section className="py-16">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Who this {service.title} service is for
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {detail.whoItsFor.map((w, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-5 bg-card border border-border/50 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{w}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Deliverables */}
          <section className="py-16 bg-card/30">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">What you get</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl">
                Every {service.title.toLowerCase()} engagement includes these deliverables, scoped to
                your stage and goals.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {detail.deliverables.map((d, i) => (
                  <Card key={i} className="p-6 bg-card border-border/50">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <h3 className="font-bold text-lg">{d.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{d.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="py-16">
            <div className="container-custom">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">How we deliver it</h2>
              <ol className="relative border-l border-border/60 ml-3 space-y-8">
                {detail.process.map((p, i) => (
                  <li key={i} className="pl-8">
                    <span className="absolute -left-4 w-8 h-8 rounded-full bg-primary/15 text-primary border border-primary/30 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                    <p className="text-muted-foreground">{p.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Tools */}
          <section className="py-12 bg-card/30">
            <div className="container-custom">
              <h2 className="text-xl md:text-2xl font-bold mb-6">Tools and platforms we use</h2>
              <div className="flex flex-wrap gap-3">
                {detail.tools.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-full border border-border/60 bg-background/60 text-sm text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16">
            <div className="container-custom max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {service.title} FAQs
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {detail.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-card/30 border-y border-border/50">
            <div className="container-custom text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to grow with {service.title}?
              </h2>
              <p className="text-muted-foreground mb-8">
                Book a free consultation and we will walk you through exactly what we would do for
                your brand in the first 90 days.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" onClick={() => navigate("/contact")}>
                  Book a Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/enquiry")}>
                  Get a Proposal
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

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
