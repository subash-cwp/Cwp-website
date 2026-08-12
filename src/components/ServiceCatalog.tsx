import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { serviceCatalog, catalogServiceCount } from "@/data/serviceCatalog";
import {
  CalendarCheck,
  Database,
  Handshake,
  LineChart,
  Linkedin,
  Mail,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Repeat,
  Rocket,
  Search,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarCheck,
  Database,
  Handshake,
  LineChart,
  Linkedin,
  Mail,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Repeat,
  Rocket,
  Search,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
};

interface ServiceCatalogProps {
  /** Rendered as the section heading. */
  title?: string;
  subtitle?: string;
  /** Use h2 on pages where an h1 already exists. */
  headingLevel?: "h2" | "h3";
}

export const ServiceCatalog = ({
  title = "Full Service Catalogue",
  subtitle = "Marketing and sales under one team. Pick a category to see everything we can own for you.",
  headingLevel: Heading = "h2",
}: ServiceCatalogProps) => {
  return (
    <section id="service-catalogue" className="section-spacing relative">
      <div className="container-custom relative">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 text-primary border-primary/30">
            {catalogServiceCount}+ services across {serviceCatalog.length} categories
          </Badge>
          <Heading className="text-3xl md:text-4xl font-bold mb-3">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient-primary">{title.split(" ").slice(-1)}</span>
          </Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <Accordion type="multiple" className="grid gap-4 md:grid-cols-2">
          {serviceCatalog.map((category) => {
            const Icon = iconMap[category.icon] || Target;
            const count = category.groups.reduce((sum, g) => sum + g.items.length, 0);
            return (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="border border-border/50 rounded-xl bg-card px-4 md:px-5 h-fit data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left">
                  <span className="flex items-start gap-3 pr-2">
                    <span className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-base md:text-lg">
                        {category.title}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        {count} services · {category.summary}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="space-y-5">
                    {category.groups.map((group) => (
                      <div key={group.name}>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                          {group.name}
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <li
                              key={`${group.name}-${item}`}
                              className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-border/60 bg-background/60 text-muted-foreground"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};
