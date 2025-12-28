import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/MobileMenu";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { SearchDialog } from "@/components/SearchDialog";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  const handleContactClick = () => {
    if (isHomePage) {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 animate-slide-up">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group cursor-pointer">
            <img src={logo} alt="CWP Logo" className="w-10 h-10 object-contain rounded-[5%] group-hover:scale-110 transition-transform duration-300" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm hover:text-primary transition-all relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/about" className="text-sm hover:text-primary transition-all relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/services" className="text-sm hover:text-primary transition-all relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/portfolio" className="text-sm hover:text-primary transition-all relative group">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link to="/blog" className="text-sm hover:text-primary transition-all relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <button onClick={handleContactClick} className="text-sm hover:text-primary transition-all relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="hidden md:inline-flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button className="hidden md:inline-flex" onClick={handleContactClick}>
              Contact Us
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </nav>
  );
};
