# Elyon Kindergarten and Primary School

This is the official web application for Elyon Kindergarten and Primary School, featuring a dynamic frontend built with React and Vite, paired with a robust Supabase backend that provides full administrative control over the website's content.

## Features

- **Public Features:**
  - Modern, responsive landing page with dynamic Hero Slides.
  - Comprehensive details about Programs (Kindergarten, Primary) and Campuses (Mutungo, Nsangi).
  - Online Admissions Inquiry Form.
  - Institutional Organogram with dynamic staff photos and profiles.
  - School Vlog, Photo Gallery, and Blog pages.
  - Contact Forms and dynamic social media links.

- **Admin Dashboard Integration (`/admin`):**
  - **Page Content Editor:** Allows admins to edit text snippets, headings, and descriptions for all pages instantly.
  - **Media Management:** Direct Supabase storage integration for updating organogram photos, gallery images, and blog covers.
  - **Applications & Submissions:** Manage public admission inquiries and contact submissions directly from the dashboard.
  - **Dynamic Locations:** Manage campuses, interactive maps, and contact details.

## Technologies Used

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn-ui
- **Backend (BaaS):** Supabase (Auth, PostgreSQL DB, Storage, RLS)
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form, zod

## Initial Setup & Database Seeding

To connect this application to a completely new Supabase instance:
1. Copy your `.env` variables from Supabase (`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`).
2. Run the provided master SQL schema (`supabase_master_schema.sql` or equivalent) in the Supabase SQL editor to create all the necessary tables, Row Level Security (RLS) policies, and triggers.
3. Manually create the 3 public storage buckets in Supabase: `page-images`, `blogs`, `gallery`.
4. Run the data seeding script (`site_content_seed.sql`) to pre-populate all the default text variables into the CMS.

## Development

### Option 1: Quick Start (Without Supabase Configuration)

If you just want to test the frontend without setting up Supabase:

```sh
# Step 1: Install dependencies
npm i

# Step 2: Start the development server
npm run dev
```

The application will be running locally at `http://localhost:8080/` with **full frontend functionality**:
- ✅ All public pages load (Home, About, Programs, Campuses, etc.)
- ✅ Static 3D models and carousels work
- ✅ Forms show helpful messages (no backend needed)
- ✅ Admin pages are accessible but show "Supabase not configured" messages
- ✅ No errors thrown - graceful degradation

See [Running Without Environment Variables](#running-without-environment-variables) for details.

### Option 2: Full Setup With Supabase Backend

For full functionality including admin features, form submissions, and content management:

1. Create a Supabase account and project at [supabase.com](https://supabase.com)
2. Copy your `.env` variables from the Supabase dashboard:
   - `VITE_SUPABASE_URL` 
   - `VITE_SUPABASE_ANON_KEY`
3. Create a `.env.local` file in the project root with your credentials (or copy from `.env.example`)
4. Run the provided master SQL schema (`supabase_master_schema.sql` or equivalent) in the Supabase SQL editor to create all necessary tables, Row Level Security (RLS) policies, and triggers
5. Manually create the 3 public storage buckets in Supabase: `page-images`, `blogs`, `hero-images`, `gallery`
6. Run the data seeding script (`site_content_seed.sql`) to pre-populate default content
7. Run `npm i && npm run dev`

Once configured, you can log into the `/admin` portal using your Supabase Auth credentials.

## Running Without Environment Variables

The entire frontend is designed to work seamlessly **without any Supabase configuration**:

### What Works
- ✅ All public pages render with static content
- ✅ 3D models and animations load
- ✅ Navigation and routing works perfectly
- ✅ Admin pages are accessible
- ✅ Zero error messages or console errors

### Admin Features Without Supabase
When Supabase is not configured, admin pages display:
- A clear message: "Supabase is not configured. Please set environment variables."
- Buttons are disabled with helpful tooltips
- No crashes or error pages

### Form Submissions Without Supabase
When users submit forms (Contact, Admissions) without Supabase:
- Forms display a friendly error message
- Users understand the feature is temporarily unavailable
- The app continues to function normally

### To Run Without Environment Variables
Simply run:
```sh
npm i
npm run dev
```

No `.env` file needed! The frontend handles missing Supabase gracefully.
