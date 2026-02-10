create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  student_name text not null,
  quote text,
  description text not null,
  tags text[] default '{}'::text[],
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.projects enable row level security;

-- Policies
create policy "Public projects are viewable by everyone"
  on public.projects for select
  using (true);

create policy "Users can insert projects"
  on public.projects for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update projects"
  on public.projects for update
  using (auth.role() = 'authenticated');

create policy "Users can delete projects"
  on public.projects for delete
  using (auth.role() = 'authenticated');

-- Storage bucket for project images (if not exists)
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'project-images' );

create policy "Authenticated users can upload"
  on storage.objects for insert
  with check ( bucket_id = 'project-images' and auth.role() = 'authenticated' );

create policy "Authenticated users can update"
  on storage.objects for update
  using ( bucket_id = 'project-images' and auth.role() = 'authenticated' );

create policy "Authenticated users can delete"
  on storage.objects for delete
  using ( bucket_id = 'project-images' and auth.role() = 'authenticated' );
