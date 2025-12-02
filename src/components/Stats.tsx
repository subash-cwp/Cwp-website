export const Stats = () => {
  const stats = [
    { number: "5+", label: "Years of Full Stack Marketing" },
    { number: "10K+", label: "Monthly Queries" },
    { number: "3X", label: "Increase in Revenue, Traffic & Engagement" },
    { number: "100+", label: "Brands Served" }
  ];

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary via-primary to-accent rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
