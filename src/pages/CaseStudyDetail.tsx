import { useParams, Link } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Target, ArrowLeft, CheckCircle, Quote, Calendar, Building } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";

const caseStudiesData = [
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
    duration: "6 months",
    overview: "TechFlow SaaS is a B2B software company that provides project management solutions for enterprise clients. Despite having a superior product, they struggled to gain visibility in a competitive market dominated by established players.",
    challengeDetail: "When TechFlow approached us, they were facing multiple challenges: their website was barely ranking for any meaningful keywords, organic traffic had stagnated at around 5,000 monthly visitors, and they were generating fewer than 50 leads per month—most of which weren't qualified. Their cost per acquisition was unsustainably high, eating into their margins.",
    solutionDetail: [
      "Conducted comprehensive SEO audit and keyword research to identify high-intent opportunities",
      "Developed a content strategy focused on bottom-of-funnel keywords and buyer pain points",
      "Created 40+ pieces of high-quality content including guides, case studies, and comparison pages",
      "Implemented technical SEO improvements including site speed optimization and schema markup",
      "Built a lead scoring system and marketing automation workflows for nurturing",
      "Launched targeted LinkedIn advertising campaigns for account-based marketing"
    ],
    timeline: [
      { month: "Month 1-2", activity: "SEO audit, keyword research, and content strategy development" },
      { month: "Month 2-3", activity: "Technical SEO implementation and content production begins" },
      { month: "Month 3-4", activity: "Marketing automation setup and lead nurturing workflows" },
      { month: "Month 4-5", activity: "Paid advertising launch and optimization" },
      { month: "Month 5-6", activity: "Scaling successful campaigns and continuous optimization" }
    ],
    testimonial: {
      quote: "CWP transformed our entire marketing operation. We went from struggling to generate leads to having more qualified opportunities than our sales team could handle. The ROI has been incredible.",
      author: "Michael Chen",
      role: "VP of Marketing, TechFlow SaaS"
    }
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
    duration: "4 months",
    overview: "Urban Eats is a trendy restaurant chain with locations in major metropolitan areas. They offer fusion cuisine that appeals to millennials and Gen Z consumers, but were struggling to stand out in the crowded food service market.",
    challengeDetail: "Urban Eats had a minimal social media presence with under 5,000 followers across platforms. Their engagement rate was below 1%, and they weren't leveraging user-generated content or influencer partnerships. Competitors with similar offerings were dominating the conversation online.",
    solutionDetail: [
      "Rebranded social media presence with cohesive visual identity and content pillars",
      "Launched 'Eats Challenge' campaign encouraging customers to share their favorite dishes",
      "Partnered with 50+ micro-influencers in the food and lifestyle space",
      "Created behind-the-scenes content showcasing chef stories and ingredient sourcing",
      "Implemented social listening to engage with brand mentions in real-time",
      "Developed TikTok and Reels strategy focusing on trending sounds and formats"
    ],
    timeline: [
      { month: "Month 1", activity: "Brand audit, content strategy development, and influencer outreach" },
      { month: "Month 2", activity: "Launch of UGC campaign and first influencer collaborations" },
      { month: "Month 3", activity: "TikTok strategy implementation and viral content push" },
      { month: "Month 4", activity: "Community building and scaling successful campaigns" }
    ],
    testimonial: {
      quote: "Our social media went from an afterthought to our biggest marketing channel. The team at CWP understood our brand voice and helped us connect with our audience in authentic ways.",
      author: "Sarah Johnson",
      role: "Marketing Director, Urban Eats"
    }
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
    duration: "5 months",
    overview: "FinSecure is a fintech startup offering personal finance management tools and investment advisory services. They had raised Series A funding and needed to scale customer acquisition efficiently.",
    challengeDetail: "FinSecure was spending heavily on paid advertising with diminishing returns. Their CAC had grown to $150—unsustainable for their business model. Email campaigns were generic, resulting in a 12% open rate and minimal conversions. They needed to optimize their marketing spend while improving engagement.",
    solutionDetail: [
      "Conducted deep-dive analysis of ad account performance and audience targeting",
      "Restructured campaigns with better segmentation and creative testing",
      "Implemented lookalike audiences based on highest-value customers",
      "Built behavioral email sequences triggered by user actions",
      "Created personalized onboarding flows based on user goals",
      "Set up A/B testing framework for continuous optimization"
    ],
    timeline: [
      { month: "Month 1", activity: "Audit of existing campaigns and email infrastructure" },
      { month: "Month 2", activity: "Campaign restructuring and email automation setup" },
      { month: "Month 3", activity: "Testing new audiences and email sequences" },
      { month: "Month 4", activity: "Optimization based on initial results" },
      { month: "Month 5", activity: "Scaling successful campaigns and workflows" }
    ],
    testimonial: {
      quote: "CWP helped us cut our acquisition costs by more than half while actually improving lead quality. Their data-driven approach made all the difference.",
      author: "David Park",
      role: "CEO, FinSecure"
    }
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
    duration: "8 months",
    overview: "GreenHome provides sustainable home improvement solutions, including solar panels, energy-efficient appliances, and eco-friendly building materials. They serve environmentally-conscious homeowners looking to reduce their carbon footprint.",
    challengeDetail: "GreenHome's website was outdated, not mobile-friendly, and virtually invisible in search results. They relied almost entirely on referrals and word-of-mouth. With increasing competition in the green home space, they needed a strong digital presence to capture growing demand.",
    solutionDetail: [
      "Designed and developed a modern, conversion-optimized website",
      "Implemented comprehensive on-page and technical SEO",
      "Created educational content hub covering sustainable living topics",
      "Built local SEO presence across all service areas",
      "Launched Google Ads campaigns targeting high-intent keywords",
      "Developed retargeting campaigns to capture interested visitors"
    ],
    timeline: [
      { month: "Month 1-2", activity: "Website design and development" },
      { month: "Month 2-4", activity: "SEO implementation and content creation" },
      { month: "Month 4-5", activity: "Google Ads launch and optimization" },
      { month: "Month 5-6", activity: "Local SEO and review management" },
      { month: "Month 6-8", activity: "Scaling and continuous improvement" }
    ],
    testimonial: {
      quote: "We went from having almost no online presence to being the go-to resource for sustainable home solutions in our region. CWP understood our mission and helped us reach people who share our values.",
      author: "Lisa Martinez",
      role: "Founder, GreenHome"
    }
  }
];

export default function CaseStudyDetail() {
  const { id } = useParams();
  const study = caseStudiesData.find(s => s.id === Number(id));
  
  const relatedStudies = caseStudiesData
    .filter(s => s.id !== Number(id))
    .slice(0, 2);

  if (!study) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <WhatsAppButton />
      <BackToTop />

      <article className="section-spacing pt-32">
        <div className="container-custom">
          {/* Back Button */}
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          {/* Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>{study.industry}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{study.duration} project</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{study.company}</h1>
            <p className="text-xl text-muted-foreground mb-6">{study.overview}</p>

            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, idx) => (
                <span key={idx} className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-5xl mx-auto mb-12">
            <img 
              src={study.image} 
              alt={study.company}
              className="w-full aspect-video object-cover rounded-2xl"
            />
          </div>

          {/* Key Metrics */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Key Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {study.metrics.map((metric, idx) => (
                <Card key={idx} className="p-6 text-center">
                  <metric.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Challenge Section */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {study.challengeDetail}
            </p>
          </div>

          {/* Solution Section */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
            <ul className="space-y-4">
              {study.solutionDetail.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
            <div className="space-y-4">
              {study.timeline.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-24 flex-shrink-0">
                    <span className="text-primary font-semibold text-sm">{item.month}</span>
                  </div>
                  <div className="flex-1 pb-4 border-b border-border/50">
                    <p className="text-muted-foreground">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="p-8 bg-primary/5 border-primary/20">
              <Quote className="w-10 h-10 text-primary mb-4" />
              <p className="text-xl italic mb-6 text-foreground">
                "{study.testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold">{study.testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{study.testimonial.role}</p>
              </div>
            </Card>
          </div>

          {/* Related Case Studies */}
          <section className="mt-20 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">More Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedStudies.map((relatedStudy) => (
                <Card key={relatedStudy.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <Link to={`/case-studies/${relatedStudy.id}`}>
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedStudy.image} 
                        alt={relatedStudy.company}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-muted-foreground">{relatedStudy.industry}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{relatedStudy.duration}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {relatedStudy.company}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">{relatedStudy.challenge}</p>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 text-center p-12 bg-gradient-to-r from-primary via-primary to-accent rounded-2xl text-primary-foreground max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Be Our Next Success Story?</h3>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Let's discuss how we can achieve similar results for your business.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="/#contact">Get Your Free Strategy Session</a>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}