import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./JsonLd";

const routeNames: Record<string, string> = {
  "": "Home",
  about: "About",
  services: "Services",
  portfolio: "Portfolio",
  blog: "Blog",
  "case-studies": "Case Studies",
  pricing: "Pricing",
  careers: "Careers",
  resources: "Resources",
  "privacy-policy": "Privacy Policy",
  admin: "Admin",
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) return null;

  const breadcrumbItems = [
    { name: "Home", url: window.location.origin },
    ...pathSegments.map((segment, index) => ({
      name: routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      url: `${window.location.origin}/${pathSegments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <>
      <JsonLd schema={{ type: "BreadcrumbList", items: breadcrumbItems }} />
      <nav className="flex items-center gap-2 text-sm text-muted-foreground py-4">
        <Link to="/" className="hover:text-primary transition-colors">
          <Home className="h-4 w-4" />
        </Link>
        {pathSegments.map((segment, index) => (
          <div key={segment} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {index === pathSegments.length - 1 ? (
              <span className="text-foreground font-medium">
                {routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")}
              </span>
            ) : (
              <Link
                to={`/${pathSegments.slice(0, index + 1).join("/")}`}
                className="hover:text-primary transition-colors"
              >
                {routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};
