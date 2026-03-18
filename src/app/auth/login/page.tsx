'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.login(email, password);
      toast.success('Signed in successfully');
      router.push('/candidate/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#060f1e] text-white flex flex-col max-w-[430px] mx-auto p-6 shadow-xl relative">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#00C853] to-[#00897B] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(0,200,83,0.3)]">
          ✦
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Sign in to your ClearHire account</p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <div>
            <input 
              className="w-full bg-[#112240] rounded-xl px-4 py-3 outline-none border border-gray-800 focus:border-[#00C853] transition" 
              type="email" 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div>
            <input 
              className="w-full bg-[#112240] rounded-xl px-4 py-3 outline-none border border-gray-800 focus:border-[#00C853] transition" 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div className="text-right">
            <Link href="/auth/forgot-password" className="text-[#00C853] text-sm cursor-pointer hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full bg-[#00C853] text-navy font-bold py-3 mt-4 rounded-xl hover:bg-[#00e676] transition-all">
            Log In
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-500">
          First time here? <span className="text-[#00C853] cursor-pointer hover:underline" onClick={() => router.push('/auth/register')}>Create an account</span>
        </p>
      </div>
    </div>
  );
}
