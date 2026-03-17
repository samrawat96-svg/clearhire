import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wjmoblincmubhnbcvpiwa.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbW9iaW5jbXViaG5iY3ZwaXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NzUxNTMsImV4cCI6MjA4OTM1MTE1M30.7Ko-LBmv1eIaA1wdo2WcHp0F98N-qeHuZYAYbaIFJ04';

// ─── Browser client (use in Client Components) ─────────────────
export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

// ─── Singleton for client-side use ─────────────────────────────
export const supabase = createClient();
