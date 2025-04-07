'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { sendResetLink } from '@/lib/sendResetLink'; // This should now work

// ❌ Removed broken unnamed export (you had `export const = async...`)

// ✅ Sign In Action
export const signInAction = async (formData: FormData): Promise<void> => {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/sign-in?message=${encodeURIComponent(error.message)}`);
  }

  redirect('/dashboard');
};

// ✅ Forgot Password Action
export async function forgotPasswordAction(formData: FormData): Promise<void> {
  const email = formData.get('email') as string;

  const res = await sendResetLink(email);

  if (!res.ok) {
    redirect(`/forgot-password?message=${encodeURIComponent('Failed to send reset link.')}`);
  }

  redirect(`/forgot-password?message=${encodeURIComponent('Reset link sent!')}`);
}

// ✅ Reset Password Action
export const resetPasswordAction = async (formData: FormData): Promise<void> => {
  const supabase = createClient();
  const newPassword = formData.get('password') as string;

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    redirect(`/reset-password?message=${encodeURIComponent(error.message)}`);
  }

  redirect(`/reset-password?message=${encodeURIComponent('Password reset successfully.')}`);
};

export const signUpAction = async (formData: FormData): Promise<void> => {
  const supabase = createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect(`/sign-up?message=${encodeURIComponent(error.message)}`);
  }

  redirect('/dashboard');
};


