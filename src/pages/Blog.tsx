import { useState, useEffect, useMemo } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SEOHead } from "@/components/SEOHead";
import { JsonLd } from "@/components/JsonLd";
import { LazyImage } from "@/components/LazyImage";
import { BlogGridSkeleton } from "@/components/LoadingSkeleton";
import { BlogSearch } from "@/components/BlogSearch";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  slug: string;
  created_at: string;
  read_time: string | null;
  cover_image: string | null;
  tags: string[] | null;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, excerpt, category, slug, created_at, read_time, cover_image, tags")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (!error && data) setPosts(data);
    setLoading(false);
  };

  const categories = ["All", ...new Set(posts.map((p) => p.category).filter(Boolean))];
  
  const filteredPosts = useMemo(() => {
    let result = posts;
    
    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => 
        p.title.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        p.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [posts, activeCategory, searchQuery]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setSubscribing(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: newsletterEmail });
    setSubscribing(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "You're already subscribed!" });
      } else {
        toast({ variant: "destructive", title: "Error", description: error.message });
      }
    } else {
      toast({ title: "Subscribed!", description: "Welcome to our newsletter." });
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Marketing Blog - CWP Marketing Insights & Strategies"
        description="Expert marketing advice, case studies, and proven tactics to help your business grow faster. Learn SEO, social media, content marketing and more."
        keywords="marketing blog, SEO tips, social media marketing, content strategy, digital marketing insights"
      />
      <JsonLd 
        schema={{
          type: "Organization",
          name: "CWP Marketing",
          url: window.location.origin,
          description: "Strategic marketing and growth consulting agency",
          logo: `${window.location.origin}/og-image.png`,
        }}
      />
      <Navbar />
      <WhatsAppButton />
      <BackToTop />

      <section className="section-spacing pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Marketing <span className="text-primary">Insights</span> & Strategies
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert advice, case studies, and proven tactics to help your business grow faster.
            </p>
          </div>

          {/* Search */}
          <BlogSearch 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search articles by title, topic, or tag..."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === activeCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category as string)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results count */}
          {(searchQuery || activeCategory !== "All") && (
            <p className="text-center text-muted-foreground mb-8">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
              {searchQuery && ` for "${searchQuery}"`}
              {activeCategory !== "All" && ` in ${activeCategory}`}
            </p>
          )}

          {/* Blog Grid */}
          {loading ? (
            <BlogGridSkeleton />
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No articles found</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <Link to={`/blog/${post.slug}`}>
                    <LazyImage 
                      src={post.cover_image || "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80"} 
                      alt={post.title}
                      className="aspect-video"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="text-primary font-semibold">{post.category}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.read_time || "5 min read"}</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <span>Read full article<span className="sr-only">: {post.title}</span></span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 text-center p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">Never Miss an Update</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest marketing insights, growth strategies, and exclusive tips delivered to your inbox weekly.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={subscribing}>
                {subscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
