import { useEffect, useRef, useState } from "react";

interface StatProps {
  end: string;
  label: string;
}

const AnimatedStat = ({ end, label }: StatProps) => {
  const [count, setCount] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Extract number and suffix (e.g., "5+" -> 5 and "+", "10K+" -> 10 and "K+")
    const match = end.match(/^(\d+)(.*)$/);
    if (!match) return;

    const targetNumber = parseInt(match[1]);
    const suffix = match[2];
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
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
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
        {count}
      </div>
      <div className="text-sm text-primary-foreground/80">{label}</div>
    </div>
  );
};

export const AnimatedStats = () => {
  const stats = [
    { number: "100+", label: "Brands Trusted Us" },
    { number: "15+", label: "Industries Covered" },
    { number: "36+", label: "Countries Reached" },
    { number: "10K+", label: "Monthly Queries" },
    { number: "3X", label: "Increase in Revenue, Traffic & Engagement" }
  ];

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary via-primary to-accent rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedStat key={index} end={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
