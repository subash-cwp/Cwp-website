import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-xl font-bold">CWP</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-sm hover:text-primary transition-colors">Services</a>
            <a href="#portfolio" className="text-sm hover:text-primary transition-colors">Portfolio</a>
          </div>

          <div className="flex items-center gap-4">
            <Button className="hidden md:inline-flex">
              Contact Us
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
