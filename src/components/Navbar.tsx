import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/MobileMenu";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const handleContactClick = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src={logo} alt="CWP Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold">CWP</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-sm hover:text-primary transition-colors">Services</a>
            <a href="#portfolio" className="text-sm hover:text-primary transition-colors">Portfolio</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
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
