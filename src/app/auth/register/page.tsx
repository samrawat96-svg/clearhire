'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('CANDIDATE');
  const [companyName, setCompanyName] = useState('');
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.register(email, password, role, firstName, lastName, companyName);
      toast.success('Account created successfully! Please log in.');
      router.push('/auth/login');
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#060f1e] text-white flex flex-col max-w-[430px] mx-auto p-6 shadow-xl relative">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#00C853] to-[#00897B] rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-[0_0_20px_rgba(0,200,83,0.3)]">
          ✦
        </div>
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-400 mb-8">Join ClearHire and demystify hiring.</p>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">
          <div className="flex gap-4">
            <input 
              className="w-1/2 bg-[#112240] rounded-xl px-4 py-3 outline-none border border-gray-800 focus:border-[#00C853] transition" 
              type="text" 
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required />
            <input 
              className="w-1/2 bg-[#112240] rounded-xl px-4 py-3 outline-none border border-gray-800 focus:border-[#00C853] transition" 
              type="text" 
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required />
          </div>
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
              required minLength={6} />
          </div>
          <div className="flex bg-[#112240] rounded-xl p-1 mt-2">
            <button
              type="button"
              onClick={() => setRole('CANDIDATE')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'CANDIDATE' ? 'bg-[#00C853] text-navy shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Candidate
            </button>
            <button
              type="button"
              onClick={() => setRole('RECRUITER')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'RECRUITER' ? 'bg-[#00C853] text-navy shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Recruiter
            </button>
          </div>
          
          {role === 'RECRUITER' && (
            <div className="mt-2 text-left">
              <label className="text-sm text-gray-400 mb-1 block ml-1">Company Name</label>
              <input 
                className="w-full bg-[#112240] rounded-xl px-4 py-3 outline-none border border-gray-800 focus:border-[#00C853] transition" 
                type="text" 
                placeholder="e.g. Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required={role === 'RECRUITER'} />
            </div>
          )}
          
          <button type="submit" className="w-full bg-[#00C853] text-navy font-bold py-3 mt-4 rounded-xl hover:bg-[#00e676] transition-all">
            Sign Up
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account? <span className="text-[#00C853] cursor-pointer hover:underline" onClick={() => router.push('/auth/login')}>Log In here</span>
        </p>
      </div>
    </div>
  );
}
