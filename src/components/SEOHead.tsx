import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export const SEOHead = ({
  title = "CWP Marketing - Strategic Marketing & Growth Consulting",
  description = "We build, grow and help you scale. Strategic marketing, creative solutions, and growth consulting that aligns with your brand's vision. Trusted by 100+ brands.",
  keywords = "marketing agency, growth consulting, digital marketing, SEO, social media marketing, brand strategy, Chennai",
  ogImage = "/og-image.png",
  ogType = "website",
  canonicalUrl,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:type", ogType, true);
    if (canonicalUrl) {
      updateMetaTag("og:url", canonicalUrl, true);
    }

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);

    // Canonical URL
    if (canonicalUrl) {
      let canonicalElement = document.querySelector('link[rel="canonical"]');
      if (!canonicalElement) {
        canonicalElement = document.createElement("link");
        canonicalElement.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.setAttribute("href", canonicalUrl);
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);

  return null;
};
