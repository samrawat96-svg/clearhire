'use client';
import { useState, useEffect } from 'react';
import { resumesApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { UploadCloud, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ResumePage() {
  const { user } = useAuthStore();
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      resumesApi.getMine(user.id)
        .then((data) => setResumes(data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    setUploading(true);
    const loadingToast = toast.loading('Uploading resume...');
    try {
      const newResume = await resumesApi.upload(user.id, file, file.name);
      setResumes([newResume, ...resumes]);
      toast.success('Resume uploaded successfully', { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload', { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await resumesApi.delete(user.id, id);
      setResumes(resumes.filter(r => r.id !== id));
      toast.success('Resume deleted');
    } catch (err: any) {
      toast.error('Failed to delete resume');
    }
  };

  return (
    <div className="p-5 flex flex-col gap-6 w-full pb-24">
      <div>
        <h1 className="text-2xl font-bold text-navy">Resume Manager</h1>
        <p className="text-gray-500 text-sm mt-1">Upload and manage your CVs for rapid applying.</p>
      </div>

      <label className={`border-2 border-dashed border-[#00C853] bg-[#e8f5e9] p-8 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#dcedc8] transition-all group ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
          <UploadCloud className="text-[#00C853]" size={28} />
        </div>
        <span className="font-bold text-navy text-lg text-center">{uploading ? 'Uploading...' : 'Tap to Upload Resume'}</span>
        <span className="text-sm text-gray-500 mt-1 text-center">PDF, DOCX (Max 5MB)</span>
        <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleUpload} disabled={uploading} />
      </label>

      <div>
        <h2 className="font-bold text-lg text-navy mb-4">Your Files</h2>
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="h-16 skeleton rounded-2xl w-full" />
          ) : resumes.length > 0 ? (
            resumes.map((resume) => (
              <div key={resume.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm break-all max-w-[180px] truncate">{resume.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{(resume.file_size / 1024 / 1024).toFixed(2)} MB • {new Date(resume.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resume.is_default && (
                    <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 size={10} /> Default
                    </div>
                  )}
                  <button onClick={() => handleDelete(resume.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
             <div className="text-center text-gray-400 py-8 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
               No resumes uploaded yet.
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
