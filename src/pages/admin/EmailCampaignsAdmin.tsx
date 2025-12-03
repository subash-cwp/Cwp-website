import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Send, Loader2, Mail, Eye, MousePointer, Trash2, Edit } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  status: string;
  segment: string;
  sent_count: number;
  open_count: number;
  click_count: number;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
}

export default function EmailCampaignsAdmin() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    subject: "",
    content: "",
    segment: "all",
  });

  useEffect(() => {
    fetchCampaigns();
    fetchSubscriberCount();
  }, []);

  const fetchCampaigns = async () => {
    const { data } = await supabase
      .from("email_campaigns")
      .select("*")
      .order("created_at", { ascending: false });
    setCampaigns(data || []);
    setLoading(false);
  };

  const fetchSubscriberCount = async () => {
    const { count } = await supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("subscribed", true);
    setSubscriberCount(count || 0);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.subject || !form.content) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    if (editingCampaign) {
      const { error } = await supabase
        .from("email_campaigns")
        .update(form)
        .eq("id", editingCampaign.id);
      if (error) {
        toast({ title: "Error updating campaign", variant: "destructive" });
      } else {
        toast({ title: "Campaign updated" });
      }
    } else {
      const { error } = await supabase
        .from("email_campaigns")
        .insert([form]);
      if (error) {
        toast({ title: "Error creating campaign", variant: "destructive" });
      } else {
        toast({ title: "Campaign created" });
      }
    }

    setDialogOpen(false);
    setForm({ name: "", subject: "", content: "", segment: "all" });
    setEditingCampaign(null);
    fetchCampaigns();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this campaign?")) return;
    await supabase.from("email_campaigns").delete().eq("id", id);
    toast({ title: "Campaign deleted" });
    fetchCampaigns();
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setForm({
      name: campaign.name,
      subject: campaign.subject,
      content: campaign.content,
      segment: campaign.segment,
    });
    setDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: "bg-gray-500/20 text-gray-500",
      scheduled: "bg-blue-500/20 text-blue-500",
      sending: "bg-yellow-500/20 text-yellow-500",
      sent: "bg-green-500/20 text-green-500",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Email Campaigns</h1>
            <p className="text-muted-foreground text-sm sm:text-base">{subscriberCount} active subscribers</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingCampaign(null); setForm({ name: "", subject: "", content: "", segment: "all" }); }} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl mx-4 sm:mx-auto max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCampaign ? "Edit Campaign" : "Create Campaign"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Campaign Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Monthly Newsletter"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email Subject</Label>
                  <Input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Check out our latest updates!"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target Segment</Label>
                  <Select value={form.segment} onValueChange={(v) => setForm({ ...form, segment: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subscribers</SelectItem>
                      <SelectItem value="new">New Subscribers (30 days)</SelectItem>
                      <SelectItem value="active">Active Subscribers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Email Content (HTML supported)</Label>
                  <Textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="<h1>Hello!</h1><p>Your newsletter content here...</p>"
                    rows={8}
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  {editingCampaign ? "Update Campaign" : "Create Campaign"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" /> Total Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaigns.reduce((a, b) => a + b.sent_count, 0)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="h-4 w-4" /> Total Opens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaigns.reduce((a, b) => a + b.open_count, 0)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MousePointer className="h-4 w-4" /> Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{campaigns.reduce((a, b) => a + b.click_count, 0)}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : campaigns.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No campaigns yet</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Sent</TableHead>
                      <TableHead className="hidden md:table-cell">Opens</TableHead>
                      <TableHead className="hidden md:table-cell">Clicks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-xs text-muted-foreground sm:hidden truncate max-w-[150px]">{campaign.subject}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell max-w-xs truncate">{campaign.subject}</TableCell>
                        <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">{campaign.sent_count}</TableCell>
                        <TableCell className="hidden md:table-cell">{campaign.open_count}</TableCell>
                        <TableCell className="hidden md:table-cell">{campaign.click_count}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(campaign)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(campaign.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}