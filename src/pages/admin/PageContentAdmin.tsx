import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Row {
  id: string;
  page_key: string;
  section_key: string;
  content: any;
  published: boolean;
}

const PAGES = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "contact", label: "Contact" },
  { key: "nav", label: "Navigation" },
  { key: "footer", label: "Footer" },
];

const SUGGESTED_SECTIONS: Record<string, string[]> = {
  home: ["hero", "stats", "why_choose", "process", "faq", "cta"],
  about: ["hero", "mission", "vision", "story", "values"],
  services: ["hero", "intro", "cta"],
  contact: ["hero", "info", "office"],
  nav: ["menu"],
  footer: ["about", "columns", "social", "legal"],
};

export default function PageContentAdmin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activePage, setActivePage] = useState("home");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState({
    section_key: "",
    contentJson: "{\n  \n}",
    published: true,
  });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_key", activePage)
      .order("section_key");
    setRows((data as Row[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const openNew = (suggested?: string) => {
    setEditing(null);
    setForm({
      section_key: suggested || "",
      contentJson: JSON.stringify(
        {
          heading: "",
          subheading: "",
          body: "",
          ctaLabel: "",
          ctaHref: "",
          image: "",
          items: [],
        },
        null,
        2,
      ),
      published: true,
    });
    setDialogOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    setForm({
      section_key: row.section_key,
      contentJson: JSON.stringify(row.content ?? {}, null, 2),
      published: row.published,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.section_key.trim()) {
      toast({ variant: "destructive", title: "Section key is required" });
      return;
    }
    let parsed: any;
    try {
      parsed = JSON.parse(form.contentJson || "{}");
    } catch (e: any) {
      toast({ variant: "destructive", title: "Invalid JSON", description: e.message });
      return;
    }
    setSaving(true);
    const payload = {
      page_key: activePage,
      section_key: form.section_key.trim(),
      content: parsed,
      published: form.published,
      updated_by: user?.id ?? null,
    };
    const { error } = editing
      ? await supabase.from("page_content").update(payload).eq("id", editing.id)
      : await supabase.from("page_content").upsert(payload, { onConflict: "page_key,section_key" });
    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
      return;
    }
    toast({ title: editing ? "Updated" : "Created" });
    setDialogOpen(false);
    load();
  };

  const handleDelete = async (row: Row) => {
    if (!confirm(`Delete section "${row.section_key}"?`)) return;
    const { error } = await supabase.from("page_content").delete().eq("id", row.id);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
      return;
    }
    load();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Page Content</h1>
          <p className="text-muted-foreground">
            Edit the text, images, CTAs, and lists shown on every public page.
          </p>
        </div>

        <Tabs value={activePage} onValueChange={setActivePage}>
          <TabsList className="flex flex-wrap h-auto">
            {PAGES.map((p) => (
              <TabsTrigger key={p.key} value={p.key}>
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {PAGES.map((p) => (
            <TabsContent key={p.key} value={p.key} className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Sections on <strong className="text-foreground">/{p.key === "home" ? "" : p.key}</strong>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openNew()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editing ? "Edit Section" : "New Section"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Section Key</Label>
                        <Input
                          value={form.section_key}
                          onChange={(e) => setForm({ ...form, section_key: e.target.value })}
                          placeholder="e.g. hero, cta, mission"
                          disabled={!!editing}
                        />
                        {!editing && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {(SUGGESTED_SECTIONS[activePage] ?? []).map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setForm({ ...form, section_key: s })}
                                className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/70 border"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Content (JSON)</Label>
                        <Textarea
                          value={form.contentJson}
                          onChange={(e) => setForm({ ...form, contentJson: e.target.value })}
                          className="min-h-[360px] font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          Common fields: <code>heading</code>, <code>subheading</code>, <code>body</code>,{" "}
                          <code>ctaLabel</code>, <code>ctaHref</code>, <code>image</code>, <code>items</code> (array).
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Switch
                          checked={form.published}
                          onCheckedChange={(v) => setForm({ ...form, published: v })}
                        />
                        <Label>Published</Label>
                      </div>

                      <Button onClick={handleSave} disabled={saving} className="w-full">
                        {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        {editing ? "Update" : "Create"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : rows.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No sections yet. Click "Add Section" to create one.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-3">
                  {rows.map((row) => (
                    <Card key={row.id}>
                      <CardContent className="py-4 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-semibold">{row.section_key}</code>
                            {!row.published && (
                              <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">
                                Draft
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate mt-1">
                            {Object.keys(row.content || {}).join(", ") || "empty"}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button variant="outline" size="icon" onClick={() => openEdit(row)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleDelete(row)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
}
