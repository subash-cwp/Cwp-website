import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Loader2, Play, Pause, Trophy, Trash2, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ABTest {
  id: string;
  name: string;
  description: string | null;
  variant_a: any;
  variant_b: any;
  traffic_split: number;
  status: string;
  winner: string | null;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
}

interface TestResult {
  variant: string;
  visitors: number;
  conversions: number;
  rate: number;
}

export default function ABTestingAdmin() {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resultsDialog, setResultsDialog] = useState<ABTest | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    description: "",
    variant_a: { text: "", color: "" },
    variant_b: { text: "", color: "" },
    traffic_split: 50,
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    const { data } = await supabase
      .from("ab_tests")
      .select("*")
      .order("created_at", { ascending: false });
    setTests(data || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!form.name) {
      toast({ title: "Please enter a test name", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("ab_tests").insert([{
      name: form.name,
      description: form.description,
      variant_a: form.variant_a,
      variant_b: form.variant_b,
      traffic_split: form.traffic_split,
    }]);

    if (error) {
      toast({ title: "Error creating test", variant: "destructive" });
    } else {
      toast({ title: "A/B test created" });
      setDialogOpen(false);
      setForm({ name: "", description: "", variant_a: { text: "", color: "" }, variant_b: { text: "", color: "" }, traffic_split: 50 });
      fetchTests();
    }
  };

  const toggleTestStatus = async (test: ABTest) => {
    const newStatus = test.status === "active" ? "paused" : "active";
    const updates: any = { status: newStatus };
    
    if (newStatus === "active" && !test.started_at) {
      updates.started_at = new Date().toISOString();
    }

    await supabase.from("ab_tests").update(updates).eq("id", test.id);
    toast({ title: `Test ${newStatus}` });
    fetchTests();
  };

  const endTest = async (test: ABTest, winner: string) => {
    await supabase.from("ab_tests").update({
      status: "completed",
      winner,
      ended_at: new Date().toISOString(),
    }).eq("id", test.id);
    toast({ title: `Test completed. Winner: Variant ${winner.toUpperCase()}` });
    setResultsDialog(null);
    fetchTests();
  };

  const deleteTest = async (id: string) => {
    if (!confirm("Delete this test?")) return;
    await supabase.from("ab_tests").delete().eq("id", id);
    toast({ title: "Test deleted" });
    fetchTests();
  };

  const viewResults = async (test: ABTest) => {
    const { data } = await supabase
      .from("ab_test_results")
      .select("variant, converted")
      .eq("test_id", test.id);

    const results: { [key: string]: TestResult } = {
      a: { variant: "A", visitors: 0, conversions: 0, rate: 0 },
      b: { variant: "B", visitors: 0, conversions: 0, rate: 0 },
    };

    data?.forEach(row => {
      results[row.variant].visitors++;
      if (row.converted) results[row.variant].conversions++;
    });

    results.a.rate = results.a.visitors ? (results.a.conversions / results.a.visitors) * 100 : 0;
    results.b.rate = results.b.visitors ? (results.b.conversions / results.b.visitors) * 100 : 0;

    setTestResults([results.a, results.b]);
    setResultsDialog(test);
  };

  const getStatusBadge = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: "bg-gray-500/20 text-gray-500",
      active: "bg-green-500/20 text-green-500",
      paused: "bg-yellow-500/20 text-yellow-500",
      completed: "bg-blue-500/20 text-blue-500",
    };
    return <Badge className={colors[status] || ""}>{status}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">A/B Testing</h1>
            <p className="text-muted-foreground">Test and optimize your content</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Test
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create A/B Test</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Test Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Homepage CTA Button"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Testing different CTA text and colors..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Variant A (Control)</Label>
                    <Input
                      value={form.variant_a.text}
                      onChange={(e) => setForm({ ...form, variant_a: { ...form.variant_a, text: e.target.value } })}
                      placeholder="Button text"
                    />
                    <Input
                      value={form.variant_a.color}
                      onChange={(e) => setForm({ ...form, variant_a: { ...form.variant_a, color: e.target.value } })}
                      placeholder="Button color (e.g., primary)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Variant B (Test)</Label>
                    <Input
                      value={form.variant_b.text}
                      onChange={(e) => setForm({ ...form, variant_b: { ...form.variant_b, text: e.target.value } })}
                      placeholder="Button text"
                    />
                    <Input
                      value={form.variant_b.color}
                      onChange={(e) => setForm({ ...form, variant_b: { ...form.variant_b, color: e.target.value } })}
                      placeholder="Button color (e.g., secondary)"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Traffic Split: {form.traffic_split}% / {100 - form.traffic_split}%</Label>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={form.traffic_split}
                    onChange={(e) => setForm({ ...form, traffic_split: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <Button onClick={handleCreate} className="w-full">Create Test</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Tests</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : tests.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No A/B tests yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Traffic Split</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{test.name}</p>
                          {test.description && (
                            <p className="text-sm text-muted-foreground truncate max-w-xs">{test.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(test.status)}</TableCell>
                      <TableCell>{test.traffic_split}% / {100 - test.traffic_split}%</TableCell>
                      <TableCell>
                        {test.winner && (
                          <Badge className="bg-primary/20 text-primary">
                            <Trophy className="h-3 w-3 mr-1" />
                            Variant {test.winner.toUpperCase()}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(test.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {test.status !== "completed" && (
                            <Button variant="ghost" size="icon" onClick={() => toggleTestStatus(test)}>
                              {test.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => viewResults(test)}>
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteTest(test.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Results Dialog */}
        <Dialog open={!!resultsDialog} onOpenChange={() => setResultsDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Results: {resultsDialog?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {testResults.map((result) => (
                <div key={result.variant} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Variant {result.variant}</span>
                    <span className="text-muted-foreground">
                      {result.conversions} / {result.visitors} visitors
                    </span>
                  </div>
                  <Progress value={result.rate} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Conversion Rate: {result.rate.toFixed(2)}%
                  </p>
                </div>
              ))}
              {resultsDialog?.status === "active" && (
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => endTest(resultsDialog, "a")} className="flex-1">
                    <Trophy className="h-4 w-4 mr-2" />
                    Pick A as Winner
                  </Button>
                  <Button variant="outline" onClick={() => endTest(resultsDialog, "b")} className="flex-1">
                    <Trophy className="h-4 w-4 mr-2" />
                    Pick B as Winner
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}