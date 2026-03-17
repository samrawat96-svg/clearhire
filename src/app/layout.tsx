import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/shared/Providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ClearHire ATS — Hiring, Demystified',
  description: 'AI-powered recruitment platform for candidates and recruiters',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 antialiased">
        <Providers>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: { borderRadius: '12px', fontSize: '14px', fontFamily: 'Inter, sans-serif' },
              success: { iconTheme: { primary: '#00C853', secondary: '#fff' } },
              error: { iconTheme: { primary: '#FF3D00', secondary: '#fff' } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
