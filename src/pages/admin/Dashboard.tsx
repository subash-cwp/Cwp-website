import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Briefcase, Users, MessageSquare, Mail, TrendingUp } from "lucide-react";

interface Stats {
  blogPosts: number;
  caseStudies: number;
  teamMembers: number;
  testimonials: number;
  leads: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    blogPosts: 0,
    caseStudies: 0,
    teamMembers: 0,
    testimonials: 0,
    leads: 0,
    subscribers: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentLeads();
  }, []);

  const fetchStats = async () => {
    const [blogRes, caseRes, teamRes, testRes, leadsRes, subsRes] = await Promise.all([
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("case_studies").select("id", { count: "exact", head: true }),
      supabase.from("team_members").select("id", { count: "exact", head: true }),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
    ]);

    setStats({
      blogPosts: blogRes.count || 0,
      caseStudies: caseRes.count || 0,
      teamMembers: teamRes.count || 0,
      testimonials: testRes.count || 0,
      leads: leadsRes.count || 0,
      subscribers: subsRes.count || 0,
    });
  };

  const fetchRecentLeads = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    
    if (data) setRecentLeads(data);
  };

  const statCards = [
    { title: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-blue-500" },
    { title: "Case Studies", value: stats.caseStudies, icon: Briefcase, color: "text-green-500" },
    { title: "Team Members", value: stats.teamMembers, icon: Users, color: "text-purple-500" },
    { title: "Testimonials", value: stats.testimonials, icon: MessageSquare, color: "text-yellow-500" },
    { title: "Total Leads", value: stats.leads, icon: Mail, color: "text-red-500" },
    { title: "Subscribers", value: stats.subscribers, icon: TrendingUp, color: "text-cyan-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your CMS dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No leads yet</p>
            ) : (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </p>
                      {!lead.read && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">New</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
