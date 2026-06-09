create extension if not exists pgcrypto;

create type public.user_role as enum ('patient', 'doctor', 'trrf');

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role public.user_role not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  study_id text not null unique,
  display_name text not null,
  region text,
  program_status text,
  privacy_level text default 'standard',
  created_at timestamptz not null default now()
);

create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  organization text,
  role_title text,
  region text,
  created_at timestamptz not null default now()
);

create table if not exists public.trrf_staff (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  team_name text,
  permission_level text,
  created_at timestamptz not null default now()
);

create table if not exists public.patient_assignments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  assignment_start date,
  assignment_end date,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.patient_conversations (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  conversation_type text not null default 'support_check_in',
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  summary_text text
);

create table if not exists public.chatbot_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.patient_conversations(id) on delete cascade,
  sender_type text not null,
  message_text text not null,
  contains_sensitive_health_data boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  consent_type text not null,
  granted boolean not null,
  granted_at timestamptz not null default now(),
  source text,
  notes text
);

create table if not exists public.patient_health_entries (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  entry_date date not null default current_date,
  entry_type text not null,
  survey_type text,
  phase text,
  metrics_json jsonb not null default '{}'::jsonb,
  free_text_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.doctor_surveys (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  survey_date date not null default current_date,
  survey_type text not null,
  assessment_moment text,
  responses_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.doctor_comments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  visibility_level text not null default 'assigned_clinicians',
  comment_text text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.hospital_case_search_index (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  hospital_id text,
  cancer_type text,
  cancer_stage text,
  sex text,
  age_range text,
  treatment_types_json jsonb not null default '[]'::jsonb,
  program_phase text,
  deidentified_summary_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.dashboard_metrics (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  metric_name text not null,
  metric_value numeric not null,
  period_label text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.donor_story_drafts (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  audience_type text not null,
  approval_status text not null default 'draft',
  draft_text text not null,
  anonymized boolean not null default true,
  approved_by uuid references public.trrf_staff(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.users(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
