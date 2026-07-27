
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS meta_title text,
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS secondary_keywords text[],
  ADD COLUMN IF NOT EXISTS canonical_url text,
  ADD COLUMN IF NOT EXISTS og_title text,
  ADD COLUMN IF NOT EXISTS og_description text,
  ADD COLUMN IF NOT EXISTS og_image text,
  ADD COLUMN IF NOT EXISTS noindex boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS word_count integer;

-- Backfill status from existing published flag / scheduled_publish_at
UPDATE public.blog_posts SET status = 'published' WHERE status = 'draft' AND published = true;
UPDATE public.blog_posts SET status = 'scheduled' WHERE status = 'draft' AND scheduled_publish_at IS NOT NULL AND scheduled_publish_at > now();

-- Simple check for allowed values
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_status_check') THEN
    ALTER TABLE public.blog_posts
      ADD CONSTRAINT blog_posts_status_check
      CHECK (status IN ('draft','published','scheduled','archived'));
  END IF;
END $$;
