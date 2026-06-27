import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const SITE_ORIGIN = "https://consultwithprofessionals.com";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export const SEOHead = ({
  title = "CWP Marketing — Growth, SEO & Performance Marketing Agency",
  description = "Strategic marketing, SEO, paid ads, and growth consulting for D2C, SaaS, and B2B brands. 100+ brands served with 3x average growth.",
  keywords = "marketing agency, growth consulting, digital marketing, SEO, social media marketing, brand strategy, Chennai",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  canonicalUrl,
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    // Resolve canonical: explicit prop > current pathname against canonical origin.
    const resolvedCanonical =
      canonicalUrl ||
      (typeof window !== "undefined"
        ? `${SITE_ORIGIN}${window.location.pathname}`
        : SITE_ORIGIN);

    // Ensure ogImage is absolute.
    const resolvedOgImage = ogImage.startsWith("http")
      ? ogImage
      : `${SITE_ORIGIN}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

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

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", resolvedOgImage, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:url", resolvedCanonical, true);

    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", resolvedOgImage);
    updateMetaTag("twitter:url", resolvedCanonical);

    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute("href", resolvedCanonical);
  }, [title, description, keywords, ogImage, ogType, canonicalUrl]);

  return null;
};
