create extension if not exists pgcrypto;

create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar text,
  bio text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  subtitle text not null default '',
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  author_id uuid references public.authors(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','published')),
  featured boolean not null default false,
  reading_time integer not null default 5,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author text not null default 'Admin',
  author_photo text,
  author_designation text not null default 'Research Lead',
  canonical_url text,
  meta_keywords text,
  gallery_images text[] not null default '{}',
  attachments text[] not null default '{}',
  tags text[] not null default '{}',
  category text not null default 'General',
  view_count integer not null default 0,
  published boolean not null default false
);

create table if not exists public.blog_tags (
  blog_id uuid not null references public.blogs(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (blog_id, tag_id)
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text,
  storage_path text,
  file_size bigint,
  mime_type text,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  created_at timestamptz not null default now()
);

create index if not exists blogs_slug_idx on public.blogs (slug);
create index if not exists blogs_published_at_idx on public.blogs (published_at);
create index if not exists blogs_status_idx on public.blogs (status);
create index if not exists blogs_featured_idx on public.blogs (featured);
create index if not exists blogs_category_id_idx on public.blogs (category_id);
create index if not exists blogs_author_id_idx on public.blogs (author_id);

alter table public.blogs enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.blog_tags enable row level security;
alter table public.authors enable row level security;
alter table public.media enable row level security;
alter table public.settings enable row level security;

create policy if not exists blogs_select_public on public.blogs
  for select using (status = 'published');

create policy if not exists blogs_manage_admin on public.blogs
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists categories_select_public on public.categories
  for select using (true);

create policy if not exists categories_manage_admin on public.categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists tags_select_public on public.tags
  for select using (true);

create policy if not exists tags_manage_admin on public.tags
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists blog_tags_select_public on public.blog_tags
  for select using (true);

create policy if not exists blog_tags_manage_admin on public.blog_tags
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists authors_select_public on public.authors
  for select using (true);

create policy if not exists authors_manage_admin on public.authors
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists media_admin_all on public.media
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy if not exists settings_admin_all on public.settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public) values ('blogs', 'blogs', true)
on conflict (id) do nothing;
