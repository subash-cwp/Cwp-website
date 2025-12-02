export const ClientLogos = () => {
  const row1Logos = [
    "Onius", "Aadicura", "EAGLYTICS CO.", "GODeZ", "X-REC", "implemify", "FILII"
  ];
  
  const row2Logos = [
    "MARS DEVS", "NamaSYS Analytics", "leadrat", "wellversed MEDIA", "TIGERS", "WESSON"
  ];
  
  const row3Logos = [
    "Leonstride", "Smarten", "MCS", "Ranlethi", "Enterprize", "Corefactors", "Chennai Beach"
  ];

  return (
    <section className="section-spacing bg-background/50 overflow-hidden">
      <div className="mb-12 text-center">
        <h3 className="text-2xl font-semibold text-muted-foreground">
          Trusted by 100+ Brands
        </h3>
      </div>
      
      {/* Row 1 - Right to Left */}
      <div className="relative mb-8 overflow-hidden bg-background/30 py-6">
        <div className="flex gap-12 animate-scroll-rtl">
          {[...row1Logos, ...row1Logos, ...row1Logos].map((client, index) => (
            <div
              key={index}
              className="text-xl font-semibold text-muted-foreground/70 whitespace-nowrap flex-shrink-0"
            >
              {client}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Left to Right */}
      <div className="relative mb-8 overflow-hidden bg-muted/20 py-6">
        <div className="flex gap-12 animate-scroll-ltr">
          {[...row2Logos, ...row2Logos, ...row2Logos].map((client, index) => (
            <div
              key={index}
              className="text-xl font-semibold text-muted-foreground/70 whitespace-nowrap flex-shrink-0"
            >
              {client}
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Right to Left */}
      <div className="relative overflow-hidden bg-background/30 py-6">
        <div className="flex gap-12 animate-scroll-rtl">
          {[...row3Logos, ...row3Logos, ...row3Logos].map((client, index) => (
            <div
              key={index}
              className="text-xl font-semibold text-muted-foreground/70 whitespace-nowrap flex-shrink-0"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
