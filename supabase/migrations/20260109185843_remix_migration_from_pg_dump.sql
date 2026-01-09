CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'editor'
);


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blogs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    content text,
    cover_image text,
    published boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: gallery_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gallery_images (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    image_url text NOT NULL,
    category text DEFAULT 'general'::text NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: hero_slides; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hero_slides (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    image_url text NOT NULL,
    title text,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: site_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page text NOT NULL,
    section text NOT NULL,
    content_key text NOT NULL,
    content_value text NOT NULL,
    content_type text DEFAULT 'text'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: vlogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vlogs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    video_url text NOT NULL,
    thumbnail_url text,
    category text DEFAULT 'general'::text NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- Name: gallery_images gallery_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gallery_images
    ADD CONSTRAINT gallery_images_pkey PRIMARY KEY (id);


--
-- Name: hero_slides hero_slides_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hero_slides
    ADD CONSTRAINT hero_slides_pkey PRIMARY KEY (id);


--
-- Name: site_content site_content_page_section_content_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_content
    ADD CONSTRAINT site_content_page_section_content_key_key UNIQUE (page, section, content_key);


--
-- Name: site_content site_content_page_section_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_content
    ADD CONSTRAINT site_content_page_section_key_unique UNIQUE (page, section, content_key);


--
-- Name: site_content site_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_content
    ADD CONSTRAINT site_content_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: vlogs vlogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vlogs
    ADD CONSTRAINT vlogs_pkey PRIMARY KEY (id);


--
-- Name: blogs update_blogs_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: gallery_images update_gallery_images_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON public.gallery_images FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: site_content update_site_content_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: vlogs update_vlogs_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_vlogs_updated_at BEFORE UPDATE ON public.vlogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: gallery_images Admins can delete gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete gallery images" ON public.gallery_images FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: site_content Admins can delete site content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete site content" ON public.site_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: vlogs Admins can delete vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete vlogs" ON public.vlogs FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: gallery_images Admins can insert gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert gallery images" ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: site_content Admins can insert site content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: vlogs Admins can insert vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert vlogs" ON public.vlogs FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: gallery_images Admins can update gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update gallery images" ON public.gallery_images FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: site_content Admins can update site content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update site content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: vlogs Admins can update vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update vlogs" ON public.vlogs FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: gallery_images Admins can view all gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all gallery images" ON public.gallery_images FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: vlogs Admins can view all vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all vlogs" ON public.vlogs FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blogs Anyone can view published blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view published blogs" ON public.blogs FOR SELECT USING ((published = true));


--
-- Name: site_content Anyone can view site content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);


--
-- Name: gallery_images Anyone can view visible gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view visible gallery images" ON public.gallery_images FOR SELECT USING ((is_visible = true));


--
-- Name: hero_slides Anyone can view visible hero slides; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view visible hero slides" ON public.hero_slides FOR SELECT USING ((is_visible = true));


--
-- Name: vlogs Anyone can view visible vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view visible vlogs" ON public.vlogs FOR SELECT USING ((is_visible = true));


--
-- Name: blogs Authenticated users can delete blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete blogs" ON public.blogs FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: gallery_images Authenticated users can delete gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete gallery images" ON public.gallery_images FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: hero_slides Authenticated users can delete hero slides; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete hero slides" ON public.hero_slides FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: site_content Authenticated users can delete site content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete site content" ON public.site_content FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: vlogs Authenticated users can delete vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete vlogs" ON public.vlogs FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: blogs Authenticated users can insert blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can insert blogs" ON public.blogs FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: gallery_images Authenticated users can insert gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can insert gallery images" ON public.gallery_images FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: hero_slides Authenticated users can insert hero slides; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can insert hero slides" ON public.hero_slides FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: site_content Authenticated users can insert site content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can insert site content" ON public.site_content FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: vlogs Authenticated users can insert vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can insert vlogs" ON public.vlogs FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: blogs Authenticated users can update blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update blogs" ON public.blogs FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: gallery_images Authenticated users can update gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update gallery images" ON public.gallery_images FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: hero_slides Authenticated users can update hero slides; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update hero slides" ON public.hero_slides FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: site_content Authenticated users can update site content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update site content" ON public.site_content FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: vlogs Authenticated users can update vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update vlogs" ON public.vlogs FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: blogs Authenticated users can view all blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all blogs" ON public.blogs FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- Name: gallery_images Authenticated users can view all gallery images; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all gallery images" ON public.gallery_images FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- Name: hero_slides Authenticated users can view all hero slides; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all hero slides" ON public.hero_slides FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- Name: vlogs Authenticated users can view all vlogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all vlogs" ON public.vlogs FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- Name: blogs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

--
-- Name: gallery_images; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

--
-- Name: hero_slides; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

--
-- Name: site_content; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: vlogs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.vlogs ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;