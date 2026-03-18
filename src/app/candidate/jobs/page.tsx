'use client';
import { useState, useEffect } from 'react';
import { jobsApi } from '@/lib/api';
import { JobCard } from '@/components/shared/JobCard';
import { Search } from 'lucide-react';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    jobsApi.getAll()
      .then((data) => setJobs(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter(j => j.title?.toLowerCase().includes(search.toLowerCase()) || j.company?.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-5 flex flex-col gap-6 w-full pb-24">
      <div>
        <h1 className="text-2xl font-bold text-navy">Find Jobs</h1>
        <p className="text-gray-500 text-sm mt-1">Discover your next career move</p>
      </div>

      <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3">
        <Search className="text-gray-400 mr-3" size={20} />
        <input 
          type="text" 
          placeholder="Search roles or companies..." 
          className="flex-1 outline-none text-sm bg-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <>
            <div className="h-32 skeleton rounded-2xl w-full" />
            <div className="h-32 skeleton rounded-2xl w-full" />
            <div className="h-32 skeleton rounded-2xl w-full" />
          </>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} showMatchScore matchScore={80 + Math.floor(Math.random() * 20)} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-100">
            No jobs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
