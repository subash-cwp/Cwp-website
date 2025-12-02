import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/MobileMenu";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navbar = () => {
  const handleContactClick = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 animate-slide-up">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 group cursor-pointer">
            <img src={logo} alt="CWP Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl font-bold group-hover:text-primary-glow transition-colors">CWP</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm hover:text-primary transition-all relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#about" className="text-sm hover:text-primary transition-all relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#services" className="text-sm hover:text-primary transition-all relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#portfolio" className="text-sm hover:text-primary transition-all relative group">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#contact" className="text-sm hover:text-primary transition-all relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button className="hidden md:inline-flex" onClick={handleContactClick}>
              Contact Us
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};
