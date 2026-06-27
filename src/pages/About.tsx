import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Target, Eye, Heart, Award, Users, Zap, Globe, TrendingUp } from "lucide-react";
import teamNaren from "@/assets/team-naren.png";
import { useSection } from "@/hooks/usePageContent";

const values = [
  {
    icon: Target,
    title: "Results' Driven",
    description: "Every strategy we build is focused on measurable outcomes and real business growth."
  },
  {
    icon: Heart,
    title: "Client' Centric",
    description: "Your success is our success. We treat every client's business like our own."
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We stay ahead of trends and leverage cutting' edge tools to give you a competitive edge."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as an extension of your team, ensuring seamless communication and alignment."
  }
];

const stats = [
  { value: "50+", label: "Brands Transformed" },
  { value: "10x", label: "Average ROAS" },
  { value: "95%", label: "Client Retention" },
  { value: "₹50Cr+", label: "Revenue Generated" }
];

const About = () => {
  const hero = useSection<{ badge: string; headingHtml: string; subheading: string }>(
    "about",
    "hero",
    {
      badge: "About Us",
      headingHtml: 'We Help Brands <span class="text-gradient-primary">Scale & Thrive</span>',
      subheading:
        "CWP is a full-stack growth partner for D2C, SaaS, and B2B brands. We combine strategic marketing expertise with creative excellence to deliver exceptional results.",
    },
  );
  const story = useSection<{ headingHtml: string; paragraphs: string[]; quote: string; founderName: string; founderRole: string }>(
    "about",
    "story",
    {
      headingHtml: 'Our <span class="text-gradient-primary">Story</span>',
      paragraphs: [
        "Founded with a vision to bridge the gap between creative marketing and measurable growth, CWP has evolved into a trusted growth partner for businesses across industries.",
        "We started with a simple belief: every brand deserves access to world' class marketing strategies that deliver real results. Today, we've helped 100+ brands generate over ₹50 Crores in revenue.",
        "Our team of strategists, creatives, and growth experts work together to create comprehensive marketing solutions that drive sustainable business growth.",
      ],
      quote:
        "Our mission is simple: help brands unlock their true potential through strategic, data' driven marketing that delivers measurable results.",
      founderName: "Naren",
      founderRole: "Founder & CEO",
    },
  );
  const mission = useSection<{ mission: string; vision: string }>("about", "mission_vision", {
    mission:
      "To empower businesses with strategic marketing solutions that drive sustainable growth, increase brand visibility, and deliver exceptional ROI through data' driven methodologies.",
    vision:
      "To become the most trusted growth partner for ambitious brands, known for our innovative strategies, creative excellence, and unwavering commitment to client success.",
  });
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="About CWP Marketing — Our Story, Mission & Values"
        description="Learn about CWP Marketing — a full-stack growth partner for D2C, SaaS, and B2B brands. Discover our mission, values, and team."
        keywords="about CWP, marketing agency story, growth partner, brand transformation, marketing team"
        canonicalUrl="https://consultwithprofessionals.com/about"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative">
          <Breadcrumbs />
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
              {hero.badge}
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              dangerouslySetInnerHTML={{ __html: hero.headingHtml }}
            />
            <p className="text-xl text-muted-foreground mb-8">{hero.subheading}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                dangerouslySetInnerHTML={{ __html: story.headingHtml }}
              />
              {story.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground mb-4 last:mb-0">{p}</p>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <Card className="relative p-8 bg-card border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <img src={teamNaren} alt={`${story.founderName}, ${story.founderRole} of CWP Marketing`} className="w-20 h-20 rounded-full object-cover" />
                  <div>
                    <h3 className="text-xl font-bold">{story.founderName}</h3>
                    <p className="text-primary">{story.founderRole}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{story.quote}"</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-card/50">
        <div className="container-custom">
          <h2 className="sr-only">Mission and Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-background border-border/50 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">{mission.mission}</p>
            </Card>
            <Card className="p-8 bg-background border-border/50 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">{mission.vision}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient-primary">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape how we work with our clients.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all group text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-gradient-primary">Choose Us</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Track Record</h3>
              <p className="text-muted-foreground">50+ successful brand transformations with measurable results</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full' Stack Expertise</h3>
              <p className="text-muted-foreground">From strategy to execution, we handle every aspect of your growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Data' Driven Results</h3>
              <p className="text-muted-foreground">Every decision backed by analytics and performance data</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default About;