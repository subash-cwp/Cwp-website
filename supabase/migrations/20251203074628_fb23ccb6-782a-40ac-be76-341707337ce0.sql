-- Create job_applications table for career applications
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT NOT NULL,
  resume_url TEXT,
  cover_letter TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit job applications
CREATE POLICY "Anyone can submit job applications" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view/manage applications
CREATE POLICY "Admins can manage job applications" 
ON public.job_applications 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create testimonial_submissions table for client testimonials
CREATE TABLE public.testimonial_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonial_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit testimonials
CREATE POLICY "Anyone can submit testimonials" 
ON public.testimonial_submissions 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view/manage testimonial submissions
CREATE POLICY "Admins can manage testimonial submissions" 
ON public.testimonial_submissions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));