-- Yunhong Textiles — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  nav_name text not null,
  tagline text,
  summary text,
  intro jsonb default '[]'::jsonb,
  image text,
  image_alt text,
  highlights jsonb default '[]'::jsonb,
  applications jsonb default '[]'::jsonb,
  faqs jsonb default '[]'::jsonb,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  code text not null,
  category_slug text references categories(slug) on delete set null,
  summary text,
  description jsonb default '[]'::jsonb,
  composition text,
  weight_gsm int,
  width_cm int,
  weave text,
  finish text,
  shrinkage text,
  moq_meters int,
  stock_meters int,
  lead_time_min int,
  lead_time_max int,
  price_from numeric,
  price_to numeric,
  colors int,
  certifications jsonb default '[]'::jsonb,
  applications jsonb default '[]'::jsonb,
  features jsonb default '[]'::jsonb,
  image text,
  image_alt text,
  featured boolean default false,
  faqs jsonb default '[]'::jsonb,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- articles
-- ---------------------------------------------------------------------------
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  excerpt text,
  date date,
  updated date,
  author text,
  reading_minutes int,
  topic text,
  image text,
  image_alt text,
  key_takeaways jsonb default '[]'::jsonb,
  sections jsonb default '[]'::jsonb,
  faqs jsonb default '[]'::jsonb,
  related_categories jsonb default '[]'::jsonb,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- faqs (site-wide buyer FAQ)
-- ---------------------------------------------------------------------------
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- site_settings (key/value JSONB — 'site' holds the whole site object)
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table categories enable row level security;
alter table products enable row level security;
alter table articles enable row level security;
alter table faqs enable row level security;
alter table site_settings enable row level security;

-- Public read access (anonymous + authenticated).
create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);
create policy "public read articles" on articles for select using (true);
create policy "public read faqs" on faqs for select using (true);
create policy "public read site_settings" on site_settings for select using (true);

-- Write access restricted to authenticated admins.
create policy "admin write categories" on categories for all to authenticated using (true) with check (true);
create policy "admin write products" on products for all to authenticated using (true) with check (true);
create policy "admin write articles" on articles for all to authenticated using (true) with check (true);
create policy "admin write faqs" on faqs for all to authenticated using (true) with check (true);
create policy "admin write site_settings" on site_settings for all to authenticated using (true) with check (true);
