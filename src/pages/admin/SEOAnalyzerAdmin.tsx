import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle, CheckCircle, RefreshCw, FileText, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  seo_score: number;
  seo_suggestions: any;
  cover_image: string | null;
  tags: string[] | null;
}

interface SEOIssue {
  type: "error" | "warning" | "success";
  message: string;
  weight: number;
}

export default function SEOAnalyzerAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, content, excerpt, seo_score, seo_suggestions, cover_image, tags")
      .order("seo_score", { ascending: true });
    setPosts(data || []);
    setLoading(false);
  };

  const analyzePost = async (post: BlogPost) => {
    setAnalyzing(post.id);
    const issues: SEOIssue[] = [];
    let score = 100;

    // Title checks
    if (!post.title) {
      issues.push({ type: "error", message: "Missing title", weight: 20 });
      score -= 20;
    } else if (post.title.length < 30) {
      issues.push({ type: "warning", message: "Title is too short (should be 30-60 chars)", weight: 10 });
      score -= 10;
    } else if (post.title.length > 60) {
      issues.push({ type: "warning", message: "Title is too long (should be 30-60 chars)", weight: 5 });
      score -= 5;
    } else {
      issues.push({ type: "success", message: "Title length is optimal", weight: 0 });
    }

    // Meta description (excerpt)
    if (!post.excerpt) {
      issues.push({ type: "error", message: "Missing meta description (excerpt)", weight: 15 });
      score -= 15;
    } else if (post.excerpt.length < 120) {
      issues.push({ type: "warning", message: "Meta description is too short (should be 120-160 chars)", weight: 8 });
      score -= 8;
    } else if (post.excerpt.length > 160) {
      issues.push({ type: "warning", message: "Meta description is too long (should be 120-160 chars)", weight: 5 });
      score -= 5;
    } else {
      issues.push({ type: "success", message: "Meta description length is optimal", weight: 0 });
    }

    // Content checks
    if (!post.content) {
      issues.push({ type: "error", message: "No content", weight: 25 });
      score -= 25;
    } else {
      const wordCount = post.content.split(/\s+/).length;
      if (wordCount < 300) {
        issues.push({ type: "warning", message: `Content is thin (${wordCount} words, recommend 1000+)`, weight: 15 });
        score -= 15;
      } else if (wordCount < 1000) {
        issues.push({ type: "warning", message: `Content could be longer (${wordCount} words)`, weight: 5 });
        score -= 5;
      } else {
        issues.push({ type: "success", message: `Good content length (${wordCount} words)`, weight: 0 });
      }

      // Check for headings
      if (!post.content.includes("<h2") && !post.content.includes("<h3")) {
        issues.push({ type: "warning", message: "No subheadings found (use H2, H3)", weight: 10 });
        score -= 10;
      } else {
        issues.push({ type: "success", message: "Subheadings are present", weight: 0 });
      }

      // Check for links
      if (!post.content.includes("<a ")) {
        issues.push({ type: "warning", message: "No links in content", weight: 5 });
        score -= 5;
      }

      // Check for images
      if (!post.content.includes("<img")) {
        issues.push({ type: "warning", message: "No images in content body", weight: 5 });
        score -= 5;
      }
    }

    // Cover image
    if (!post.cover_image) {
      issues.push({ type: "warning", message: "Missing featured image", weight: 10 });
      score -= 10;
    } else {
      issues.push({ type: "success", message: "Featured image is set", weight: 0 });
    }

    // Tags
    if (!post.tags || post.tags.length === 0) {
      issues.push({ type: "warning", message: "No tags/keywords", weight: 5 });
      score -= 5;
    } else if (post.tags.length < 3) {
      issues.push({ type: "warning", message: "Add more tags (recommend 3-5)", weight: 3 });
      score -= 3;
    } else {
      issues.push({ type: "success", message: `${post.tags.length} tags set`, weight: 0 });
    }

    // Slug check
    if (post.slug.includes(" ") || post.slug !== post.slug.toLowerCase()) {
      issues.push({ type: "warning", message: "Slug should be lowercase with hyphens", weight: 5 });
      score -= 5;
    }

    score = Math.max(0, score);

    // Update database
    await supabase
      .from("blog_posts")
      .update({ 
        seo_score: score, 
        seo_suggestions: issues.filter(i => i.type !== "success") as any
      })
      .eq("id", post.id);

    toast({ title: `SEO Score: ${score}/100` });
    setAnalyzing(null);
    fetchPosts();
  };

  const analyzeAll = async () => {
    for (const post of posts) {
      await analyzePost(post);
    }
    toast({ title: "All posts analyzed" });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-500/20 text-green-500">Good</Badge>;
    if (score >= 50) return <Badge className="bg-yellow-500/20 text-yellow-500">Needs Work</Badge>;
    return <Badge className="bg-red-500/20 text-red-500">Poor</Badge>;
  };

  const avgScore = posts.length ? Math.round(posts.reduce((a, b) => a + b.seo_score, 0) / posts.length) : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">SEO Analyzer</h1>
            <p className="text-muted-foreground">Optimize your content for search engines</p>
          </div>
          <Button onClick={analyzeAll} disabled={!!analyzing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${analyzing ? "animate-spin" : ""}`} />
            Analyze All
          </Button>
        </div>

        {/* Overview */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average SEO Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${getScoreColor(avgScore)}`}>{avgScore}/100</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Needs Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-500">{posts.filter(p => p.seo_score < 80 && p.seo_score >= 50).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">{posts.filter(p => p.seo_score < 50).length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts SEO Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : posts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No blog posts to analyze</p>
            ) : (
              <Accordion type="single" collapsible className="space-y-2">
                {posts.map((post) => (
                  <AccordionItem key={post.id} value={post.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-4 w-full">
                        <div className="flex-1 text-left">
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-muted-foreground">/blog/{post.slug}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          {getScoreBadge(post.seo_score)}
                          <div className="w-24">
                            <Progress value={post.seo_score} className="h-2" />
                          </div>
                          <span className={`font-bold ${getScoreColor(post.seo_score)}`}>{post.seo_score}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        {post.seo_suggestions && post.seo_suggestions.length > 0 ? (
                          <div className="space-y-2">
                            {post.seo_suggestions.map((issue: any, idx: number) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                {issue.type === "error" ? (
                                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                                ) : issue.type === "warning" ? (
                                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                )}
                                <span>{issue.message}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Click "Re-analyze" to check for issues</p>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => analyzePost(post)}
                          disabled={analyzing === post.id}
                        >
                          {analyzing === post.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Search className="h-4 w-4 mr-2" />
                          )}
                          Re-analyze
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}