import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Link } from "react-router-dom";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "10 Proven Strategies to 3X Your Social Media Engagement in 2024",
      excerpt: "Discover the latest tactics that top brands are using to dramatically increase their social media reach and engagement rates.",
      category: "Social Media",
      date: "Dec 1, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
    },
    {
      id: 2,
      title: "The Ultimate Guide to SEO in 2025: What's Changed and What Still Works",
      excerpt: "Learn how Google's latest algorithm updates are reshaping SEO strategy and what you need to do to stay ahead of the competition.",
      category: "SEO",
      date: "Nov 28, 2025",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80"
    },
    {
      id: 3,
      title: "How We Generated 500+ Qualified Leads in 90 Days: A Case Study",
      excerpt: "A deep dive into the exact strategies and tactics we used to help a B2B SaaS company transform their lead generation.",
      category: "Case Study",
      date: "Nov 25, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      id: 4,
      title: "Email Marketing ROI: Why It Still Beats Every Other Channel",
      excerpt: "Email marketing delivers an average ROI of 4200%. Here's how to maximize your email campaigns for maximum revenue.",
      category: "Email Marketing",
      date: "Nov 22, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
    },
    {
      id: 5,
      title: "Content Marketing Strategy: Creating Content That Actually Converts",
      excerpt: "Stop creating content that gets ignored. Learn the framework for developing content that drives real business results.",
      category: "Content Marketing",
      date: "Nov 19, 2025",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    },
    {
      id: 6,
      title: "Paid Advertising in 2025: Platform-by-Platform Breakdown",
      excerpt: "Compare ROI across Google Ads, Facebook, LinkedIn, and emerging platforms. Know where to invest your ad budget.",
      category: "Paid Advertising",
      date: "Nov 15, 2025",
      readTime: "11 min read",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80"
    }
  ];

  const categories = ["All", "Social Media", "SEO", "Case Study", "Email Marketing", "Content Marketing", "Paid Advertising"];

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
              Marketing Insights & Strategies
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert advice, case studies, and proven tactics to help your business grow faster.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link to={`/blog/${post.id}`}>
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="text-primary font-semibold">{post.category}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 text-center p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">Never Miss an Update</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest marketing insights, growth strategies, and exclusive tips delivered to your inbox weekly.
            </p>
            <Button size="lg" asChild>
              <a href="/#newsletter">Subscribe to Newsletter</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
