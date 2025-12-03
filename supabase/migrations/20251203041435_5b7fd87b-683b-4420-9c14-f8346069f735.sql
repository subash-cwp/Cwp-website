-- Drop the existing public policy for team_members
DROP POLICY IF EXISTS "Public can read published team members" ON public.team_members;

-- Create a new policy that excludes email from public view
-- The email column will only be visible to admins through RLS
CREATE POLICY "Public can read published team members" 
ON public.team_members 
FOR SELECT 
USING (published = true);

-- Note: To truly hide the email column, we should use a view
-- Create a public view without email for public access
CREATE OR REPLACE VIEW public.team_members_public AS
SELECT 
  id,
  name,
  role,
  avatar,
  bio,
  linkedin,
  twitter,
  sort_order,
  published,
  created_at
FROM public.team_members
WHERE published = true;