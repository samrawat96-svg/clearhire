'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Search, FileText, Upload, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const NAV = [
  { href: '/candidate/dashboard', icon: Home, label: 'Home' },
  { href: '/candidate/jobs', icon: Search, label: 'Jobs' },
  { href: '/candidate/applications', icon: FileText, label: 'Applied' },
  { href: '/candidate/resume', icon: Upload, label: 'Resume' },
  { href: '/candidate/profile', icon: User, label: 'Profile' },
];

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'CANDIDATE')) router.push('/auth/login');
  }, [user, loading, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-[#00C853] rounded-full animate-spin" />
    </div>
  );

  if (!user || user.role !== 'CANDIDATE') return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-[430px] mx-auto relative shadow-xl">
      <main className="flex-1 pb-[72px] overflow-y-auto">{children}</main>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-stretch justify-around px-1 pb-[env(safe-area-bottom,0px)]">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href}
                className={`flex flex-col items-center justify-center gap-0.5 py-2.5 flex-1 relative transition-all ${
                  active ? 'text-[#0A192F]' : 'text-gray-400 hover:text-gray-500'
                }`}>
                {active && <span className="absolute top-0 inset-x-0 h-0.5 bg-[#00C853]" />}
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                <span className={`text-[10px] font-medium ${active ? 'text-[#0A192F]' : 'text-gray-400'}`}>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
