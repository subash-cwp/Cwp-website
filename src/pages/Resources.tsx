import { FileText, Download, BookOpen, Video, Headphones } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function Resources() {
  const resources = [
    {
      type: "eBook",
      icon: BookOpen,
      title: "The Complete Digital Marketing Playbook 2025",
      description: "A comprehensive 50-page guide covering every aspect of modern digital marketing strategy.",
      format: "PDF",
      size: "8.2 MB",
      downloads: "2,431"
    },
    {
      type: "Template",
      icon: FileText,
      title: "Social Media Content Calendar Template",
      description: "Plan and organize your social media content for maximum engagement and consistency.",
      format: "Excel",
      size: "1.5 MB",
      downloads: "3,892"
    },
    {
      type: "Guide",
      icon: FileText,
      title: "SEO Checklist: 100+ Points for Perfect Optimization",
      description: "The ultimate checklist to ensure your website is fully optimized for search engines.",
      format: "PDF",
      size: "2.1 MB",
      downloads: "5,234"
    },
    {
      type: "Webinar",
      icon: Video,
      title: "Mastering Paid Advertising ROI",
      description: "60-minute recorded masterclass on optimizing your ad spend across all major platforms.",
      format: "Video",
      size: "450 MB",
      downloads: "1,567"
    },
    {
      type: "Podcast",
      icon: Headphones,
      title: "Marketing Growth Stories - Full Season 1",
      description: "12 episodes featuring interviews with marketing leaders sharing their growth strategies.",
      format: "MP3",
      size: "320 MB",
      downloads: "892"
    },
    {
      type: "Toolkit",
      icon: FileText,
      title: "Email Marketing Conversion Kit",
      description: "15+ proven email templates for welcome series, nurture campaigns, and promotions.",
      format: "ZIP",
      size: "5.4 MB",
      downloads: "2,156"
    },
    {
      type: "Report",
      icon: FileText,
      title: "2025 Digital Marketing Trends Report",
      description: "Industry analysis and predictions for the year ahead, backed by data from 1000+ businesses.",
      format: "PDF",
      size: "12.8 MB",
      downloads: "4,671"
    },
    {
      type: "Worksheet",
      icon: FileText,
      title: "Marketing Budget Calculator & Planner",
      description: "Calculate optimal marketing spend allocation across channels based on your goals and industry.",
      format: "Excel",
      size: "2.3 MB",
      downloads: "1,982"
    }
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources" }
  ];

  const handleDownload = (title: string) => {
    alert(`Downloading: ${title}\n\nNote: This is a demo. In production, the file would download.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <BackToTop />
      
      <SEOHead 
        title="Free Marketing Resources"
        description="Download free marketing guides, templates, and tools to accelerate your business growth. Expert resources 100% free."
        keywords="marketing resources, free marketing templates, digital marketing guides"
      />

      {/* Hero Section */}
      <section className="section-spacing pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              Free Marketing Resources
            </h1>
            <p className="text-xl text-muted-foreground">
              Download our expert guides, templates, and tools to accelerate your marketing success. All 100% free.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-full">
                    {resource.type}
                  </span>
                </div>

                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {resource.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{resource.format} • {resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>

                <Button 
                  onClick={() => handleDownload(resource.title)}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Free
                </Button>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 text-center p-12 bg-gradient-to-r from-primary via-primary to-accent rounded-2xl text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want More Free Resources?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and get new guides, templates, and exclusive content every week.
            </p>
            <Button size="lg" variant="secondary" onClick={() => window.location.href = '/#contact'}>
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}