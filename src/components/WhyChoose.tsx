import { CheckCircle2, Users, Target, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "Marketing + Sales Under One Team",
    description: "From demand generation to qualification, follow-ups and closing support — one partner for the full revenue journey"
  },
  {
    icon: Users,
    title: "An Extended Growth & Revenue Team",
    description: "Senior strategists and sales specialists working alongside your team, with no hand-offs to junior staff"
  },
  {
    icon: Target,
    title: "Qualified Leads, Not Just Traffic",
    description: "We optimise for pipeline and closed deals, so every rupee spent is measured against revenue"
  },
  {
    icon: TrendingUp,
    title: "Transparent, Revenue-Level Reporting",
    description: "Live dashboards across marketing, pipeline and sales performance — weekly calls, no jargon"
  }
];

export const WhyChoose = () => {
  return (
    <section id="about" className="section-spacing bg-secondary/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why <span className="text-gradient-primary relative">
              Choose CWP?
              <span className="absolute -inset-2 bg-primary/10 blur-2xl -z-10 animate-pulse-glow" />
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex gap-4 group p-6 rounded-lg bg-card/30 border border-border/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-500 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <benefit.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-glow transition-colors">{benefit.title}</h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            CWP doesn't do one' size' fits' all. We tailor every strategy - from messaging to media channels - so it reflects your brand's unique strengths and aligns with your business goals. The whole point: Strategic alignment. Real results. And a partner that's got your back as you scale up.
          </p>
        </div>
      </div>
    </section>
  );
};
