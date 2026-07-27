import { useEffect, useState, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Copy } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { TagInput } from "@/components/admin/TagInput";
import { Textarea } from "@/components/ui/textarea";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  author_name: string | null;
  author_avatar?: string | null;
  read_time: string | null;
  published: boolean | null;
  featured: boolean | null;
  status: string;
  scheduled_publish_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  secondary_keywords: string[] | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  noindex: boolean;
  word_count: number | null;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  published: { label: "Published", className: "bg-green-500/20 text-green-500" },
  scheduled: { label: "Scheduled", className: "bg-blue-500/20 text-blue-500" },
  archived: { label: "Archived", className: "bg-orange-500/20 text-orange-500" },
};

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "",
  tags: [] as string[],
  author_name: "",
  read_time: "",
  status: "draft" as "draft" | "published" | "scheduled" | "archived",
  featured: false,
  scheduled_publish_at: "",
  meta_title: "",
  meta_description: "",
  focus_keyword: "",
  secondary_keywords: [] as string[],
  canonical_url: "",
  og_title: "",
  og_description: "",
  og_image: "",
  noindex: false,
};

const countWords = (text: string) =>
  (text || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>\-!\[\]()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ variant: "destructive", title: "Error fetching posts", description: error.message });
    else setPosts((data || []) as any);
    setLoading(false);
  };

  const categoryOptions = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[],
    [posts]
  );
  const authorOptions = useMemo(
    () => Array.from(new Set(posts.map((p) => p.author_name).filter(Boolean))) as string[],
    [posts]
  );
  const tagSuggestions = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags || []))),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return posts.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, searchQuery, statusFilter]);

  const wordCount = countWords(form.content);
  const autoReadTime = `${Math.max(1, Math.round(wordCount / 220))} min read`;

  const openDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content || "",
        cover_image: post.cover_image || "",
        category: post.category || "",
        tags: post.tags || [],
        author_name: post.author_name || "",
        read_time: post.read_time || "",
        status: (post.status as any) || (post.published ? "published" : "draft"),
        featured: !!post.featured,
        scheduled_publish_at: post.scheduled_publish_at ? post.scheduled_publish_at.slice(0, 16) : "",
        meta_title: post.meta_title || "",
        meta_description: post.meta_description || "",
        focus_keyword: post.focus_keyword || "",
        secondary_keywords: post.secondary_keywords || [],
        canonical_url: post.canonical_url || "",
        og_title: post.og_title || "",
        og_description: post.og_description || "",
        og_image: post.og_image || "",
        noindex: !!post.noindex,
      });
    } else {
      setEditingPost(null);
      setForm(emptyForm);
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ variant: "destructive", title: "Title and slug are required" });
      return;
    }
    if (form.status === "scheduled" && !form.scheduled_publish_at) {
      toast({ variant: "destructive", title: "Pick a publish date for scheduled posts" });
      return;
    }

    setSaving(true);
    const wc = countWords(form.content);
    const rt = form.read_time?.trim() || `${Math.max(1, Math.round(wc / 220))} min read`;

    const postData: any = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content || null,
      cover_image: form.cover_image || null,
      category: form.category || null,
      tags: form.tags.length ? form.tags : null,
      author_name: form.author_name || null,
      read_time: rt,
      word_count: wc,
      status: form.status,
      published: form.status === "published",
      featured: form.featured,
      scheduled_publish_at:
        form.status === "scheduled" && form.scheduled_publish_at
          ? new Date(form.scheduled_publish_at).toISOString()
          : null,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      focus_keyword: form.focus_keyword || null,
      secondary_keywords: form.secondary_keywords.length ? form.secondary_keywords : null,
      canonical_url: form.canonical_url || null,
      og_title: form.og_title || null,
      og_description: form.og_description || null,
      og_image: form.og_image || null,
      noindex: form.noindex,
    };

    const { error } = editingPost
      ? await supabase.from("blog_posts").update(postData).eq("id", editingPost.id)
      : await supabase.from("blog_posts").insert(postData);

    setSaving(false);
    if (error) toast({ variant: "destructive", title: "Error saving post", description: error.message });
    else {
      toast({ title: editingPost ? "Post updated" : "Post created" });
      setDialogOpen(false);
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast({ variant: "destructive", title: "Error deleting post" });
    else { toast({ title: "Post deleted" }); fetchPosts(); }
  };

  const handleDuplicate = async (post: BlogPost) => {
    const { id, created_at, ...rest } = post as any;
    const copy = {
      ...rest,
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy-${Date.now().toString(36)}`,
      status: "draft",
      published: false,
      featured: false,
      scheduled_publish_at: null,
    };
    const { error } = await supabase.from("blog_posts").insert(copy);
    if (error) toast({ variant: "destructive", title: "Duplicate failed", description: error.message });
    else { toast({ title: "Post duplicated as draft" }); fetchPosts(); }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Blog Posts</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your blog content, SEO and publishing</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" /> Add Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto mx-4 sm:mx-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post" : "New Post"}</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="content" className="mt-2">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="publishing">Publishing</TabsTrigger>
                </TabsList>

                {/* CONTENT */}
                <TabsContent value="content" className="space-y-4 pt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={form.title}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            title: e.target.value,
                            slug: editingPost ? form.slug : generateSlug(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug</Label>
                      <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: generateSlug(e.target.value) })} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Excerpt</Label>
                    <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} />
                  </div>

                  <RichTextEditor
                    label="Content"
                    value={form.content}
                    onChange={(v) => setForm({ ...form, content: v })}
                    folder="blog"
                  />
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>Words: <strong className="text-foreground">{wordCount}</strong></span>
                    <span>Auto read time: <strong className="text-foreground">{autoReadTime}</strong></span>
                  </div>

                  <ImageUpload label="Cover Image" value={form.cover_image} onChange={(url) => setForm({ ...form, cover_image: url })} folder="blog" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        list="blog-categories"
                        placeholder="e.g. Marketing"
                      />
                      <datalist id="blog-categories">
                        {categoryOptions.map((c) => <option key={c} value={c} />)}
                      </datalist>
                    </div>
                    <div className="space-y-2">
                      <Label>Author</Label>
                      <Input
                        value={form.author_name}
                        onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                        list="blog-authors"
                        placeholder="Author name"
                      />
                      <datalist id="blog-authors">
                        {authorOptions.map((a) => <option key={a} value={a} />)}
                      </datalist>
                    </div>
                  </div>

                  <TagInput label="Tags" value={form.tags} onChange={(tags) => setForm({ ...form, tags })} suggestions={tagSuggestions} />

                  <div className="space-y-2">
                    <Label>Read time <span className="text-xs text-muted-foreground">(leave empty to auto-calc: {autoReadTime})</span></Label>
                    <Input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder={autoReadTime} />
                  </div>
                </TabsContent>

                {/* SEO */}
                <TabsContent value="seo" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Meta Title <span className="text-xs text-muted-foreground">({form.meta_title.length}/60)</span></Label>
                    <Input maxLength={80} value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} placeholder={form.title} />
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Description <span className="text-xs text-muted-foreground">({form.meta_description.length}/160)</span></Label>
                    <Textarea maxLength={200} rows={3} value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} placeholder={form.excerpt} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Focus Keyword</Label>
                      <Input value={form.focus_keyword} onChange={(e) => setForm({ ...form, focus_keyword: e.target.value })} placeholder="primary target keyword" />
                    </div>
                    <div className="space-y-2">
                      <Label>Canonical URL</Label>
                      <Input value={form.canonical_url} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} placeholder="https://consultwithprofessionals.com/blog/..." />
                    </div>
                  </div>
                  <TagInput label="Secondary Keywords" value={form.secondary_keywords} onChange={(secondary_keywords) => setForm({ ...form, secondary_keywords })} placeholder="Add keyword and press Enter" />

                  <div className="rounded-lg border border-border p-4 space-y-4">
                    <div className="text-sm font-medium">Social / Open Graph</div>
                    <div className="space-y-2">
                      <Label>OG Title</Label>
                      <Input value={form.og_title} onChange={(e) => setForm({ ...form, og_title: e.target.value })} placeholder={form.meta_title || form.title} />
                    </div>
                    <div className="space-y-2">
                      <Label>OG Description</Label>
                      <Textarea rows={2} value={form.og_description} onChange={(e) => setForm({ ...form, og_description: e.target.value })} placeholder={form.meta_description || form.excerpt} />
                    </div>
                    <ImageUpload label="OG Image (social preview)" value={form.og_image} onChange={(url) => setForm({ ...form, og_image: url })} folder="blog/og" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch checked={form.noindex} onCheckedChange={(v) => setForm({ ...form, noindex: v })} />
                    <Label>Hide from search engines (noindex)</Label>
                  </div>
                </TabsContent>

                {/* PUBLISHING */}
                <TabsContent value="publishing" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={form.status} onValueChange={(v: any) => setForm({ ...form, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {form.status === "scheduled" && (
                    <div className="space-y-2">
                      <Label>Publish at</Label>
                      <Input
                        type="datetime-local"
                        value={form.scheduled_publish_at}
                        onChange={(e) => setForm({ ...form, scheduled_publish_at: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                    <Label>Featured post</Label>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">Cancel</Button>
                <Button onClick={handleSave} disabled={saving} className="flex-1">
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 max-w-sm">
            <AdminSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search posts..." />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : filteredPosts.length === 0 ? (
          <Card><CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all" ? "No posts match the filters." : "No blog posts yet."}
            </p>
          </CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {filteredPosts.map((post) => {
              const s = STATUS_LABELS[post.status] || STATUS_LABELS.draft;
              return (
                <Card key={post.id}>
                  <CardContent className="py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        {post.cover_image && (
                          <img src={post.cover_image} alt="" className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <h3 className="font-semibold truncate">{post.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {[post.category, post.read_time, post.word_count ? `${post.word_count} words` : null].filter(Boolean).join(" • ")}
                          </p>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            <Badge className={`${s.className} border-0`}>{s.label}</Badge>
                            {post.featured && <Badge className="bg-yellow-500/20 text-yellow-500 border-0">Featured</Badge>}
                            {post.noindex && <Badge variant="outline">noindex</Badge>}
                            {post.scheduled_publish_at && post.status === "scheduled" && (
                              <Badge variant="outline">{new Date(post.scheduled_publish_at).toLocaleString()}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0 self-end sm:self-center">
                        <Button variant="outline" size="icon" onClick={() => handleDuplicate(post)} title="Duplicate"><Copy className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" onClick={() => openDialog(post)} title="Edit"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(post.id)} title="Delete"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
