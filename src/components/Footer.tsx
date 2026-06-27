import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Newsletter } from "@/components/Newsletter";
import { FooterContactForm } from "@/components/FooterContactForm";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const { settings } = useSiteSettings();

  const socialLinks = [
    { icon: Linkedin, url: settings.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, url: settings.social.twitter, label: "Twitter" },
    { icon: Facebook, url: settings.social.facebook, label: "Facebook" },
    { icon: Instagram, url: settings.social.instagram, label: "Instagram" },
    { icon: Youtube, url: settings.social.youtube, label: "YouTube" },
  ].filter(link => link.url && link.url.trim() !== "");

  return (
    <footer className="bg-card/80 border-t border-border/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom py-16 relative">
        {/* Newsletter Section */}
        <div className="mb-16">
          <Newsletter />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
          <Link to="/" className="flex items-center mb-4 group">
            <img src={logo} alt="CWP Logo" className="w-10 h-10 object-contain rounded-[5%] group-hover:scale-110 transition-transform" />
          </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {settings.company.description || "CWP MARKETING STRATEGY & GROWTH CO LTD/PRIVATED LIMITED - GXR-2024 (NOT REGISTERED)"}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold mb-6 text-primary">USEFUL LINKS</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Blog", href: "/blog" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Resources", href: "/resources" },
                { label: "Careers", href: "/careers" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6 text-primary">SERVICES</h4>
            <ul className="space-y-3">
              {[
                { label: "Strategy & Planning", slug: "strategy-planning" },
                { label: "Performance Marketing", slug: "performance-marketing" },
                { label: "SEO & Organic Growth", slug: "seo-organic-growth" },
                { label: "CRM & Marketing Automation", slug: "crm-marketing-automation" },
                { label: "Content Marketing", slug: "content-marketing" },
                { label: "Social Media Management", slug: "social-media-management" },
                { label: "Creative & Branding", slug: "creative-branding" },
                { label: "Outreach & Demand Gen", slug: "outreach-demand-generation" },
              ].map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-primary">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Call Us</p>
                  <a
                    href={`tel:${settings.company.phone.replace(/\s/g, "")}`}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {settings.company.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Email Us</p>
                  <a
                    href={`mailto:${settings.company.email}`}
                    className="text-sm hover:text-primary transition-colors break-all leading-snug block"
                  >
                    {settings.company.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Visit Us</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {settings.company.address}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Contact Form */}
          <div>
            <h4 className="font-bold mb-6 text-primary">QUICK MESSAGE</h4>
            <FooterContactForm />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Copyright © {new Date().getFullYear()} CWP Marketing. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
