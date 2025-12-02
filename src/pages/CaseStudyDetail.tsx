import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TrendingUp, Users, DollarSign, Target, ArrowLeft, Quote, Calendar, Building, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { supabase } from "@/integrations/supabase/client";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  industry: string | null;
  description: string | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  cover_image: string | null;
  testimonial: string | null;
  testimonial_author: string | null;
  technologies: string[] | null;
  metrics: unknown;
  created_at: string | null;
}

interface Metric {
  label: string;
  value: string;
  icon?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Users,
  DollarSign,
  Target
};

export default function CaseStudyDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [relatedStudies, setRelatedStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      // Try to find by slug first, then by id
      let query = supabase
        .from("case_studies")
        .select("*")
        .eq("published", true);

      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id || '');
      
      if (isUUID) {
        query = query.eq("id", id);
      } else {
        query = query.eq("slug", id);
      }

      const { data, error } = await query.maybeSingle();
      
      if (error || !data) {
        setStudy(null);
      } else {
        // Parse metrics if it's a string
        const parsedData = {
          ...data,
          metrics: typeof data.metrics === 'string' ? JSON.parse(data.metrics) : data.metrics
        };
        setStudy(parsedData);
        
        // Fetch related case studies
        const { data: related } = await supabase
          .from("case_studies")
          .select("*")
          .eq("published", true)
          .neq("id", data.id)
          .limit(2);
        
        setRelatedStudies(related || []);
      }
      setLoading(false);
    };

    fetchCaseStudy();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-custom py-32 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <SEOHead 
          title="Case Study Not Found"
          description="The case study you're looking for doesn't exist."
        />
        <div className="container-custom py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground mb-8">The case study you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/case-studies">Back to Case Studies</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: study.client || study.title }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <BackToTop />
      
      <SEOHead 
        title={`${study.client || study.title} - Case Study`}
        description={study.description || `See how we helped ${study.client} achieve remarkable results`}
        keywords={study.technologies?.join(", ")}
      />
      
      <JsonLd 
        schema={{
          type: "Article",
          headline: `${study.client || study.title} Case Study`,
          description: study.description || "",
          image: study.cover_image || undefined,
          author: "CWP Team",
          datePublished: study.created_at || new Date().toISOString()
        }}
      />

      <article className="section-spacing pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          
          {/* Back Button */}
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          {/* Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {study.industry && (
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{study.industry}</span>
                </div>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{study.client || study.title}</h1>
            {study.description && <p className="text-xl text-muted-foreground mb-6">{study.description}</p>}

            {study.technologies && study.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((tag, idx) => (
                  <span key={idx} className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {study.cover_image && (
            <div className="max-w-5xl mx-auto mb-12">
              <img 
                src={study.cover_image} 
                alt={study.client || study.title}
                className="w-full aspect-video object-cover rounded-2xl"
              />
            </div>
          )}

          {/* Key Metrics */}
          {study.metrics && Array.isArray(study.metrics) && (study.metrics as Metric[]).length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Key Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(study.metrics as Metric[]).map((metric, idx) => {
                  const IconComponent = iconMap[metric.icon || "TrendingUp"] || TrendingUp;
                  return (
                    <Card key={idx} className="p-6 text-center">
                      <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Challenge Section */}
          {study.challenge && (
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {study.challenge}
              </p>
            </div>
          )}

          {/* Solution Section */}
          {study.solution && (
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {study.solution}
              </p>
            </div>
          )}

          {/* Results Section */}
          {study.results && (
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-4">The Results</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {study.results}
              </p>
            </div>
          )}

          {/* Testimonial */}
          {study.testimonial && (
            <div className="max-w-3xl mx-auto mb-16">
              <Card className="p-8 bg-primary/5 border-primary/20">
                <Quote className="w-10 h-10 text-primary mb-4" />
                <p className="text-xl italic mb-6 text-foreground">
                  "{study.testimonial}"
                </p>
                {study.testimonial_author && (
                  <div>
                    <p className="font-semibold">{study.testimonial_author}</p>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Related Case Studies */}
          {relatedStudies.length > 0 && (
            <section className="mt-20 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">More Success Stories</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedStudies.map((relatedStudy) => (
                  <Card key={relatedStudy.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <Link to={`/case-studies/${relatedStudy.slug}`}>
                      {relatedStudy.cover_image && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={relatedStudy.cover_image} 
                            alt={relatedStudy.client || relatedStudy.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          {relatedStudy.industry && (
                            <span className="text-sm font-semibold text-muted-foreground">{relatedStudy.industry}</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {relatedStudy.client || relatedStudy.title}
                        </h3>
                        {relatedStudy.description && (
                          <p className="text-muted-foreground line-clamp-2">{relatedStudy.description}</p>
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-16 text-center p-12 bg-gradient-to-r from-primary via-primary to-accent rounded-2xl text-primary-foreground max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Be Our Next Success Story?</h3>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Let's discuss how we can achieve similar results for your business.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/#contact">Start Your Growth Journey</Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}