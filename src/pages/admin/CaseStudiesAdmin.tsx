import { useEffect, useState, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { AdminSearch } from "@/components/admin/AdminSearch";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  industry: string | null;
  description: string | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  cover_image: string | null;
  technologies: string[] | null;
  published: boolean | null;
  featured: boolean | null;
}

export default function CaseStudiesAdmin() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    client: "",
    industry: "",
    description: "",
    challenge: "",
    solution: "",
    results: "",
    cover_image: "",
    technologies: "",
    published: false,
    featured: false,
  });

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) setStudies(data || []);
    setLoading(false);
  };

  const filteredStudies = useMemo(() => {
    if (!searchQuery) return studies;
    const query = searchQuery.toLowerCase();
    return studies.filter(study => 
      study.title.toLowerCase().includes(query) ||
      study.client?.toLowerCase().includes(query) ||
      study.industry?.toLowerCase().includes(query)
    );
  }, [studies, searchQuery]);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openDialog = (study?: CaseStudy) => {
    if (study) {
      setEditingStudy(study);
      setForm({
        title: study.title,
        slug: study.slug,
        client: study.client || "",
        industry: study.industry || "",
        description: study.description || "",
        challenge: study.challenge || "",
        solution: study.solution || "",
        results: study.results || "",
        cover_image: study.cover_image || "",
        technologies: study.technologies?.join(", ") || "",
        published: study.published || false,
        featured: study.featured || false,
      });
    } else {
      setEditingStudy(null);
      setForm({ title: "", slug: "", client: "", industry: "", description: "", challenge: "", solution: "", results: "", cover_image: "", technologies: "", published: false, featured: false });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ variant: "destructive", title: "Title and slug are required" });
      return;
    }

    setSaving(true);
    const data = {
      title: form.title,
      slug: form.slug,
      client: form.client || null,
      industry: form.industry || null,
      description: form.description || null,
      challenge: form.challenge || null,
      solution: form.solution || null,
      results: form.results || null,
      cover_image: form.cover_image || null,
      technologies: form.technologies ? form.technologies.split(",").map(t => t.trim()) : null,
      published: form.published,
      featured: form.featured,
    };

    const { error } = editingStudy
      ? await supabase.from("case_studies").update(data).eq("id", editingStudy.id)
      : await supabase.from("case_studies").insert(data);

    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Error saving", description: error.message });
    } else {
      toast({ title: editingStudy ? "Updated" : "Created" });
      setDialogOpen(false);
      fetchStudies();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    await supabase.from("case_studies").delete().eq("id", id);
    fetchStudies();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Case Studies</h1>
            <p className="text-muted-foreground">Showcase your work</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}><Plus className="h-4 w-4 mr-2" /> Add Case Study</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingStudy ? "Edit" : "New"} Case Study</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Client</Label>
                    <Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Challenge</Label>
                  <Textarea value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Solution</Label>
                  <Textarea value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Results</Label>
                  <Textarea value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} rows={3} />
                </div>
                
                <ImageUpload
                  label="Cover Image"
                  value={form.cover_image}
                  onChange={(url) => setForm({ ...form, cover_image: url })}
                  folder="case-studies"
                />
                
                <div className="space-y-2">
                  <Label>Technologies (comma separated)</Label>
                  <Input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} />
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
                  {editingStudy ? "Update" : "Create"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="max-w-sm">
          <AdminSearch 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search case studies..."
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : filteredStudies.length === 0 ? (
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">{searchQuery ? "No results found." : "No case studies yet."}</p></CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {filteredStudies.map((study) => (
              <Card key={study.id}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {study.cover_image && <img src={study.cover_image} alt="" className="w-16 h-16 object-cover rounded" />}
                      <div>
                        <h3 className="font-semibold">{study.title}</h3>
                        <p className="text-sm text-muted-foreground">{study.client} • {study.industry}</p>
                        <div className="flex gap-2 mt-1">
                          {study.published && <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded">Published</span>}
                          {study.featured && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">Featured</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openDialog(study)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(study.id)}><Trash2 className="h-4 w-4" /></Button>
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