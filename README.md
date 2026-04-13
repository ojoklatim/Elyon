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

```sh
# Step 1: Install dependencies
npm i

# Step 2: Start the development server
npm run dev
```

The application will be running locally at `http://localhost:8080/`. You can log into the `/admin` portal using the officially generated admin credentials in your Supabase Auth configuration.
