import { Phone, Mail, MapPin, Clock, Linkedin, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const ContactInfo = () => {
  const { settings } = useSiteSettings();

  const contactCards = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Sat from 9am to 7pm",
      value: settings.company.phone,
      href: `tel:${settings.company.phone.replace(/\s/g, "")}`,
      color: "primary",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      value: settings.company.email,
      href: `mailto:${settings.company.email}`,
      color: "neon-cyan",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick responses via chat",
      value: "Chat with us",
      href: `https://wa.me/${settings.integrations.whatsappNumber.replace(/[^0-9]/g, "")}`,
      color: "neon-purple",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      value: "Chennai, Tamil Nadu",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.company.address)}`,
      color: "primary",
    },
  ];

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Multiple Ways to <span className="text-gradient-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the most convenient way to reach out to us. We're always ready to help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => (
            <a
              key={card.title}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative bg-card border border-border/50 rounded-2xl p-6 hover-lift hover-glow transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-${card.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-7 h-7 text-${card.color}`} />
              </div>

              {/* Content */}
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {card.description}
              </p>
              <p className="font-medium text-foreground">
                {card.value}
              </p>

              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none" />
            </a>
          ))}
        </div>

        {/* Business Hours */}
        <div className="mt-12 bg-card/50 border border-border/50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Business Hours</h3>
                <p className="text-muted-foreground">We're here when you need us</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-center md:text-left">
              <div>
                <p className="font-semibold">Monday - Friday</p>
                <p className="text-muted-foreground">9:00 AM - 7:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Saturday</p>
                <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Sunday</p>
                <p className="text-muted-foreground">Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
