'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.resetPassword(email);
      setSent(true);
      toast.success('Reset link sent! Check your email.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="min-h-screen bg-[#060f1e] text-white flex flex-col max-w-[430px] mx-auto p-6 shadow-xl relative">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#00C853] to-[#00897B] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(0,200,83,0.3)]">
          ✦
        </div>
        
        {!sent ? (
          <>
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-gray-400 mb-8 px-2">Enter your email and we'll send you a secure link to reset your password.</p>
            
            <form onSubmit={handleReset} className="flex flex-col gap-4 w-full">
              <div>
                <input 
                  className="w-full bg-[#112240] rounded-xl px-4 py-3 outline-none border border-gray-800 focus:border-[#00C853] transition" 
                  type="email" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </div>
              <button type="submit" className="w-full bg-[#00C853] text-navy font-bold py-3 mt-4 rounded-xl hover:bg-[#00e676] transition-all shadow-lg">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2 text-[#00C853]">Check your email</h1>
            <p className="text-gray-400 mb-8 px-2">We've sent a password reset link to <strong>{email}</strong>.</p>
            <button onClick={() => router.push('/auth/login')} className="w-full bg-[#112240] text-white font-bold py-3 mt-4 rounded-xl border border-gray-800 hover:border-[#00C853] transition-all">
              Return to Log In
            </button>
          </>
        )}
        
        <p className="text-center mt-6 text-sm text-gray-500">
          Remembered your password? <Link href="/auth/login" className="text-[#00C853] cursor-pointer hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
