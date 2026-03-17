import { supabase } from './supabase';
import type { ApplicationStatus, WorkMode, JobType } from './database.types';

// ─── AUTH ─────────────────────────────────────────────────────
export const authApi = {
  async register(email: string, password: string, role: string, firstName: string, lastName: string, companyName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, first_name: firstName, last_name: lastName, company_name: companyName },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
    if (error) throw error;

    // Create profile row
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id, email, role,
        first_name: firstName, last_name: lastName,
      });

      if (role === 'CANDIDATE') {
        await supabase.from('candidate_profiles').insert({ user_id: data.user.id });
      } else if (role === 'RECRUITER') {
        // Create or find company
        let companyId: string;
        const { data: existingCompany } = await supabase
          .from('companies').select('id').eq('name', companyName || 'My Company').single();
        if (existingCompany) {
          companyId = existingCompany.id;
        } else {
          const { data: newCompany } = await supabase
            .from('companies').insert({ name: companyName || 'My Company' }).select('id').single();
          companyId = newCompany!.id;
        }
        await supabase.from('recruiter_profiles').insert({ user_id: data.user.id, company_id: companyId });
      }
    }
    return data;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    return { ...user, profile };
  },
};

// ─── JOBS ──────────────────────────────────────────────────────
export const jobsApi = {
  async getAll(filters?: { search?: string; workMode?: WorkMode; jobType?: JobType; salaryMin?: number; location?: string }) {
    let query = supabase
      .from('jobs')
      .select(`*, company:companies(*), job_skills(*)`)
      .eq('status', 'ACTIVE')
      .order('published_at', { ascending: false });

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    if (filters?.workMode) query = query.eq('work_mode', filters.workMode);
    if (filters?.jobType) query = query.eq('job_type', filters.jobType);
    if (filters?.location) query = query.ilike('location', `%${filters.location}%`);
    if (filters?.salaryMin) query = query.gte('salary_max', filters.salaryMin);

    const { data, error } = await query.limit(30);
    if (error) throw error;
    return data || [];
  },

  async getOne(id: string) {
    const { data, error } = await supabase
      .from('jobs')
      .select(`*, company:companies(*), job_skills(*), recruiter:recruiter_profiles(*, profiles(*))`)
      .eq('id', id)
      .single();
    if (error) throw error;

    // Increment view count
    await supabase.from('jobs').update({ view_count: (data.view_count || 0) + 1 }).eq('id', id);
    return data;
  },

  async create(recruiterId: string, jobData: any) {
    const { skills, ...rest } = jobData;

    // Get recruiter profile
    const { data: recruiter } = await supabase
      .from('recruiter_profiles').select('id, company_id').eq('user_id', recruiterId).single();
    if (!recruiter) throw new Error('Recruiter profile not found');

    const { data: job, error } = await supabase.from('jobs').insert({
      ...rest,
      recruiter_id: recruiter.id,
      company_id: recruiter.company_id,
      status: rest.publishNow ? 'ACTIVE' : 'DRAFT',
      published_at: rest.publishNow ? new Date().toISOString() : null,
    }).select().single();
    if (error) throw error;

    if (skills?.length > 0) {
      await supabase.from('job_skills').insert(
        skills.map((s: any) => ({ job_id: job.id, name: s.name, required: s.required ?? true }))
      );
    }
    return job;
  },

  async update(jobId: string, updates: any) {
    const { skills, ...rest } = updates;
    const { data, error } = await supabase.from('jobs').update(rest).eq('id', jobId).select().single();
    if (error) throw error;

    if (skills !== undefined) {
      await supabase.from('job_skills').delete().eq('job_id', jobId);
      if (skills.length > 0) {
        await supabase.from('job_skills').insert(
          skills.map((s: any) => ({ job_id: jobId, name: s.name, required: s.required ?? true }))
        );
      }
    }
    return data;
  },

  async publish(jobId: string) {
    return supabase.from('jobs').update({ status: 'ACTIVE', published_at: new Date().toISOString() }).eq('id', jobId);
  },

  async close(jobId: string) {
    return supabase.from('jobs').update({ status: 'CLOSED' }).eq('id', jobId);
  },

  async getMyJobs(userId: string) {
    const { data: recruiter } = await supabase
      .from('recruiter_profiles').select('id').eq('user_id', userId).single();
    if (!recruiter) return [];

    const { data, error } = await supabase
      .from('jobs')
      .select(`*, company:companies(name, logo_url), job_skills(*), applications(count)`)
      .eq('recruiter_id', recruiter.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
};

// ─── APPLICATIONS ──────────────────────────────────────────────
export const applicationsApi = {
  async apply(userId: string, jobId: string, resumeId?: string, coverLetter?: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    if (!candidate) throw new Error('Candidate profile not found');

    const { data, error } = await supabase.from('applications').insert({
      candidate_id: candidate.id,
      job_id: jobId,
      resume_id: resumeId || null,
      cover_letter: coverLetter || null,
    }).select().single();
    if (error) throw error;

    // Increment application count
    try { await supabase.rpc('increment_application_count', { job_id: jobId }); } catch(err) {}
    return data;
  },

  async getMine(userId: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    if (!candidate) return [];

    const { data, error } = await supabase
      .from('applications')
      .select(`*, job:jobs(*, company:companies(name, logo_url)), resume:resumes(name, ats_score)`)
      .eq('candidate_id', candidate.id)
      .order('applied_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getForJob(userId: string, jobId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        candidate:candidate_profiles(
          *, candidate_skills(*),
          experiences(*),
          profiles(first_name, last_name, email, avatar_url)
        ),
        resume:resumes(*)
      `)
      .eq('job_id', jobId)
      .order('applied_at', { ascending: false });
    if (error) throw error;

    // Mark as viewed
    await supabase.from('applications')
      .update({ status: 'VIEWED', viewed_at: new Date().toISOString() })
      .eq('job_id', jobId).eq('status', 'APPLIED');

    return data || [];
  },

  async updateStatus(appId: string, status: ApplicationStatus, notes?: string) {
    const { data, error } = await supabase.from('applications').update({
      status,
      recruiter_notes: notes,
      status_updated_at: new Date().toISOString(),
      ...(status === 'REJECTED' ? { rejection_reason: notes } : {}),
    }).eq('id', appId).select().single();
    if (error) throw error;
    return data;
  },

  async withdraw(userId: string, appId: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    return supabase.from('applications')
      .update({ status: 'WITHDRAWN' })
      .eq('id', appId).eq('candidate_id', candidate!.id);
  },

  async getStats(userId: string, role: string) {
    if (role === 'CANDIDATE') {
      const { data: candidate } = await supabase
        .from('candidate_profiles').select('id').eq('user_id', userId).single();
      if (!candidate) return {};
      const { data } = await supabase.from('applications').select('status').eq('candidate_id', candidate.id);
      const apps = data || [];
      return {
        total: apps.length,
        viewed: apps.filter(a => a.status === 'VIEWED').length,
        interviews: apps.filter(a => a.status === 'INTERVIEW_SCHEDULED').length,
        offers: apps.filter(a => a.status === 'OFFER_MADE').length,
      };
    }
    if (role === 'RECRUITER') {
      const { data: recruiter } = await supabase
        .from('recruiter_profiles').select('id').eq('user_id', userId).single();
      if (!recruiter) return {};
      const { data: jobs } = await supabase.from('jobs').select('id, status').eq('recruiter_id', recruiter.id);
      const jobIds = (jobs || []).map(j => j.id);
      const activeJobs = (jobs || []).filter(j => j.status === 'ACTIVE').length;
      if (!jobIds.length) return { activeJobs, totalApplications: 0, shortlisted: 0, interviews: 0 };
      const { data: apps } = await supabase.from('applications').select('status').in('job_id', jobIds);
      const a = apps || [];
      return {
        activeJobs,
        totalApplications: a.length,
        shortlisted: a.filter(x => x.status === 'SHORTLISTED').length,
        interviews: a.filter(x => x.status === 'INTERVIEW_SCHEDULED').length,
      };
    }
    return {};
  },
};

// ─── RESUMES ───────────────────────────────────────────────────
export const resumesApi = {
  async upload(userId: string, file: File, name: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    if (!candidate) throw new Error('Candidate profile not found');

    // Upload file to Supabase Storage
    const filePath = `${userId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('resumes').upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(filePath);

    // Count existing resumes
    const { count } = await supabase.from('resumes').select('*', { count: 'exact', head: true }).eq('candidate_id', candidate.id);

    const { data: resume, error } = await supabase.from('resumes').insert({
      candidate_id: candidate.id,
      name: name || file.name,
      file_url: publicUrl,
      file_size: file.size,
      mime_type: file.type,
      is_default: (count || 0) === 0,
    }).select().single();
    if (error) throw error;
    return resume;
  },

  async getMine(userId: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    if (!candidate) return [];
    const { data } = await supabase.from('resumes').select('*').eq('candidate_id', candidate.id).order('created_at', { ascending: false });
    return data || [];
  },

  async setDefault(userId: string, resumeId: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    if (!candidate) throw new Error('Not found');
    await supabase.from('resumes').update({ is_default: false }).eq('candidate_id', candidate.id);
    return supabase.from('resumes').update({ is_default: true }).eq('id', resumeId);
  },

  async delete(userId: string, resumeId: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    return supabase.from('resumes').delete().eq('id', resumeId).eq('candidate_id', candidate!.id);
  },
};

// ─── USERS / PROFILES ──────────────────────────────────────────
export const usersApi = {
  async getCandidateProfile(userId: string) {
    const { data, error } = await supabase
      .from('candidate_profiles')
      .select(`*, candidate_skills(*), experiences(*), educations(*), resumes(*)`)
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async updateCandidateProfile(userId: string, updates: any) {
    const { skills, experiences, educations, ...rest } = updates;
    const { data: existing } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();

    let profile;
    if (existing) {
      const { data } = await supabase.from('candidate_profiles').update(rest).eq('user_id', userId).select().single();
      profile = data;
    } else {
      const { data } = await supabase.from('candidate_profiles').insert({ user_id: userId, ...rest }).select().single();
      profile = data;
    }

    if (skills && profile) {
      await supabase.from('candidate_skills').delete().eq('candidate_id', profile.id);
      if (skills.length > 0) {
        await supabase.from('candidate_skills').insert(skills.map((s: any) => ({ candidate_id: profile.id, ...s })));
      }
    }

    // Update profile in profiles table too
    await supabase.from('profiles').update({
      first_name: rest.first_name,
      last_name: rest.last_name,
    }).eq('id', userId);

    return profile;
  },

  async getRecruiterProfile(userId: string) {
    const { data, error } = await supabase
      .from('recruiter_profiles')
      .select(`*, company:companies(*), profiles(*)`)
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async saveJob(userId: string, jobId: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    return supabase.from('saved_jobs').upsert({ candidate_id: candidate!.id, job_id: jobId });
  },

  async unsaveJob(userId: string, jobId: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    return supabase.from('saved_jobs').delete().eq('candidate_id', candidate!.id).eq('job_id', jobId);
  },

  async getSavedJobs(userId: string) {
    const { data: candidate } = await supabase
      .from('candidate_profiles').select('id').eq('user_id', userId).single();
    const { data } = await supabase.from('saved_jobs')
      .select(`*, job:jobs(*, company:companies(*), job_skills(*))`)
      .eq('candidate_id', candidate!.id).order('saved_at', { ascending: false });
    return data || [];
  },
};

// ─── NOTIFICATIONS ─────────────────────────────────────────────
export const notificationsApi = {
  async getAll(userId: string) {
    const { data } = await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(50);
    return data || [];
  },

  async getUnreadCount(userId: string) {
    const { count } = await supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('read', false);
    return count || 0;
  },

  async markAllRead(userId: string) {
    return supabase.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false);
  },
};
