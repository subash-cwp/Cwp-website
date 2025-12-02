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
import { Plus, Pencil, Trash2, Loader2, Star } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { AdminSearch } from "@/components/admin/AdminSearch";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  content: string;
  avatar: string | null;
  rating: number | null;
  published: boolean | null;
  featured: boolean | null;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    avatar: "",
    rating: 5,
    published: true,
    featured: false,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  };

  const filteredTestimonials = useMemo(() => {
    if (!searchQuery) return testimonials;
    const query = searchQuery.toLowerCase();
    return testimonials.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.company?.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
  }, [testimonials, searchQuery]);

  const openDialog = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setForm({
        name: item.name,
        role: item.role || "",
        company: item.company || "",
        content: item.content,
        avatar: item.avatar || "",
        rating: item.rating || 5,
        published: item.published ?? true,
        featured: item.featured ?? false,
      });
    } else {
      setEditingItem(null);
      setForm({ name: "", role: "", company: "", content: "", avatar: "", rating: 5, published: true, featured: false });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.content) {
      toast({ variant: "destructive", title: "Name and content are required" });
      return;
    }

    setSaving(true);
    const data = {
      name: form.name,
      role: form.role || null,
      company: form.company || null,
      content: form.content,
      avatar: form.avatar || null,
      rating: form.rating,
      published: form.published,
      featured: form.featured,
    };

    const { error } = editingItem
      ? await supabase.from("testimonials").update(data).eq("id", editingItem.id)
      : await supabase.from("testimonials").insert(data);

    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: editingItem ? "Updated" : "Created" });
      setDialogOpen(false);
      fetchTestimonials();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Testimonials</h1>
            <p className="text-muted-foreground">Manage client testimonials</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}><Plus className="h-4 w-4 mr-2" /> Add Testimonial</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit" : "New"} Testimonial</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Testimonial Content</Label>
                  <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} />
                </div>
                
                <ImageUpload
                  label="Avatar"
                  value={form.avatar}
                  onChange={(url) => setForm({ ...form, avatar: url })}
                  folder="testimonials"
                />
                
                <div className="space-y-2">
                  <Label>Rating (1-5)</Label>
                  <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} />
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
                  {editingItem ? "Update" : "Create"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="max-w-sm">
          <AdminSearch 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search testimonials..."
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : filteredTestimonials.length === 0 ? (
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">{searchQuery ? "No results found." : "No testimonials yet."}</p></CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {filteredTestimonials.map((item) => (
              <Card key={item.id}>
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {item.avatar ? (
                        <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-bold">{item.name[0]}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.role} at {item.company}</p>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                        <p className="text-sm mt-2 line-clamp-2">{item.content}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="icon" onClick={() => openDialog(item)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
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