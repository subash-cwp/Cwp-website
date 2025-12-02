import { useEffect } from "react";

interface OrganizationSchema {
  type: "Organization";
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
  };
  sameAs?: string[];
}

interface ArticleSchema {
  type: "Article";
  headline: string;
  description: string;
  image?: string;
  author: string;
  datePublished: string;
  dateModified?: string;
}

interface BreadcrumbSchema {
  type: "BreadcrumbList";
  items: { name: string; url: string }[];
}

interface FAQSchema {
  type: "FAQPage";
  questions: { question: string; answer: string }[];
}

type SchemaType = OrganizationSchema | ArticleSchema | BreadcrumbSchema | FAQSchema;

interface JsonLdProps {
  schema: SchemaType;
}

export const JsonLd = ({ schema }: JsonLdProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = `jsonld-${schema.type}`;

    let jsonLd: object;

    switch (schema.type) {
      case "Organization":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: schema.name,
          url: schema.url,
          logo: schema.logo,
          description: schema.description,
          contactPoint: schema.contactPoint
            ? {
                "@type": "ContactPoint",
                telephone: schema.contactPoint.telephone,
                contactType: schema.contactPoint.contactType,
              }
            : undefined,
          sameAs: schema.sameAs,
        };
        break;

      case "Article":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: schema.headline,
          description: schema.description,
          image: schema.image,
          author: {
            "@type": "Person",
            name: schema.author,
          },
          datePublished: schema.datePublished,
          dateModified: schema.dateModified || schema.datePublished,
        };
        break;

      case "BreadcrumbList":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: schema.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };
        break;

      case "FAQPage":
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: schema.questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          })),
        };
        break;
    }

    script.textContent = JSON.stringify(jsonLd);

    // Remove existing script with same id
    const existing = document.getElementById(script.id);
    if (existing) existing.remove();

    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(script.id);
      if (el) el.remove();
    };
  }, [schema]);

  return null;
};
