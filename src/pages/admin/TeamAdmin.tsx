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

interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  bio: string | null;
  avatar: string | null;
  linkedin: string | null;
  twitter: string | null;
  email: string | null;
  sort_order: number | null;
  published: boolean | null;
}

export default function TeamAdmin() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    avatar: "",
    linkedin: "",
    twitter: "",
    email: "",
    sort_order: 0,
    published: true,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data } = await supabase.from("team_members").select("*").order("sort_order");
    setMembers(data || []);
    setLoading(false);
  };

  const openDialog = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setForm({
        name: member.name,
        role: member.role || "",
        bio: member.bio || "",
        avatar: member.avatar || "",
        linkedin: member.linkedin || "",
        twitter: member.twitter || "",
        email: member.email || "",
        sort_order: member.sort_order || 0,
        published: member.published ?? true,
      });
    } else {
      setEditingMember(null);
      setForm({ name: "", role: "", bio: "", avatar: "", linkedin: "", twitter: "", email: "", sort_order: 0, published: true });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name) {
      toast({ variant: "destructive", title: "Name is required" });
      return;
    }

    setSaving(true);
    const data = {
      name: form.name,
      role: form.role || null,
      bio: form.bio || null,
      avatar: form.avatar || null,
      linkedin: form.linkedin || null,
      twitter: form.twitter || null,
      email: form.email || null,
      sort_order: form.sort_order,
      published: form.published,
    };

    const { error } = editingMember
      ? await supabase.from("team_members").update(data).eq("id", editingMember.id)
      : await supabase.from("team_members").insert(data);

    setSaving(false);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: editingMember ? "Updated" : "Created" });
      setDialogOpen(false);
      fetchMembers();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    fetchMembers();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Team Members</h1>
            <p className="text-muted-foreground">Manage your team</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}><Plus className="h-4 w-4 mr-2" /> Add Member</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingMember ? "Edit" : "New"} Team Member</DialogTitle>
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
                  <Label>Bio</Label>
                  <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Avatar URL</Label>
                  <Input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Twitter URL</Label>
                    <Input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                  <Label>Published</Label>
                </div>
                <Button onClick={handleSave} disabled={saving} className="w-full">
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingMember ? "Update" : "Create"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : members.length === 0 ? (
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">No team members yet.</p></CardContent></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <Card key={member.id}>
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">{member.name[0]}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{member.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openDialog(member)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}><Trash2 className="h-4 w-4" /></Button>
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
