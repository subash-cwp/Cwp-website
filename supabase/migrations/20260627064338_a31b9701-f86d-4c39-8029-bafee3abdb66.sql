
-- ============================================================
-- PHASE 1: page_content (editable static content)
-- ============================================================
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  published BOOLEAN NOT NULL DEFAULT true,
  updated_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_key, section_key)
);

GRANT SELECT ON public.page_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_content TO authenticated;
GRANT ALL ON public.page_content TO service_role;

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published page content"
  ON public.page_content FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can read all page content"
  ON public.page_content FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert page content"
  ON public.page_content FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update page content"
  ON public.page_content FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete page content"
  ON public.page_content FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_page_content_page_key ON public.page_content(page_key);

-- ============================================================
-- PHASE 2: custom_pages + custom_page_sections
-- ============================================================
CREATE TABLE public.custom_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_description TEXT,
  og_image TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.custom_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_pages TO authenticated;
GRANT ALL ON public.custom_pages TO service_role;

ALTER TABLE public.custom_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published custom pages"
  ON public.custom_pages FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can read all custom pages"
  ON public.custom_pages FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage custom pages insert"
  ON public.custom_pages FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage custom pages update"
  ON public.custom_pages FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage custom pages delete"
  ON public.custom_pages FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_custom_pages_updated_at
  BEFORE UPDATE ON public.custom_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.custom_page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.custom_pages(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.custom_page_sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_page_sections TO authenticated;
GRANT ALL ON public.custom_page_sections TO service_role;

ALTER TABLE public.custom_page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read sections of published pages"
  ON public.custom_page_sections FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.custom_pages p
    WHERE p.id = custom_page_sections.page_id AND p.published = true
  ));

CREATE POLICY "Admins can read all sections"
  ON public.custom_page_sections FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert sections"
  ON public.custom_page_sections FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update sections"
  ON public.custom_page_sections FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete sections"
  ON public.custom_page_sections FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_custom_page_sections_updated_at
  BEFORE UPDATE ON public.custom_page_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_custom_page_sections_page_id ON public.custom_page_sections(page_id, sort_order);
