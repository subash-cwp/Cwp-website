import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Page {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  og_image: string | null;
  published: boolean;
  sort_order: number;
}

interface Section {
  id: string;
  page_id: string;
  type: string;
  content: any;
  sort_order: number;
}

const SECTION_TYPES = [
  { value: "hero", label: "Hero", template: { eyebrow: "", heading: "", subheading: "", ctaLabel: "", ctaHref: "", image: "" } },
  { value: "text", label: "Text Block", template: { heading: "", body: "" } },
  { value: "image", label: "Image", template: { src: "", alt: "", caption: "" } },
  { value: "image_text", label: "Image + Text", template: { image: "", heading: "", body: "", imagePosition: "left" } },
  { value: "cta", label: "Call to Action", template: { heading: "", body: "", ctaLabel: "", ctaHref: "" } },
  { value: "faq", label: "FAQ", template: { heading: "FAQ", items: [{ q: "", a: "" }] } },
  { value: "gallery", label: "Gallery", template: { heading: "", images: [{ src: "", alt: "" }] } },
  { value: "embed_html", label: "Custom HTML", template: { html: "" } },
];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function CustomPagesAdmin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageDialogOpen, setPageDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [pageForm, setPageForm] = useState({
    slug: "",
    title: "",
    meta_description: "",
    og_image: "",
    published: false,
  });
  const [saving, setSaving] = useState(false);

  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [sectionForm, setSectionForm] = useState({
    type: "text",
    contentJson: "{}",
  });

  const loadPages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("custom_pages")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });
    setPages((data as Page[]) || []);
    setLoading(false);
  };

  const loadSections = async (pageId: string) => {
    const { data } = await supabase
      .from("custom_page_sections")
      .select("*")
      .eq("page_id", pageId)
      .order("sort_order");
    setSections((data as Section[]) || []);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const openNewPage = () => {
    setEditingPage(null);
    setPageForm({ slug: "", title: "", meta_description: "", og_image: "", published: false });
    setPageDialogOpen(true);
  };

  const openEditPage = (p: Page) => {
    setEditingPage(p);
    setPageForm({
      slug: p.slug,
      title: p.title,
      meta_description: p.meta_description ?? "",
      og_image: p.og_image ?? "",
      published: p.published,
    });
    setPageDialogOpen(true);
  };

  const savePage = async () => {
    if (!pageForm.title || !pageForm.slug) {
      toast({ variant: "destructive", title: "Title and slug are required" });
      return;
    }
    setSaving(true);
    const payload = {
      slug: pageForm.slug,
      title: pageForm.title,
      meta_description: pageForm.meta_description || null,
      og_image: pageForm.og_image || null,
      published: pageForm.published,
      created_by: editingPage?.id ? undefined : user?.id ?? null,
    };
    const { error } = editingPage
      ? await supabase.from("custom_pages").update(payload).eq("id", editingPage.id)
      : await supabase.from("custom_pages").insert(payload);
    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
      return;
    }
    toast({ title: editingPage ? "Page updated" : "Page created" });
    setPageDialogOpen(false);
    loadPages();
  };

  const deletePage = async (p: Page) => {
    if (!confirm(`Delete "${p.title}" and all its sections?`)) return;
    const { error } = await supabase.from("custom_pages").delete().eq("id", p.id);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
      return;
    }
    if (selectedPage?.id === p.id) setSelectedPage(null);
    loadPages();
  };

  const openPageEditor = async (p: Page) => {
    setSelectedPage(p);
    await loadSections(p.id);
  };

  const openNewSection = () => {
    setEditingSection(null);
    setSectionForm({
      type: "text",
      contentJson: JSON.stringify(SECTION_TYPES.find((s) => s.value === "text")!.template, null, 2),
    });
    setSectionDialogOpen(true);
  };

  const openEditSection = (s: Section) => {
    setEditingSection(s);
    setSectionForm({ type: s.type, contentJson: JSON.stringify(s.content ?? {}, null, 2) });
    setSectionDialogOpen(true);
  };

  const onTypeChange = (type: string) => {
    const tpl = SECTION_TYPES.find((s) => s.value === type)?.template ?? {};
    setSectionForm({ type, contentJson: JSON.stringify(tpl, null, 2) });
  };

  const saveSection = async () => {
    if (!selectedPage) return;
    let parsed: any;
    try {
      parsed = JSON.parse(sectionForm.contentJson || "{}");
    } catch (e: any) {
      toast({ variant: "destructive", title: "Invalid JSON", description: e.message });
      return;
    }
    setSaving(true);
    if (editingSection) {
      const { error } = await supabase
        .from("custom_page_sections")
        .update({ type: sectionForm.type, content: parsed })
        .eq("id", editingSection.id);
      setSaving(false);
      if (error) return toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      const nextOrder = sections.length ? Math.max(...sections.map((s) => s.sort_order)) + 1 : 0;
      const { error } = await supabase.from("custom_page_sections").insert({
        page_id: selectedPage.id,
        type: sectionForm.type,
        content: parsed,
        sort_order: nextOrder,
      });
      setSaving(false);
      if (error) return toast({ variant: "destructive", title: "Error", description: error.message });
    }
    toast({ title: editingSection ? "Section updated" : "Section added" });
    setSectionDialogOpen(false);
    loadSections(selectedPage.id);
  };

  const deleteSection = async (s: Section) => {
    if (!confirm("Delete this section?")) return;
    await supabase.from("custom_page_sections").delete().eq("id", s.id);
    if (selectedPage) loadSections(selectedPage.id);
  };

  const moveSection = async (s: Section, dir: -1 | 1) => {
    const idx = sections.findIndex((x) => x.id === s.id);
    const swap = sections[idx + dir];
    if (!swap) return;
    await Promise.all([
      supabase.from("custom_page_sections").update({ sort_order: swap.sort_order }).eq("id", s.id),
      supabase.from("custom_page_sections").update({ sort_order: s.sort_order }).eq("id", swap.id),
    ]);
    if (selectedPage) loadSections(selectedPage.id);
  };

  // ---------- Page list view ----------
  if (!selectedPage) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Custom Pages</h1>
              <p className="text-muted-foreground">
                Create new pages with reusable sections. Available at <code>/your-slug</code>.
              </p>
            </div>
            <Dialog open={pageDialogOpen} onOpenChange={setPageDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewPage}>
                  <Plus className="h-4 w-4 mr-2" /> New Page
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>{editingPage ? "Edit Page" : "New Page"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={pageForm.title}
                        onChange={(e) =>
                          setPageForm({
                            ...pageForm,
                            title: e.target.value,
                            slug: editingPage ? pageForm.slug : slugify(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug</Label>
                      <Input
                        value={pageForm.slug}
                        onChange={(e) => setPageForm({ ...pageForm, slug: slugify(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea
                      value={pageForm.meta_description}
                      onChange={(e) => setPageForm({ ...pageForm, meta_description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>OG Image URL</Label>
                    <Input
                      value={pageForm.og_image}
                      onChange={(e) => setPageForm({ ...pageForm, og_image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={pageForm.published}
                      onCheckedChange={(v) => setPageForm({ ...pageForm, published: v })}
                    />
                    <Label>Published</Label>
                  </div>
                  <Button onClick={savePage} disabled={saving} className="w-full">
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingPage ? "Update" : "Create"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : pages.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No custom pages yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-3">
              {pages.map((p) => (
                <Card key={p.id}>
                  <CardContent className="py-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{p.title}</h3>
                        {!p.published && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">
                            Draft
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">/{p.slug}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {p.published && (
                        <Button asChild variant="outline" size="icon">
                          <Link to={`/${p.slug}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                      <Button variant="default" size="sm" onClick={() => openPageEditor(p)}>
                        Edit Sections
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => openEditPage(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => deletePage(p)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

  // ---------- Section editor view ----------
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedPage(null)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{selectedPage.title}</h1>
              <p className="text-sm text-muted-foreground">/{selectedPage.slug}</p>
            </div>
          </div>
          <Dialog open={sectionDialogOpen} onOpenChange={setSectionDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewSection}>
                <Plus className="h-4 w-4 mr-2" /> Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingSection ? "Edit Section" : "New Section"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Section Type</Label>
                  <Select value={sectionForm.type} onValueChange={onTypeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTION_TYPES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Content (JSON)</Label>
                  <Textarea
                    value={sectionForm.contentJson}
                    onChange={(e) => setSectionForm({ ...sectionForm, contentJson: e.target.value })}
                    className="min-h-[360px] font-mono text-sm"
                  />
                </div>
                <Button onClick={saveSection} disabled={saving} className="w-full">
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingSection ? "Update" : "Add"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {sections.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No sections yet. Add a Hero, Text, Image, CTA, or FAQ to start building.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {sections.map((s, idx) => (
              <Card key={s.id}>
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/15 text-primary font-medium">
                        {SECTION_TYPES.find((t) => t.value === s.type)?.label ?? s.type}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground truncate mt-1">
                      {s.content?.heading || s.content?.title || Object.keys(s.content || {}).join(", ")}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={idx === 0}
                      onClick={() => moveSection(s, -1)}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={idx === sections.length - 1}
                      onClick={() => moveSection(s, 1)}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openEditSection(s)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => deleteSection(s)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
