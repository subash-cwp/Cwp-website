
-- =====================================================================
-- 1) STORAGE: Restrict 'media' bucket policies
--    - Public bucket stays public for direct URL access, but listing
--      and modification are restricted to admins.
-- =====================================================================

DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;
DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can list media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete media" ON storage.objects;

-- Restrict listing/SELECT on storage.objects to admins. Direct public
-- URLs (/storage/v1/object/public/...) still work because the bucket
-- itself is marked public.
CREATE POLICY "Admins can list media"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can upload media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can update media"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
)
WITH CHECK (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

CREATE POLICY "Admins can delete media"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'media'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- =====================================================================
-- 2) TEAM_MEMBERS: Hide email column from public reads
--    - Drop broad public SELECT policy
--    - Provide a SECURITY DEFINER function returning non-sensitive fields
-- =====================================================================

DROP POLICY IF EXISTS "Public can read published team members" ON public.team_members;

CREATE OR REPLACE FUNCTION public.get_public_team_members()
RETURNS TABLE (
  id uuid,
  name text,
  role text,
  avatar text,
  bio text,
  linkedin text,
  twitter text,
  sort_order integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, name, role, avatar, bio, linkedin, twitter, sort_order
  FROM public.team_members
  WHERE published = true
  ORDER BY sort_order ASC NULLS LAST, name ASC;
$$;

REVOKE ALL ON FUNCTION public.get_public_team_members() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_team_members() TO anon, authenticated;

-- =====================================================================
-- 3) Tighten WITH CHECK on public INSERT policies
--    Replaces always-true WITH CHECK with non-trivial validation that
--    rejects empty/oversized payloads. Admin policies retain ALL access.
-- =====================================================================

-- contact_submissions
DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact"
ON public.contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL
  AND length(btrim(name)) BETWEEN 1 AND 200
  AND email IS NOT NULL
  AND length(email) BETWEEN 3 AND 320
  AND position('@' in email) > 1
  AND (message IS NULL OR length(message) <= 10000)
  AND (phone IS NULL OR length(phone) <= 50)
  AND (company IS NULL OR length(company) <= 200)
  AND (source IS NULL OR length(source) <= 100)
);

-- newsletter_subscribers
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 3 AND 320
  AND position('@' in email) > 1
);

-- job_applications
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;
CREATE POLICY "Anyone can submit job applications"
ON public.job_applications FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL
  AND length(btrim(name)) BETWEEN 1 AND 200
  AND email IS NOT NULL
  AND length(email) BETWEEN 3 AND 320
  AND position('@' in email) > 1
  AND position IS NOT NULL
  AND length(btrim(position)) BETWEEN 1 AND 200
  AND (phone IS NULL OR length(phone) <= 50)
  AND (cover_letter IS NULL OR length(cover_letter) <= 10000)
  AND (resume_url IS NULL OR length(resume_url) <= 2000)
  AND (linkedin_url IS NULL OR length(linkedin_url) <= 2000)
  AND (portfolio_url IS NULL OR length(portfolio_url) <= 2000)
);

-- testimonial_submissions
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonial_submissions;
CREATE POLICY "Anyone can submit testimonials"
ON public.testimonial_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL
  AND length(btrim(name)) BETWEEN 1 AND 200
  AND email IS NOT NULL
  AND length(email) BETWEEN 3 AND 320
  AND position('@' in email) > 1
  AND content IS NOT NULL
  AND length(btrim(content)) BETWEEN 5 AND 5000
  AND (rating IS NULL OR (rating BETWEEN 1 AND 5))
  AND approved = false
);

-- ab_test_results
DROP POLICY IF EXISTS "Anyone can insert results" ON public.ab_test_results;
CREATE POLICY "Anyone can insert results"
ON public.ab_test_results FOR INSERT
TO anon, authenticated
WITH CHECK (
  test_id IS NOT NULL
  AND variant IS NOT NULL
  AND variant IN ('a', 'b')
  AND visitor_id IS NOT NULL
  AND length(visitor_id) BETWEEN 1 AND 200
);

-- activity_logs: restrict to authenticated users logging their own activity
DROP POLICY IF EXISTS "System can insert logs" ON public.activity_logs;
CREATE POLICY "Authenticated users can insert their own logs"
ON public.activity_logs FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() IS NOT NULL
  AND (user_id IS NULL OR user_id = auth.uid())
  AND action IS NOT NULL
  AND length(action) BETWEEN 1 AND 100
  AND entity_type IS NOT NULL
  AND length(entity_type) BETWEEN 1 AND 100
);
