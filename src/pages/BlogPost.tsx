import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Calendar, Clock, ArrowLeft, User, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { TableOfContents, calculateReadTime } from "@/components/TableOfContents";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author_name: string | null;
  author_avatar: string | null;
  category: string | null;
  read_time: string | null;
  created_at: string | null;
  tags: string[] | null;
}

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      let query = supabase
        .from("blog_posts")
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
        setPost(null);
      } else {
        setPost(data);
        
        // Fetch related posts - prioritize same category
        let relatedQuery = supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .neq("id", data.id);
        
        if (data.category) {
          // First try to get posts from the same category
          const { data: sameCategoryPosts } = await relatedQuery
            .eq("category", data.category)
            .limit(3);
          
          if (sameCategoryPosts && sameCategoryPosts.length >= 3) {
            setRelatedPosts(sameCategoryPosts);
          } else {
            // If not enough, get more from other categories
            const existingIds = sameCategoryPosts?.map(p => p.id) || [];
            const { data: otherPosts } = await supabase
              .from("blog_posts")
              .select("*")
              .eq("published", true)
              .neq("id", data.id)
              .not("id", "in", `(${existingIds.join(",")})`)
              .limit(3 - (sameCategoryPosts?.length || 0));
            
            setRelatedPosts([...(sameCategoryPosts || []), ...(otherPosts || [])]);
          }
        } else {
          const { data: related } = await relatedQuery.limit(3);
          setRelatedPosts(related || []);
        }
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <SEOHead 
          title="Post Not Found"
          description="The blog post you're looking for doesn't exist."
        />
        <div className="container-custom py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Navbar />
      <WhatsAppButton />
      <BackToTop />
      
      <SEOHead 
        title={post.title}
        description={post.excerpt || `Read ${post.title} on CWP Marketing blog`}
        keywords={post.tags?.join(", ")}
      />
      
      <JsonLd 
        schema={{
          type: "Article",
          headline: post.title,
          description: post.excerpt || "",
          image: post.cover_image || undefined,
          author: post.author_name || "CWP Team",
          datePublished: post.created_at || new Date().toISOString()
        }}
      />

      <article className="section-spacing pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              {post.category && <span className="text-primary font-semibold">{post.category}</span>}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.read_time || (post.content ? calculateReadTime(post.content) : "5 min read")}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            {post.excerpt && <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>}

            {/* Author & Share */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {post.author_avatar ? (
                  <img 
                    src={post.author_avatar} 
                    alt={post.author_name || "Author"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{post.author_name || "CWP Team"}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(post.created_at)}</p>
                </div>
              </div>

              <SocialShareButtons url={currentUrl} title={post.title} />
            </div>
          </header>

          {/* Featured Image */}
          {post.cover_image && (
            <div className="max-w-4xl mx-auto mb-12">
              <img 
                src={post.cover_image} 
                alt={post.title}
                className="w-full aspect-video object-cover rounded-2xl"
              />
            </div>
          )}

          {/* Content with TOC */}
          {post.content && (
            <div className="flex gap-8 max-w-6xl mx-auto">
              {/* Table of Contents - Desktop */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <TableOfContents content={post.content} />
              </aside>
              
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div 
                  className="prose prose-invert prose-lg prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-none"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share at bottom */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-muted-foreground">Enjoyed this article? Share it!</p>
              <SocialShareButtons url={currentUrl} title={post.title} />
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-20 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <Link to={`/blog/${relatedPost.slug}`}>
                      {relatedPost.cover_image && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={relatedPost.cover_image} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          {relatedPost.category && <span className="text-primary font-semibold">{relatedPost.category}</span>}
                          {relatedPost.read_time && <span>{relatedPost.read_time}</span>}
                        </div>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-16 text-center p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how these strategies can be applied to your unique situation.
            </p>
            <Button asChild size="lg">
              <Link to="/#contact">Get Free Consultation</Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
