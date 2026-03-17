-- ============================================================
-- ClearHire ATS — Supabase SQL Schema
-- Run this in Supabase → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── ENUMS ───────────────────────────────────────────────────
create type user_role as enum ('CANDIDATE', 'RECRUITER', 'ADMIN');
create type application_status as enum (
  'APPLIED', 'VIEWED', 'SHORTLISTED',
  'INTERVIEW_SCHEDULED', 'OFFER_MADE', 'REJECTED', 'WITHDRAWN'
);
create type job_status as enum ('DRAFT', 'ACTIVE', 'PAUSED', 'CLOSED');
create type job_type as enum ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE');
create type work_mode as enum ('REMOTE', 'HYBRID', 'ONSITE');

-- ─── PROFILES (extends Supabase auth.users) ───────────────────
create table profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text unique not null,
  role        user_role not null default 'CANDIDATE',
  first_name  text,
  last_name   text,
  avatar_url  text,
  is_verified boolean default false,
  is_active   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ─── COMPANIES ────────────────────────────────────────────────
create table companies (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  logo_url    text,
  website     text,
  industry    text,
  size        text,
  description text,
  location    text,
  created_at  timestamptz default now()
);

-- ─── CANDIDATE PROFILES ───────────────────────────────────────
create table candidate_profiles (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid unique references profiles(id) on delete cascade,
  headline         text,
  summary          text,
  phone            text,
  location         text,
  linkedin_url     text,
  portfolio_url    text,
  github_url       text,
  ats_score        int,
  profile_strength int default 0,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ─── RECRUITER PROFILES ───────────────────────────────────────
create table recruiter_profiles (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid unique references profiles(id) on delete cascade,
  company_id  uuid references companies(id),
  job_title   text,
  phone       text,
  created_at  timestamptz default now()
);

-- ─── JOBS ─────────────────────────────────────────────────────
create table jobs (
  id                uuid primary key default uuid_generate_v4(),
  title             text not null,
  description       text not null,
  requirements      text,
  benefits          text,
  company_culture   text,
  company_id        uuid references companies(id),
  recruiter_id      uuid references recruiter_profiles(id),
  location          text,
  work_mode         work_mode default 'HYBRID',
  job_type          job_type default 'FULL_TIME',
  status            job_status default 'DRAFT',
  salary_min        int,
  salary_max        int,
  currency          text default 'USD',
  experience_level  text,
  view_count        int default 0,
  application_count int default 0,
  expires_at        timestamptz,
  published_at      timestamptz,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- ─── JOB SKILLS ───────────────────────────────────────────────
create table job_skills (
  id       uuid primary key default uuid_generate_v4(),
  job_id   uuid references jobs(id) on delete cascade,
  name     text not null,
  required boolean default true
);

-- ─── CANDIDATE SKILLS ─────────────────────────────────────────
create table candidate_skills (
  id           uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidate_profiles(id) on delete cascade,
  name         text not null,
  level        text,
  years_exp    int
);

-- ─── EXPERIENCE ───────────────────────────────────────────────
create table experiences (
  id           uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidate_profiles(id) on delete cascade,
  company      text not null,
  title        text not null,
  location     text,
  start_date   date not null,
  end_date     date,
  current      boolean default false,
  description  text
);

-- ─── EDUCATION ────────────────────────────────────────────────
create table educations (
  id           uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidate_profiles(id) on delete cascade,
  institution  text not null,
  degree       text not null,
  field        text,
  start_date   date not null,
  end_date     date,
  grade        text
);

-- ─── RESUMES ──────────────────────────────────────────────────
create table resumes (
  id             uuid primary key default uuid_generate_v4(),
  candidate_id   uuid references candidate_profiles(id) on delete cascade,
  name           text not null,
  file_url       text not null,
  file_size      int,
  mime_type      text,
  is_default     boolean default false,
  parsed_text    text,
  ats_score      int,
  score_breakdown jsonb,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- ─── APPLICATIONS ─────────────────────────────────────────────
create table applications (
  id               uuid primary key default uuid_generate_v4(),
  candidate_id     uuid references candidate_profiles(id) on delete cascade,
  job_id           uuid references jobs(id) on delete cascade,
  resume_id        uuid references resumes(id),
  status           application_status default 'APPLIED',
  cover_letter     text,
  match_score      int,
  recruiter_notes  text,
  rejection_reason text,
  applied_at       timestamptz default now(),
  viewed_at        timestamptz,
  status_updated_at timestamptz,
  created_at       timestamptz default now(),
  unique(candidate_id, job_id)
);

-- ─── SAVED JOBS ───────────────────────────────────────────────
create table saved_jobs (
  id           uuid primary key default uuid_generate_v4(),
  candidate_id uuid references candidate_profiles(id) on delete cascade,
  job_id       uuid references jobs(id) on delete cascade,
  saved_at     timestamptz default now(),
  unique(candidate_id, job_id)
);

-- ─── NOTIFICATIONS ────────────────────────────────────────────
create table notifications (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid references profiles(id) on delete cascade,
  type       text not null,
  title      text not null,
  message    text not null,
  read       boolean default false,
  data       jsonb,
  created_at timestamptz default now()
);

-- ─── OTP VERIFICATIONS ────────────────────────────────────────
create table otp_verifications (
  id         uuid primary key default uuid_generate_v4(),
  email      text not null,
  otp        text not null,
  expires_at timestamptz not null,
  used       boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table profiles enable row level security;
alter table candidate_profiles enable row level security;
alter table recruiter_profiles enable row level security;
alter table companies enable row level security;
alter table jobs enable row level security;
alter table job_skills enable row level security;
alter table candidate_skills enable row level security;
alter table experiences enable row level security;
alter table educations enable row level security;
alter table resumes enable row level security;
alter table applications enable row level security;
alter table saved_jobs enable row level security;
alter table notifications enable row level security;

-- Profiles: users can read own profile, admins read all
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
create policy "Anyone can insert profile on signup"
  on profiles for insert with check (auth.uid() = id);

-- Jobs: anyone can read active jobs; recruiters manage own jobs
create policy "Anyone can view active jobs"
  on jobs for select using (status = 'ACTIVE' or
    recruiter_id in (select id from recruiter_profiles where user_id = auth.uid()));
create policy "Recruiters can insert jobs"
  on jobs for insert with check (
    recruiter_id in (select id from recruiter_profiles where user_id = auth.uid()));
create policy "Recruiters can update own jobs"
  on jobs for update using (
    recruiter_id in (select id from recruiter_profiles where user_id = auth.uid()));

-- Job skills: public read
create policy "Anyone can view job skills" on job_skills for select using (true);
create policy "Recruiters can manage job skills" on job_skills for all using (
  job_id in (select id from jobs where recruiter_id in (
    select id from recruiter_profiles where user_id = auth.uid())));

-- Candidate profiles: own data
create policy "Candidates manage own profile"
  on candidate_profiles for all using (user_id = auth.uid());
create policy "Recruiters can view candidate profiles"
  on candidate_profiles for select using (
    exists(select 1 from profiles where id = auth.uid() and role = 'RECRUITER'));

-- Resumes: candidates manage own
create policy "Candidates manage own resumes"
  on resumes for all using (
    candidate_id in (select id from candidate_profiles where user_id = auth.uid()));

-- Applications: candidates see own; recruiters see their job applications
create policy "Candidates see own applications"
  on applications for select using (
    candidate_id in (select id from candidate_profiles where user_id = auth.uid()));
create policy "Candidates insert applications"
  on applications for insert with check (
    candidate_id in (select id from candidate_profiles where user_id = auth.uid()));
create policy "Candidates update own applications"
  on applications for update using (
    candidate_id in (select id from candidate_profiles where user_id = auth.uid()));
create policy "Recruiters see their job applications"
  on applications for select using (
    job_id in (select id from jobs where recruiter_id in (
      select id from recruiter_profiles where user_id = auth.uid())));
create policy "Recruiters update application status"
  on applications for update using (
    job_id in (select id from jobs where recruiter_id in (
      select id from recruiter_profiles where user_id = auth.uid())));

-- Skills, experience, education: candidates own
create policy "Candidates manage skills"
  on candidate_skills for all using (
    candidate_id in (select id from candidate_profiles where user_id = auth.uid()));
create policy "Recruiters view candidate skills"
  on candidate_skills for select using (
    exists(select 1 from profiles where id = auth.uid() and role = 'RECRUITER'));
create policy "Candidates manage experience"
  on experiences for all using (
    candidate_id in (select id from candidate_profiles where user_id = auth.uid()));
create policy "Candidates manage education"
  on educations for all using (
    candidate_id in (select id from candidate_profiles where user_id = auth.uid()));

-- Saved jobs
create policy "Candidates manage saved jobs"
  on saved_jobs for all using (
    candidate_id in (select id from candidate_profiles where user_id = auth.uid()));

-- Notifications: own only
create policy "Users see own notifications"
  on notifications for all using (user_id = auth.uid());

-- Companies: public read
create policy "Anyone can view companies" on companies for select using (true);
create policy "Recruiters can insert companies" on companies for insert with check (
  exists(select 1 from profiles where id = auth.uid() and role in ('RECRUITER', 'ADMIN')));

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'CANDIDATE')::user_role
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at();
create trigger update_jobs_updated_at before update on jobs
  for each row execute function update_updated_at();
create trigger update_candidate_profiles_updated_at before update on candidate_profiles
  for each row execute function update_updated_at();

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

-- Run these in Supabase Dashboard → Storage → Create Bucket
-- OR via SQL:
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict do nothing;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict do nothing;

create policy "Candidates upload own resumes"
  on storage.objects for insert with check (
    bucket_id = 'resumes' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Candidates view own resumes"
  on storage.objects for select using (
    bucket_id = 'resumes' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Anyone can view avatars"
  on storage.objects for select using (bucket_id = 'avatars');
create policy "Users upload own avatar"
  on storage.objects for insert with check (
    bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
