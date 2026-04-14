-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('page-images', 'page-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('hero-images', 'hero-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Set up RLS Policies for storage buckets
-- We drop them first to prevent "already exists" errors

-- Policies for 'page-images'
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'page-images');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'page-images');
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'page-images');
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'page-images');

-- Policies for 'hero-images'
DROP POLICY IF EXISTS "Public Read Access hero" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload hero" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update hero" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete hero" ON storage.objects;

CREATE POLICY "Public Read Access hero" ON storage.objects FOR SELECT USING (bucket_id = 'hero-images');
CREATE POLICY "Authenticated Upload hero" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hero-images');
CREATE POLICY "Authenticated Update hero" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'hero-images');
CREATE POLICY "Authenticated Delete hero" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'hero-images');

-- Policies for 'gallery'
DROP POLICY IF EXISTS "Public Read Access gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete gallery" ON storage.objects;

CREATE POLICY "Public Read Access gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Authenticated Upload gallery" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery');
CREATE POLICY "Authenticated Update gallery" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery');
CREATE POLICY "Authenticated Delete gallery" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery');

