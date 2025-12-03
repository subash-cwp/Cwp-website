import { useEffect, useState } from "react";
import { Linkedin, Twitter, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { LazyImage } from "@/components/LazyImage";
import narenImage from "@/assets/team-naren.png";

interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  avatar: string | null;
  bio: string | null;
  linkedin: string | null;
  twitter: string | null;
}

// Fallback data - removed placeholder URLs
const fallbackTeam: TeamMember[] = [
  {
    id: "1",
    name: "Naren",
    role: "Founder & Chief Strategist",
    avatar: narenImage,
    bio: "15+ years driving digital growth for Fortune 500 companies. Strategic marketing expert with a passion for data-driven growth.",
    linkedin: "https://www.linkedin.com/in/naren-ethiraj-14834514b/",
    twitter: null
  },
];

export const TeamProfiles = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      // Only select non-sensitive fields (excluding email)
      const { data, error } = await supabase
        .from("team_members")
        .select("id, name, role, avatar, bio, linkedin, twitter")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      
      if (error || !data || data.length === 0) {
        setTeam(fallbackTeam);
      } else {
        setTeam(data);
      }
      setLoading(false);
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="section-spacing bg-muted/30 relative overflow-hidden">
        <div className="container-custom flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Meet the Team Behind Your <span className="text-gradient-primary relative">
              Growth
              <span className="absolute -inset-2 bg-primary/10 blur-2xl -z-10" />
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Industry veterans with proven track records in scaling businesses across every digital channel.
          </p>
        </div>

        <div className={`grid gap-8 ${team.length === 1 ? 'max-w-md mx-auto' : team.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : team.length === 3 ? 'md:grid-cols-3 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {team.map((member, index) => (
            <Card 
              key={member.id} 
              className="overflow-hidden group hover:shadow-2xl transition-all duration-500 relative hover-lift animate-scale-in border-border/50 hover:border-primary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-neon-cyan/0 group-hover:from-primary/10 group-hover:to-neon-cyan/10 transition-all duration-500 pointer-events-none" />
              
              <div className="aspect-square overflow-hidden relative">
                <LazyImage 
                  src={member.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"} 
                  alt={member.name}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary-glow transition-colors">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors">{member.bio}</p>
                <div className="flex gap-3">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:rotate-12 transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a 
                      href={member.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:-rotate-12 transition-all duration-300"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
