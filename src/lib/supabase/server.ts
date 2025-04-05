import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookies(), // Correct, call the function to get the cookies object
    }
  );
