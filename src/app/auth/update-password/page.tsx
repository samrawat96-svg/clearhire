'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Quick check to see if the user was able to establish a temporary session from the email URL
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error('Invalid or expired reset link. Please request a new one.');
      }
    });
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.updatePassword(password);
      toast.success('Password updated securely! Redirecting...');
      setTimeout(() => router.push('/candidate/dashboard'), 2000);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060f1e] text-white flex flex-col max-w-[430px] mx-auto p-6 shadow-xl relative">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#00C853] to-[#00897B] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(0,200,83,0.3)]">
          ✦
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Create New Password</h1>
        <p className="text-gray-400 mb-8 px-2">Type in a strong, new password for your ClearHire account.</p>
        
        <form onSubmit={handleUpdate} className="flex flex-col gap-4 w-full">
          <div>
            <input 
              className="w-full bg-[#112240] rounded-xl px-4 py-3 outline-none border border-gray-800 focus:border-[#00C853] transition" 
              type="password" 
              placeholder="New password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required disabled={loading} />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#00C853] text-navy font-bold py-3 mt-4 rounded-xl hover:bg-[#00e676] transition-all shadow-lg">
            {loading ? 'Securing...' : 'Set new password'}
          </button>
        </form>
      </div>
    </div>
  );
}
