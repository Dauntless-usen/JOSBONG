-- Run this in the Supabase SQL Editor (or via `supabase db push` if you set
-- up the CLI) for the project referenced by NEXT_PUBLIC_SUPABASE_URL.
-- This was not applied automatically - there is no DB connection or
-- Supabase CLI available in the environment that generated this file.

-- ============================================================
-- leads table
-- ============================================================
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  services jsonb not null,
  project_details text not null,
  budget text,
  attachment_url text
);

-- RLS is enabled with NO policies defined, which means only the service
-- role (used server-side in app/api/quote/route.ts) can read or write this
-- table. The anon key used in the browser has no access to `leads` at all.
alter table public.leads enable row level security;

-- ============================================================
-- quote-attachments storage bucket
-- ============================================================
insert into storage.buckets (id, name, public)
values ('quote-attachments', 'quote-attachments', false)
on conflict (id) do nothing;

-- The anon key uploads directly from the browser (see QuoteForm.tsx), so it
-- needs insert access to this bucket, and select access so it can generate
-- a signed URL for the file it just uploaded. Anyone holding the anon key
-- (it's public, shipped in the JS bundle) could in principle upload to or
-- read from this bucket, but object paths are UUID-prefixed and not
-- enumerable, and the bucket itself is private (no public read without a
-- signed URL). If that trade-off isn't acceptable, move the upload to a
-- server route instead and drop the anon insert/select policies below.
create policy "Anon can upload quote attachments"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'quote-attachments');

create policy "Anon can read quote attachments to sign a URL"
  on storage.objects for select
  to anon
  using (bucket_id = 'quote-attachments');
