-- Fix contact_submissions policies - make them permissive
DROP POLICY IF EXISTS "Admins can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can delete contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contact_submissions;

CREATE POLICY "Admins can view contact submissions" 
ON contact_submissions 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = 'admin'::app_role
));

CREATE POLICY "Admins can update contact submissions" 
ON contact_submissions 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = 'admin'::app_role
));

CREATE POLICY "Admins can delete contact submissions" 
ON contact_submissions 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = 'admin'::app_role
));

CREATE POLICY "Anyone can submit contact forms" 
ON contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Fix admission_applications policies - make them permissive
DROP POLICY IF EXISTS "Admins can view admission applications" ON admission_applications;
DROP POLICY IF EXISTS "Admins can update admission applications" ON admission_applications;
DROP POLICY IF EXISTS "Admins can delete admission applications" ON admission_applications;
DROP POLICY IF EXISTS "Anyone can submit admission applications" ON admission_applications;

CREATE POLICY "Admins can view admission applications" 
ON admission_applications 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = 'admin'::app_role
));

CREATE POLICY "Admins can update admission applications" 
ON admission_applications 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = 'admin'::app_role
));

CREATE POLICY "Admins can delete admission applications" 
ON admission_applications 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = 'admin'::app_role
));

CREATE POLICY "Anyone can submit admission applications" 
ON admission_applications 
FOR INSERT 
WITH CHECK (true);