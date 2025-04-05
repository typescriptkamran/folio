'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { sendResetLink } from '@/lib/sendResetLink';  // This should now work

export const signInAction = async (formData: FormData) => {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
};

export const signUpAction = async (formData: FormData) => {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
};

export async function forgotPasswordAction(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;

  // Call sendResetLink function (imported correctly from lib/sendResetLink.ts)
  const res = await sendResetLink(email); // Now it's correctly called

  if (!res.ok) {
    // redirect with error message
    redirect(`/forgot-password?message=${encodeURIComponent('Failed to send reset link.')}`);
  }

  // redirect with success message
  redirect(`/forgot-password?message=${encodeURIComponent('Reset link sent!')}`);
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();
  const newPassword = formData.get('password') as string;

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: 'Password reset successfully.' };
};
