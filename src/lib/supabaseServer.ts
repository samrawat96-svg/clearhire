import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './database.types';

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabaseUrl = (envUrl.length > 5 && envUrl !== 'undefined') ? envUrl : 'https://wjmobincmubhnbcvpiwa.supabase.co';
const supabaseAnonKey = (envKey.length > 5 && envKey !== 'undefined') ? envKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbW9iaW5jbXViaG5iY3ZwaXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NzUxNTMsImV4cCI6MjA4OTM1MTE1M30.7Ko-LBmv1eIaA1wdo2WcHp0F98N-qeHuZYAYbaIFJ04';

// ─── Server client (use in Server Components / API Routes) ─────
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options));
        } catch {}
      },
    },
  });
}
