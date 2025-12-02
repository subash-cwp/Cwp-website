import { useEffect, useState } from "react";
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

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
  price_starting: string | null;
  sort_order: number | null;
  published: boolean | null;
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "",
    features: "",
    price_starting: "",
    sort_order: 0,
    published: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data || []);
    setLoading(false);
  };

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setForm({
        title: service.title,
        slug: service.slug,
        description: service.description || "",
        icon: service.icon || "",
        features: service.features?.join("\n") || "",
        price_starting: service.price_starting || "",
        sort_order: service.sort_order || 0,
        published: service.published ?? true,
      });
    } else {
      setEditingService(null);
      setForm({ title: "", slug: "", description: "", icon: "", features: "", price_starting: "", sort_order: 0, published: true });
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
      description: form.description || null,
      icon: form.icon || null,
      features: form.features ? form.features.split("\n").filter(f => f.trim()) : null,
      price_starting: form.price_starting || null,
      sort_order: form.sort_order,
      published: form.published,
    };

    const { error } = editingService
      ? await supabase.from("services").update(data).eq("id", editingService.id)
      : await supabase.from("services").insert(data);

    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: editingService ? "Updated" : "Created" });
      setDialogOpen(false);
      fetchServices();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    fetchServices();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-muted-foreground">Manage your service offerings</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}><Plus className="h-4 w-4 mr-2" /> Add Service</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingService ? "Edit" : "New"} Service</DialogTitle>
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
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Icon (Lucide name)</Label>
                    <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g., Megaphone" />
                  </div>
                  <div className="space-y-2">
                    <Label>Starting Price</Label>
                    <Input value={form.price_starting} onChange={(e) => setForm({ ...form, price_starting: e.target.value })} placeholder="$999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Features (one per line)</Label>
                  <Textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                    <Label>Published</Label>
                  </div>
                </div>
                <Button onClick={handleSave} disabled={saving} className="w-full">
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingService ? "Update" : "Create"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : services.length === 0 ? (
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">No services yet.</p></CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.id}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.price_starting} • Order: {service.sort_order}</p>
                      {!service.published && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">Draft</span>}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => openDialog(service)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(service.id)}><Trash2 className="h-4 w-4" /></Button>
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
