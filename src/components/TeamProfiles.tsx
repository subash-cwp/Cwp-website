import { Linkedin, Twitter } from "lucide-react";
import { Card } from "@/components/ui/card";

export const TeamProfiles = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Chief Strategist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      bio: "15+ years driving digital growth for Fortune 500 companies. Harvard MBA with a passion for data-driven marketing.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Michael Chen",
      role: "Head of Performance Marketing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      bio: "Former Google Ads specialist. Generated $50M+ in revenue through paid campaigns. Stanford Computer Science.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Emily Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      bio: "Award-winning designer with 200+ successful brand campaigns. Parsons School of Design graduate.",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Park",
      role: "SEO & Content Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      bio: "Built organic traffic to 1M+ monthly visitors for multiple clients. Published author on content strategy.",
      linkedin: "#",
      twitter: "#"
    }
  ];

  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Meet the Team Behind Your Growth
          </h2>
          <p className="text-xl text-muted-foreground">
            Industry veterans with proven track records in scaling businesses across every digital channel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={member.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
