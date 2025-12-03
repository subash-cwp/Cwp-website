import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Star, TrendingUp, User, Search, Eye } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  source: string | null;
  score: number;
  score_factors: any;
  status: string;
  notes: string | null;
  read: boolean;
  created_at: string;
}

export default function LeadScoringAdmin() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, [filterStatus]);

  const fetchLeads = async () => {
    setLoading(true);
    let query = supabase
      .from("contact_submissions")
      .select("*")
      .order("score", { ascending: false });

    if (filterStatus !== "all") {
      query = query.eq("status", filterStatus);
    }

    const { data } = await query;
    setLeads(data || []);
    setLoading(false);
  };

  const calculateScore = async (lead: Lead) => {
    let score = 0;
    const factors: { [key: string]: number } = {};

    // Has company
    if (lead.company) {
      score += 20;
      factors.company = 20;
    }

    // Has phone
    if (lead.phone) {
      score += 15;
      factors.phone = 15;
    }

    // Has detailed message
    if (lead.message && lead.message.length > 100) {
      score += 25;
      factors.detailed_message = 25;
    } else if (lead.message && lead.message.length > 50) {
      score += 15;
      factors.message = 15;
    }

    // Business email domain
    const emailDomain = lead.email.split("@")[1];
    const freeEmails = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    if (!freeEmails.includes(emailDomain)) {
      score += 30;
      factors.business_email = 30;
    }

    // Source bonus
    if (lead.source === "referral") {
      score += 20;
      factors.referral = 20;
    }

    // Update in database
    await supabase
      .from("contact_submissions")
      .update({ score, score_factors: factors })
      .eq("id", lead.id);

    toast({ title: `Score updated: ${score}` });
    fetchLeads();
  };

  const updateLeadStatus = async (id: string, status: string) => {
    await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);
    toast({ title: `Status updated to ${status}` });
    fetchLeads();
  };

  const updateLeadNotes = async (id: string, notes: string) => {
    await supabase
      .from("contact_submissions")
      .update({ notes })
      .eq("id", id);
    toast({ title: "Notes saved" });
    fetchLeads();
  };

  const getScoreBadge = (score: number) => {
    if (score >= 70) return <Badge className="bg-green-500/20 text-green-500">Hot ({score})</Badge>;
    if (score >= 40) return <Badge className="bg-yellow-500/20 text-yellow-500">Warm ({score})</Badge>;
    return <Badge className="bg-gray-500/20 text-gray-500">Cold ({score})</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      new: "bg-blue-500/20 text-blue-500",
      contacted: "bg-purple-500/20 text-purple-500",
      qualified: "bg-green-500/20 text-green-500",
      converted: "bg-primary/20 text-primary",
      lost: "bg-red-500/20 text-red-500",
    };
    return <Badge className={colors[status] || "bg-muted"}>{status}</Badge>;
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Lead Scoring</h1>
          <p className="text-muted-foreground">Score and prioritize your leads</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hot Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">{leads.filter(l => l.score >= 70).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Warm Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-500">{leads.filter(l => l.score >= 40 && l.score < 70).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cold Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-500">{leads.filter(l => l.score < 40).length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {leads.length ? Math.round(leads.reduce((a, b) => a + b.score, 0) / leads.length) : 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredLeads.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No leads found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Score</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{getScoreBadge(lead.score)}</TableCell>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.company || "-"}</TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => calculateScore(lead)}>
                            <Star className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedLead(lead)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Lead Details: {lead.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p>{lead.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p>{lead.phone || "-"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Company</p>
                                    <p>{lead.company || "-"}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Source</p>
                                    <p>{lead.source || "Direct"}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                                  <p className="bg-muted p-3 rounded">{lead.message || "No message"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-2">Score Factors</p>
                                  <div className="flex flex-wrap gap-2">
                                    {lead.score_factors && Object.entries(lead.score_factors).map(([key, value]) => (
                                      <Badge key={key} variant="outline">
                                        {key.replace("_", " ")}: +{value as number}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-2">Update Status</p>
                                  <Select
                                    value={lead.status}
                                    onValueChange={(v) => updateLeadStatus(lead.id, v)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="contacted">Contacted</SelectItem>
                                      <SelectItem value="qualified">Qualified</SelectItem>
                                      <SelectItem value="converted">Converted</SelectItem>
                                      <SelectItem value="lost">Lost</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                                  <Textarea
                                    defaultValue={lead.notes || ""}
                                    placeholder="Add notes about this lead..."
                                    onBlur={(e) => updateLeadNotes(lead.id, e.target.value)}
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}