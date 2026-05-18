import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Throw errors in development if variables are missing
if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
  if (import.meta.env.DEV) {
    console.warn('Missing or invalid Supabase environment variables. Features requiring backend will fail.');
  }
}

const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http');

export const supabase = createClient(
  isValidUrl ? supabaseUrl : 'https://placeholder-project.supabase.co',
  supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key' ? supabaseAnonKey : 'placeholder-anon-key'
);
