import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  company: {
    name: string;
    tagline: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    logo: string;
  };
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
  };
  integrations: {
    whatsappNumber: string;
    calendlyLink: string;
    googleAnalyticsId: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
  };
}

const defaultSettings: SiteSettings = {
  company: {
    name: "CWP Marketing",
    tagline: "We Help Brands Grow Strategically",
    description: "Full-service digital marketing agency specializing in performance marketing, SEO, and brand strategy.",
    email: "support@consultwithprofessionals.com",
    phone: "+91 8610986622",
    address: "G2, Venkateswara Flat, No: 9A, 1st Main Rd, Venkateswara Nagar, Velachery, Chennai, Tamil Nadu 600042",
    logo: "",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/100370885",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },
  integrations: {
    whatsappNumber: "+918610986622",
    calendlyLink: "https://calendly.com/narenethiraj",
    googleAnalyticsId: "",
  },
  seo: {
    metaTitle: "CWP Marketing - Digital Marketing Agency",
    metaDescription: "Transform your business with data-driven digital marketing strategies.",
    keywords: "digital marketing, SEO, PPC, social media marketing",
    ogImage: "",
  },
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "main_settings")
          .maybeSingle();

        if (!error && data?.value) {
          const dbSettings = data.value as Record<string, unknown>;
          setSettings({
            company: {
              ...defaultSettings.company,
              ...(dbSettings.company as object || {}),
            },
            social: {
              ...defaultSettings.social,
              ...(dbSettings.social as object || {}),
            },
            integrations: {
              ...defaultSettings.integrations,
              ...(dbSettings.integrations as object || {}),
            },
            seo: {
              ...defaultSettings.seo,
              ...(dbSettings.seo as object || {}),
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};

export type { SiteSettings };
