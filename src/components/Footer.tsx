import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { Newsletter } from "@/components/Newsletter";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="container-custom py-16">
        <div className="mb-12">
          <Newsletter />
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="CWP Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold">CWP</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              CWP MARKETING STRATEGY & GROWTH CO LTD/PRIVATED LIMITED—GXR-2024 (NOT REGISTERED)
            </p>
            <div className="flex gap-3">
              {/* TODO: Replace with your actual social media URLs */}
              <a href="https://linkedin.com/company/YOUR-LINKEDIN" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
              <a href="https://twitter.com/YOUR-TWITTER" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-primary" />
              </a>
              <a href="https://facebook.com/YOUR-FACEBOOK" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold mb-4">USEFUL LINKS</h4>
            <ul className="space-y-2">
              <li><a href="/#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="/#portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/case-studies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">Resources</a></li>
              <li><a href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">SERVICES</h4>
            <ul className="space-y-2">
              <li><a href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Growth Marketing</a></li>
              <li><a href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Performance Marketing</a></li>
              <li><a href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Full Stack Marketing</a></li>
              <li><a href="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Startup Marketing</a></li>
              <li><a href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Call Us: (+91) 8610986622</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <a href="mailto:hello@cwpmktng.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  hello@cwpmktng.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  No.34, Radhakrishnan St, West Mambalam, Chennai, Tamil Nadu 600033, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright © All Rights Reserved cwp-mktng.org (2025). <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};
