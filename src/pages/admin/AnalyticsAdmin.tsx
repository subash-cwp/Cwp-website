import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, FileText, Eye, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AnalyticsAdmin() {
  const [timeRange, setTimeRange] = useState("7d");
  const [leadsByDate, setLeadsByDate] = useState<any[]>([]);
  const [subscribersByDate, setSubscribersByDate] = useState<any[]>([]);
  const [leadSources, setLeadSources] = useState<any[]>([]);
  const [contentStats, setContentStats] = useState({ blog: 0, cases: 0, testimonials: 0 });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch leads over time
    const { data: leads } = await supabase
      .from("contact_submissions")
      .select("created_at, source")
      .gte("created_at", startDate.toISOString());

    // Fetch subscribers over time
    const { data: subs } = await supabase
      .from("newsletter_subscribers")
      .select("created_at")
      .gte("created_at", startDate.toISOString());

    // Process leads by date
    const leadsByDay: { [key: string]: number } = {};
    leads?.forEach(lead => {
      const date = new Date(lead.created_at).toLocaleDateString();
      leadsByDay[date] = (leadsByDay[date] || 0) + 1;
    });
    setLeadsByDate(Object.entries(leadsByDay).map(([date, count]) => ({ date, leads: count })));

    // Process subscribers by date
    const subsByDay: { [key: string]: number } = {};
    subs?.forEach(sub => {
      const date = new Date(sub.created_at).toLocaleDateString();
      subsByDay[date] = (subsByDay[date] || 0) + 1;
    });
    setSubscribersByDate(Object.entries(subsByDay).map(([date, count]) => ({ date, subscribers: count })));

    // Process lead sources
    const sources: { [key: string]: number } = {};
    leads?.forEach(lead => {
      const source = lead.source || "Direct";
      sources[source] = (sources[source] || 0) + 1;
    });
    setLeadSources(Object.entries(sources).map(([name, value]) => ({ name, value })));

    // Fetch content counts
    const [blogRes, caseRes, testRes] = await Promise.all([
      supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("published", true),
      supabase.from("case_studies").select("id", { count: "exact", head: true }).eq("published", true),
      supabase.from("testimonials").select("id", { count: "exact", head: true }).eq("published", true),
    ]);
    setContentStats({
      blog: blogRes.count || 0,
      cases: caseRes.count || 0,
      testimonials: testRes.count || 0,
    });
  };

  const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))", "#22c55e", "#f59e0b"];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Track your website performance</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{leadsByDate.reduce((a, b) => a + b.leads, 0)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Subscribers</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{subscribersByDate.reduce((a, b) => a + b.subscribers, 0)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Published Blogs</CardTitle>
              <FileText className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{contentStats.blog}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Case Studies</CardTitle>
              <Eye className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{contentStats.cases}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Leads Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={leadsByDate}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscribers Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subscribersByDate}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="subscribers" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadSources.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Blog Posts</span>
                  <span className="font-bold">{contentStats.blog} published</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Case Studies</span>
                  <span className="font-bold">{contentStats.cases} published</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Testimonials</span>
                  <span className="font-bold">{contentStats.testimonials} published</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}