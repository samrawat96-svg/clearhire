'use client';
import { useState, useEffect } from 'react';
import { applicationsApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Building2, MapPin, CheckCircle2, Clock, XCircle, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsPage() {
  const { user } = useAuthStore();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      applicationsApi.getMine(user.id)
        .then((data) => setApps(data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'OFFER_MADE': return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' };
      case 'INTERVIEW_SCHEDULED': return { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'VIEWED': return { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-50' };
      case 'REJECTED': return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' };
      case 'WITHDRAWN': return { icon: XCircle, color: 'text-gray-500', bg: 'bg-gray-50' };
      default: return { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  return (
    <div className="p-5 flex flex-col gap-6 w-full pb-24">
      <div>
        <h1 className="text-2xl font-bold text-navy">Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Track your latest job applications</p>
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          <>
            <div className="h-24 skeleton rounded-2xl w-full" />
            <div className="h-24 skeleton rounded-2xl w-full" />
          </>
        ) : apps.length > 0 ? (
          apps.map((app) => {
            const config = getStatusConfig(app.status);
            const StatusIcon = config.icon;
            
            return (
              <div key={app.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-navy">{app.job?.title}</h2>
                    <div className="flex items-center gap-2 mt-1 text-gray-500 text-xs">
                      <Building2 size={12} /> <span>{app.job?.company?.name || 'Company Name'}</span>
                      <span className="text-gray-300">•</span>
                      <MapPin size={12} /> <span>{app.job?.location || 'Remote'}</span>
                    </div>
                  </div>
                  <img src={app.job?.company?.logo_url || `https://ui-avatars.com/api/?name=${app.job?.company?.name || 'CP'}&background=random`} alt="Logo" className="w-10 h-10 object-cover rounded-lg border border-gray-100" />
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${config.bg} ${config.color}`}>
                    <StatusIcon size={12} />
                    <span>{app.status.replace('_', ' ')}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(app.applied_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <FileText size={30} />
            </div>
            <h3 className="font-bold text-navy mb-1">No Applications Yet</h3>
            <p className="text-sm text-gray-500 mb-6">You haven't applied to any jobs recently.</p>
            <Link href="/candidate/jobs" className="bg-[#00C853] text-navy px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#00e676] transition">
              Find Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
