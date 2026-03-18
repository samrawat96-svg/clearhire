'use client';
import { useAuthStore } from '@/store/authStore';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="p-5 flex flex-col gap-6 w-full pb-24">
      <div>
        <h1 className="text-2xl font-bold text-navy">Account Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your ClearHire settings</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-br from-[#00C853] to-[#00897B] rounded-full shadow-lg flex items-center justify-center text-white text-3xl font-bold mb-4">
          {user?.first_name?.[0] || 'C'}
        </div>
        <h2 className="text-xl font-bold text-navy">{user?.first_name} {user?.last_name}</h2>
        <div className="bg-[#e8f5e9] text-[#00C853] px-3 py-1 rounded-full text-xs font-bold mt-2 flex items-center gap-1">
          <Shield size={12} /> {user?.role}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            <User size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Full Name</p>
            <p className="font-semibold text-navy">{user?.first_name} {user?.last_name}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Email Address</p>
            <p className="font-semibold text-navy">{user?.email}</p>
          </div>
        </div>
      </div>

      <button onClick={handleLogout} className="w-full bg-red-50 text-red-500 font-bold py-4 mt-6 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2">
        <LogOut size={20} />
        Log Out Securely
      </button>
    </div>
  );
}
