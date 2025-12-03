import { useEffect, useState, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { AdminSearch } from "@/components/admin/AdminSearch";
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
  read_time: string | null;
  published: boolean | null;
  featured: boolean | null;
  created_at: string;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: "",
    category: "",
    tags: "",
    author_name: "",
    read_time: "",
    published: false,
    featured: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast({ variant: "destructive", title: "Error fetching posts" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

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
        tags: post.tags?.join(", ") || "",
        author_name: post.author_name || "",
        read_time: post.read_time || "",
        published: post.published || false,
        featured: post.featured || false,
      });
    } else {
      setEditingPost(null);
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        cover_image: "",
        category: "",
        tags: "",
        author_name: "",
        read_time: "",
        published: false,
        featured: false,
      });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ variant: "destructive", title: "Title and slug are required" });
      return;
    }

    setSaving(true);
    const postData = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content || null,
      cover_image: form.cover_image || null,
      category: form.category || null,
      tags: form.tags ? form.tags.split(",").map(t => t.trim()) : null,
      author_name: form.author_name || null,
      read_time: form.read_time || null,
      published: form.published,
      featured: form.featured,
    };

    let error;
    if (editingPost) {
      const { error: err } = await supabase
        .from("blog_posts")
        .update(postData)
        .eq("id", editingPost.id);
      error = err;
    } else {
      const { error: err } = await supabase.from("blog_posts").insert(postData);
      error = err;
    }

    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Error saving post", description: error.message });
    } else {
      toast({ title: editingPost ? "Post updated" : "Post created" });
      setDialogOpen(false);
      fetchPosts();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ variant: "destructive", title: "Error deleting post" });
    } else {
      toast({ title: "Post deleted" });
      fetchPosts();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Blog Posts</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your blog content</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" /> Add Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
              <DialogHeader>
                <DialogTitle>{editingPost ? "Edit Post" : "New Post"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={form.title}
                      onChange={(e) => {
                        setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Excerpt</Label>
                  <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} />
                </div>
                
                <RichTextEditor
                  label="Content"
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
                />
                
                <ImageUpload
                  label="Cover Image"
                  value={form.cover_image}
                  onChange={(url) => setForm({ ...form, cover_image: url })}
                  folder="blog"
                />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma separated)</Label>
                    <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Author Name</Label>
                    <Input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Read Time</Label>
                    <Input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder="5 min read" />
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                    <Label>Published</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                    <Label>Featured</Label>
                  </div>
                </div>
                
                <Button onClick={handleSave} disabled={saving} className="w-full">
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="max-w-sm">
          <AdminSearch 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search posts..."
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery ? "No posts found matching your search." : "No blog posts yet. Create your first post!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {post.cover_image && (
                        <img src={post.cover_image} alt="" className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate">{post.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{post.category} • {post.read_time}</p>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {post.published && <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded">Published</span>}
                          {post.featured && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">Featured</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 self-end sm:self-center">
                      <Button variant="outline" size="icon" onClick={() => openDialog(post)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}