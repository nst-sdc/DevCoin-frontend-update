import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const signUpUser = async (email: string, password: string, username: string) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (authError) throw authError;

  // Add user to leaderboard
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user!.id,
        username,
        points: 0,
        contributions: 0,
      },
    ]);

  if (profileError) throw profileError;

  return authData;
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
};

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
};

export const updateUserProfile = async (userId: string, updates: Partial<Database['public']['Tables']['profiles']['Row']>) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  if (error) throw error;
};

export const getLeaderboard = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('points', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Project Management Functions
export const isAdmin = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (error) return false;
  return !!data;
};

export const addProject = async (
  project: Database['public']['Tables']['projects']['Insert']
) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProject = async (
  projectId: string,
  updates: Database['public']['Tables']['projects']['Update']
) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getActiveProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getAllProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const deactivateAllProjects = async () => {
  const { error } = await supabase
    .from('projects')
    .update({ is_active: false })
    .eq('is_active', true);

  if (error) throw error;
};
