import { useState, useEffect } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headingElements = doc.querySelectorAll("h2, h3, h4");
    
    const items: TOCItem[] = [];
    headingElements.forEach((heading, index) => {
      const text = heading.textContent || "";
      const id = `heading-${index}`;
      const level = parseInt(heading.tagName.charAt(1));
      items.push({ id, text, level });
    });
    
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    // Add IDs to actual headings in the DOM after content renders
    const timer = setTimeout(() => {
      const articleContent = document.querySelector(".prose");
      if (!articleContent) return;

      const headingElements = articleContent.querySelectorAll("h2, h3, h4");
      headingElements.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });

      // Set up intersection observer for active heading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-100px 0px -80% 0px" }
      );

      headingElements.forEach((heading) => observer.observe(heading));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [content, headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-24 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
        <List className="w-4 h-4" />
        Table of Contents
      </div>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <button
              onClick={() => handleClick(heading.id)}
              className={cn(
                "text-sm text-left w-full hover:text-primary transition-colors line-clamp-2",
                activeId === heading.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Utility function to calculate read time
export const calculateReadTime = (content: string): string => {
  // Strip HTML tags and get plain text
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};
