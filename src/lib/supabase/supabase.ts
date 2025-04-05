import { createServerClient } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';

export const createClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: nextCookies(), // ✅ Call the function
    }
  );
};
