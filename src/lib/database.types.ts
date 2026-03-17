export type UserRole = 'CANDIDATE' | 'RECRUITER' | 'ADMIN';
export type ApplicationStatus =
  | 'APPLIED' | 'VIEWED' | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED' | 'OFFER_MADE' | 'REJECTED' | 'WITHDRAWN';
export type JobStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'CLOSED';
export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'FREELANCE';
export type WorkMode = 'REMOTE' | 'HYBRID' | 'ONSITE';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  industry: string | null;
  size: string | null;
  description: string | null;
  location: string | null;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string | null;
  benefits: string | null;
  company_culture: string | null;
  company_id: string;
  recruiter_id: string;
  location: string | null;
  work_mode: WorkMode;
  job_type: JobType;
  status: JobStatus;
  salary_min: number | null;
  salary_max: number | null;
  currency: string;
  experience_level: string | null;
  view_count: number;
  application_count: number;
  published_at: string | null;
  created_at: string;
  // joined
  company?: Company;
  job_skills?: JobSkill[];
  _count?: { applications: number };
}

export interface JobSkill {
  id: string;
  job_id: string;
  name: string;
  required: boolean;
}

export interface CandidateProfile {
  id: string;
  user_id: string;
  headline: string | null;
  summary: string | null;
  phone: string | null;
  location: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  github_url: string | null;
  ats_score: number | null;
  profile_strength: number;
  // joined
  candidate_skills?: CandidateSkill[];
  experiences?: Experience[];
  educations?: Education[];
  resumes?: Resume[];
}

export interface CandidateSkill {
  id: string;
  name: string;
  level: string | null;
  years_exp: number | null;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string | null;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  start_date: string;
  end_date: string | null;
  grade: string | null;
}

export interface Resume {
  id: string;
  candidate_id: string;
  name: string;
  file_url: string;
  file_size: number | null;
  mime_type: string | null;
  is_default: boolean;
  parsed_text: string | null;
  ats_score: number | null;
  score_breakdown: ATSBreakdown | null;
  created_at: string;
}

export interface ATSBreakdown {
  score: number;
  breakdown: { formatting: number; keywords: number; impact: number; clarity: number };
  suggestions: string[];
  missingKeywords: string[];
  strengths: string[];
}

export interface Application {
  id: string;
  candidate_id: string;
  job_id: string;
  resume_id: string | null;
  status: ApplicationStatus;
  cover_letter: string | null;
  match_score: number | null;
  recruiter_notes: string | null;
  rejection_reason: string | null;
  applied_at: string;
  viewed_at: string | null;
  // joined
  job?: Job;
  resume?: Resume;
  candidate?: CandidateProfile & { profiles?: Profile };
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  data: any;
  created_at: string;
}

// Placeholder to satisfy supabase-js generic
export type Database = any;
