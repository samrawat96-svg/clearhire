'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060f1e] text-white flex flex-col max-w-[430px] mx-auto relative shadow-xl px-6 py-10">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-[#00C853] to-[#00897B] rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-[0_0_30px_rgba(0,200,83,0.3)]">
          ✦
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Clear<span className="text-[#00C853]">Hire</span>
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Hiring, Demystified.
        </p>
        
        <Link href="/auth/register" className="w-full bg-gradient-to-br from-[#00C853] to-[#00897B] text-[#0A192F] font-bold text-lg py-4 rounded-2xl mb-4 hover:shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all flex items-center justify-center">
          Get Started Free
        </Link>
        <div className="text-gray-500 text-sm">
          Are you a recruiter? <Link href="/auth/login" className="text-[#00C853]">Company Portal</Link>
        </div>
      </div>
    </div>
  );
}
