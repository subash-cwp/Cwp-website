import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import NotFound from "./NotFound";
import DOMPurify from "dompurify";

interface Page {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  og_image: string | null;
  published: boolean;
}

interface Section {
  id: string;
  type: string;
  content: any;
  sort_order: number;
}

const RESERVED = new Set([
  "about", "services", "portfolio", "pricing", "blog", "case-studies",
  "careers", "resources", "privacy-policy", "contact", "auth", "admin",
]);

function Hero({ c }: { c: any }) {
  return (
    <section className="container-custom py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          {c.eyebrow && <p className="text-sm uppercase tracking-wider text-primary">{c.eyebrow}</p>}
          {c.heading && <h1 className="text-4xl md:text-6xl font-bold leading-tight">{c.heading}</h1>}
          {c.subheading && <p className="text-lg text-muted-foreground">{c.subheading}</p>}
          {c.ctaLabel && c.ctaHref && (
            <Button asChild size="lg"><a href={c.ctaHref}>{c.ctaLabel}</a></Button>
          )}
        </div>
        {c.image && <img src={c.image} alt={c.heading || ""} className="rounded-xl w-full" />}
      </div>
    </section>
  );
}

function TextBlock({ c }: { c: any }) {
  return (
    <section className="container-custom py-12">
      <div className="max-w-3xl mx-auto space-y-4">
        {c.heading && <h2 className="text-3xl font-bold">{c.heading}</h2>}
        {c.body && (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.body) }}
          />
        )}
      </div>
    </section>
  );
}

function ImageBlock({ c }: { c: any }) {
  if (!c.src) return null;
  return (
    <section className="container-custom py-12">
      <figure className="max-w-4xl mx-auto">
        <img src={c.src} alt={c.alt || ""} className="rounded-xl w-full" />
        {c.caption && <figcaption className="text-center text-sm text-muted-foreground mt-3">{c.caption}</figcaption>}
      </figure>
    </section>
  );
}

function ImageText({ c }: { c: any }) {
  const reverse = c.imagePosition === "right";
  return (
    <section className="container-custom py-12">
      <div className={`grid md:grid-cols-2 gap-10 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        {c.image && <img src={c.image} alt={c.heading || ""} className="rounded-xl w-full" />}
        <div className="space-y-4">
          {c.heading && <h2 className="text-3xl font-bold">{c.heading}</h2>}
          {c.body && (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.body) }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function CTA({ c }: { c: any }) {
  return (
    <section className="container-custom py-16">
      <div className="bg-primary/10 border border-primary/30 rounded-2xl p-10 text-center space-y-4">
        {c.heading && <h2 className="text-3xl md:text-4xl font-bold">{c.heading}</h2>}
        {c.body && <p className="text-muted-foreground max-w-2xl mx-auto">{c.body}</p>}
        {c.ctaLabel && c.ctaHref && (
          <Button asChild size="lg"><a href={c.ctaHref}>{c.ctaLabel}</a></Button>
        )}
      </div>
    </section>
  );
}

function FAQBlock({ c }: { c: any }) {
  const items = Array.isArray(c.items) ? c.items : [];
  return (
    <section className="container-custom py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        {c.heading && <h2 className="text-3xl font-bold text-center">{c.heading}</h2>}
        <div className="divide-y divide-border border border-border rounded-xl">
          {items.map((it: any, i: number) => (
            <details key={i} className="p-5 group">
              <summary className="cursor-pointer font-medium">{it.q}</summary>
              <p className="mt-2 text-muted-foreground">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ c }: { c: any }) {
  const imgs = Array.isArray(c.images) ? c.images : [];
  return (
    <section className="container-custom py-12">
      {c.heading && <h2 className="text-3xl font-bold text-center mb-8">{c.heading}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imgs.map((im: any, i: number) => (
          <img key={i} src={im.src} alt={im.alt || ""} className="rounded-lg w-full h-full object-cover" />
        ))}
      </div>
    </section>
  );
}

function EmbedHtml({ c }: { c: any }) {
  return (
    <section className="container-custom py-12">
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.html || "") }}
      />
    </section>
  );
}

const RENDERERS: Record<string, React.FC<{ c: any }>> = {
  hero: Hero,
  text: TextBlock,
  image: ImageBlock,
  image_text: ImageText,
  cta: CTA,
  faq: FAQBlock,
  gallery: Gallery,
  embed_html: EmbedHtml,
};

export default function CustomPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!slug || RESERVED.has(slug)) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data: p } = await supabase
        .from("custom_pages")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!active) return;
      if (!p) {
        setPage(null);
        setLoading(false);
        return;
      }
      setPage(p as Page);
      const { data: secs } = await supabase
        .from("custom_page_sections")
        .select("*")
        .eq("page_id", (p as Page).id)
        .order("sort_order");
      if (!active) return;
      setSections((secs as Section[]) || []);
      setLoading(false);
    };
    run();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!page) return <NotFound />;

  return (
    <>
      <SEOHead
        title={`${page.title} | CWP Marketing`}
        description={page.meta_description || page.title}
        ogImage={page.og_image || undefined}
        canonicalUrl={`https://consultwithprofessionals.com/${page.slug}`}
      />
      <Navbar />
      <main className="pt-20">
        {sections.map((s) => {
          const Cmp = RENDERERS[s.type];
          if (!Cmp) return null;
          return <Cmp key={s.id} c={s.content || {}} />;
        })}
      </main>
      <Footer />
    </>
  );
}
