'use client';
import { useAuthStore } from '@/store/authStore';
import { JobCard } from '@/components/shared/JobCard';
import { useEffect, useState } from 'react';
import { jobsApi } from '@/lib/api';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobsApi.getAll()
      .then((data) => setJobs(data.slice(0, 5)))
      .catch((err) => console.log('Notice: Ensure Supabase credentials are set in .env.local', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-5 flex flex-col gap-6 w-full pb-24">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-navy to-[#112240]">
            {user?.first_name || 'Candidate'} 👋
          </h1>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-[#00C853] to-[#00897B] rounded-full shadow-lg flex items-center justify-center text-white text-xl font-bold border-2 border-white ring-2 ring-green-100">
          {user?.first_name?.[0] || 'C'}
        </div>
      </div>

      <div className="bg-gradient-to-r from-navy to-[#112240] rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <h2 className="text-lg font-bold mb-1">Your Profile is Top 15%</h2>
        <p className="text-sm opacity-80 mb-4 max-w-[80%]">
          Employers are actively searching for your skillset today.
        </p>
        <button className="bg-white text-navy px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-gray-50 transition w-max">
          Review Insights →
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-navy">Recommended Jobs</h2>
          <span className="text-sm text-[#00C853] font-medium cursor-pointer hover:underline">See all</span>
        </div>
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="h-32 skeleton rounded-2xl w-full" />
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} showMatchScore matchScore={85 + Math.floor(Math.random() * 12)} />
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              No jobs found. Connect your Supabase project!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
