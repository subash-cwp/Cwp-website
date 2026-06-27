import { useEffect, useRef, useState } from "react";
import { Building2, Layers, Globe2, MessageSquare, TrendingUp } from "lucide-react";

interface StatProps {
  end: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
}

const AnimatedStat = ({ end, label, Icon, index }: StatProps) => {
  const [count, setCount] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const match = end.match(/^(\d+)(.*)$/);
    if (!match) return;
    const targetNumber = parseInt(match[1]);
    const suffix = match[2];
    const duration = 1800;
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current) + suffix);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div
      ref={ref}
      className="group relative flex flex-col items-center text-center px-4 py-6 transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-tight leading-none mb-3">
        {count}
      </div>
      <div className="text-xs md:text-sm font-medium uppercase tracking-wider text-primary-foreground/80 max-w-[14ch]">
        {label}
      </div>
    </div>
  );
};

export const AnimatedStats = () => {
  const stats = [
    { number: "100+", label: "Brands Trusted Us", Icon: Building2 },
    { number: "15+", label: "Industries Covered", Icon: Layers },
    { number: "36+", label: "Countries Reached", Icon: Globe2 },
    { number: "10K+", label: "Monthly Queries", Icon: MessageSquare },
    { number: "3X", label: "Revenue, Traffic & Engagement", Icon: TrendingUp },
  ];

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-8 md:p-12 shadow-2xl">
          {/* Decorative background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />

          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 divide-primary-foreground/15 md:divide-x">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                end={stat.number}
                label={stat.label}
                Icon={stat.Icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
