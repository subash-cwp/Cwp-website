import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Check, Trash2, ExternalLink } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  source: string | null;
  read: boolean | null;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  subscribed: boolean | null;
  created_at: string;
}

export default function LeadsAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [leadsRes, subsRes] = await Promise.all([
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
    ]);
    setLeads(leadsRes.data || []);
    setSubscribers(subsRes.data || []);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabase.from("contact_submissions").update({ read: true }).eq("id", id);
    fetchData();
    toast({ title: "Marked as read" });
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    fetchData();
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return;
    await supabase.from("newsletter_subscribers").delete().eq("id", id);
    fetchData();
  };

  const exportLeads = () => {
    const csv = [
      ["Name", "Email", "Phone", "Company", "Message", "Source", "Date"].join(","),
      ...leads.map(l => [l.name, l.email, l.phone || "", l.company || "", `"${(l.message || "").replace(/"/g, '""')}"`, l.source || "", l.created_at].join(","))
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  const exportSubscribers = () => {
    const csv = [
      ["Email", "Date"].join(","),
      ...subscribers.map(s => [s.email, s.created_at].join(","))
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Leads & Subscribers</h1>
          <p className="text-muted-foreground">Manage your contacts</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : (
          <Tabs defaultValue="leads">
            <TabsList>
              <TabsTrigger value="leads">Contact Leads ({leads.length})</TabsTrigger>
              <TabsTrigger value="subscribers">Newsletter ({subscribers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="mt-6">
              <div className="flex justify-end mb-4">
                <Button variant="outline" onClick={exportLeads}>
                  <ExternalLink className="h-4 w-4 mr-2" /> Export CSV
                </Button>
              </div>
              {leads.length === 0 ? (
                <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">No leads yet.</p></CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <Card key={lead.id} className={!lead.read ? "border-primary/50" : ""}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{lead.name}</h3>
                              {!lead.read && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">New</span>}
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p><Mail className="h-3 w-3 inline mr-1" />{lead.email}</p>
                              {lead.phone && <p>Phone: {lead.phone}</p>}
                              {lead.company && <p>Company: {lead.company}</p>}
                              {lead.source && <p>Source: {lead.source}</p>}
                            </div>
                            {lead.message && (
                              <p className="mt-3 text-sm bg-muted/50 p-3 rounded">{lead.message}</p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(lead.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {!lead.read && (
                              <Button variant="outline" size="icon" onClick={() => markAsRead(lead.id)}>
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="outline" size="icon" onClick={() => deleteLead(lead.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="subscribers" className="mt-6">
              <div className="flex justify-end mb-4">
                <Button variant="outline" onClick={exportSubscribers}>
                  <ExternalLink className="h-4 w-4 mr-2" /> Export CSV
                </Button>
              </div>
              {subscribers.length === 0 ? (
                <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">No subscribers yet.</p></CardContent></Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Email Subscribers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y divide-border">
                      {subscribers.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium">{sub.email}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(sub.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => deleteSubscriber(sub.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
}
