export const ClientLogos = () => {
  const clients = [
    'Amaneira Consulting', 'IQONIC DESIGN', 'Prise',
    'Cogniti', 'Zelyus', 'Aura',
    'Optessed', 'Devs', 'NameSYS Analytics',
    'Leadrat', 'InfuiLac', 'Kings Way',
    'Leasezirite', 'Smarten', 'MCS'
  ];

  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-card/50 rounded-lg border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105"
            >
              <span className="text-sm font-medium text-muted-foreground text-center">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
