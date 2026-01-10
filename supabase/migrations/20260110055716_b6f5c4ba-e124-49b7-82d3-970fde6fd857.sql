-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for admission/enrollment applications
CREATE TABLE public.admission_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  program TEXT NOT NULL,
  preferred_campus TEXT NOT NULL,
  additional_info TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for school locations (managed by admin)
CREATE TABLE public.school_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  google_maps_url TEXT,
  google_maps_embed TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_locations ENABLE ROW LEVEL SECURITY;

-- RLS policies for contact_submissions
-- Anyone can create submissions (public form)
CREATE POLICY "Anyone can submit contact forms"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Only admins can update submissions
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Only admins can delete submissions
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- RLS policies for admission_applications
-- Anyone can submit applications (public form)
CREATE POLICY "Anyone can submit admission applications"
ON public.admission_applications
FOR INSERT
WITH CHECK (true);

-- Only admins can view applications
CREATE POLICY "Admins can view admission applications"
ON public.admission_applications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Only admins can update applications
CREATE POLICY "Admins can update admission applications"
ON public.admission_applications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Only admins can delete applications
CREATE POLICY "Admins can delete admission applications"
ON public.admission_applications
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- RLS policies for school_locations
-- Anyone can view visible locations
CREATE POLICY "Anyone can view visible school locations"
ON public.school_locations
FOR SELECT
USING (is_visible = true);

-- Admins can view all locations
CREATE POLICY "Admins can view all school locations"
ON public.school_locations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Only admins can create locations
CREATE POLICY "Admins can create school locations"
ON public.school_locations
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Only admins can update locations
CREATE POLICY "Admins can update school locations"
ON public.school_locations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Only admins can delete locations
CREATE POLICY "Admins can delete school locations"
ON public.school_locations
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admission_applications_updated_at
BEFORE UPDATE ON public.admission_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_school_locations_updated_at
BEFORE UPDATE ON public.school_locations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();