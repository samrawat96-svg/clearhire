'use client';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';
import React, { useState } from 'react';
import { usersApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

interface Props { job: any; showMatchScore?: boolean; matchScore?: number; }

export function JobCard({ job, showMatchScore, matchScore }: Props) {
  const [saved, setSaved] = useState(false);
  const { user } = useAuthStore();

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to save jobs');
      return;
    }
    try {
      if (saved) { await usersApi.unsaveJob(user.id, job.id); setSaved(false); toast('Removed from saved'); }
      else { await usersApi.saveJob(user.id, job.id); setSaved(true); toast.success('Job saved!'); }
    } catch { toast.error('Failed to update saved jobs'); }
  };

  const salary = job.salaryMin && job.salaryMax
    ? `$${(job.salaryMin/1000).toFixed(0)}k–$${(job.salaryMax/1000).toFixed(0)}k`
    : job.salaryMin ? `From $${(job.salaryMin/1000).toFixed(0)}k` : null;

  return (
    <Link href={`/candidate/jobs/${job.id}`} className="block bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-base font-bold text-gray-500 overflow-hidden">
            {job.company?.logoUrl
              ? <img src={job.company.logoUrl} alt="" className="w-full h-full object-cover" />
              : job.company?.name?.[0] || '?'}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#0A192F]">{job.title}</p>
            <p className="text-xs text-gray-500 truncate">{job.company?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {(showMatchScore && matchScore) && (
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
               matchScore >= 80 ? 'bg-green-50 text-[#00C853]' :
               matchScore >= 60 ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-500'
            }`}>
              {matchScore}%
            </span>
          )}
          <button onClick={handleSave} className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${saved ? 'bg-[#0A192F] text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
            <Bookmark size={14} fill={saved ? 'white' : 'none'} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {job.location && (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin size={11} />{job.location}
          </span>
        )}
        {job.workMode && (
          <span className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-lg">
            {job.workMode.replace('_', ' ')}
          </span>
        )}
        {job.jobType && (
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg">
            {job.jobType.replace('_', ' ')}
          </span>
        )}
        {salary && (
          <span className="flex items-center gap-1 text-xs text-[#00C853] font-semibold">
            <DollarSign size={11} />{salary}
          </span>
        )}
      </div>

      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {job.skills.slice(0, 3).map((s: any) => (
            <span key={s.id} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md border border-gray-100">{s.name}</span>
          ))}
          {job.skills.length > 3 && <span className="text-[10px] text-gray-400">+{job.skills.length - 3} more</span>}
        </div>
      )}
    </Link>
  );
}
