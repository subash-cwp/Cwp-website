import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
  ];

  const handleContactClick = () => {
    setOpen(false);
    if (isHomePage) {
      setTimeout(() => {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.location.href = "/#contact";
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-lg font-bold">CWP</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className="text-left py-3 px-4 rounded-lg hover:bg-secondary transition-colors text-lg"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleContactClick}
            className="text-left py-3 px-4 rounded-lg hover:bg-secondary transition-colors text-lg"
          >
            Contact
          </button>
          <Button
            className="mt-4"
            onClick={handleContactClick}
          >
            Contact Us
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
