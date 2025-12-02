import { Briefcase, MapPin, Clock, ArrowRight, Heart, TrendingUp, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Digital Marketing Strategist",
      department: "Strategy",
      location: "Remote / Hybrid",
      type: "Full-time",
      description: "Lead comprehensive digital marketing strategies for our top-tier clients across multiple industries.",
      requirements: ["5+ years in digital marketing", "Proven track record of successful campaigns", "Strong analytical skills"]
    },
    {
      title: "Social Media Manager",
      department: "Social Media",
      location: "Remote",
      type: "Full-time",
      description: "Create and manage engaging social media campaigns that drive brand awareness and conversions.",
      requirements: ["3+ years social media experience", "Content creation skills", "Platform expertise (Meta, LinkedIn, TikTok)"]
    },
    {
      title: "SEO Specialist",
      department: "SEO",
      location: "On-site",
      type: "Full-time",
      description: "Optimize websites and content to achieve top rankings and drive organic traffic growth.",
      requirements: ["2+ years SEO experience", "Technical SEO knowledge", "Analytics proficiency"]
    },
    {
      title: "Content Writer",
      department: "Content",
      location: "Remote",
      type: "Full-time / Contract",
      description: "Craft compelling content that educates, engages, and converts across various formats and industries.",
      requirements: ["Excellent writing skills", "B2B/B2C experience", "SEO knowledge preferred"]
    },
    {
      title: "Paid Ads Specialist",
      department: "Performance Marketing",
      location: "Hybrid",
      type: "Full-time",
      description: "Manage and optimize paid advertising campaigns across Google, Meta, and LinkedIn platforms.",
      requirements: ["Google Ads & Meta Ads certified", "3+ years experience", "Strong analytical mindset"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible hours, remote work options, and generous PTO"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Continuous learning budget and clear advancement paths"
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Collaborative culture with talented, passionate people"
    },
    {
      icon: Zap,
      title: "Competitive Package",
      description: "Top market salary, health benefits, and performance bonuses"
    }
  ];

  const handleApply = (position: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in applying for the ${position} position.`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <BackToTop />

      {/* Hero Section */}
      <section className="section-spacing pt-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
              Join Our Growing Team
            </h1>
            <p className="text-xl text-muted-foreground">
              Help us revolutionize digital marketing for businesses worldwide. Work with cutting-edge strategies, amazing clients, and a passionate team.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {openPositions.map((position, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{position.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{position.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => handleApply(position.title)}>
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-4">{position.description}</p>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {position.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and let's talk about how you can contribute to our team.
            </p>
            <Button size="lg" onClick={() => handleApply("General Application")}>
              Send Your Resume
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
