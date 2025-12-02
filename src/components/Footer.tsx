import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-bold">CWP</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              CWP MARKETING STRATEGY & GROWTH CO LTD/PRIVATED LIMITED—GXR-2024 (NOT REGISTERED)
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-primary" />
              </a>
              <a href="#" className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold mb-4">USEFUL LINKS</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">SERVICES</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Growth Marketing</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Performance Marketing</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Full Stack Marketing</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Startup Marketing</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">Call Us: (+91) 9876543210</span>
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
            Copyright © All Rights Reserved cwp-mktng.org (2025). Privacy Policy.
          </p>
        </div>
      </div>
    </footer>
  );
};
