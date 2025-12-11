// @ts-ignore
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a dummy client if env variables are missing to prevent crash
// This allows the app to run with mocked AuthContext even without Supabase config
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      signUp: async () => ({ error: { message: 'Supabase not configured' } }),
      signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }),
      signInWithOAuth: async () => ({ error: { message: 'Supabase not configured' } }),
      signOut: async () => ({}),
      resetPasswordForEmail: async () => ({ error: { message: 'Supabase not configured' } }),
      updateUser: async () => ({ error: { message: 'Supabase not configured' } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => ({ data: null, error: null }) }) }),
      insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }) }),
      delete: () => ({ eq: () => ({}) }),
    })
  } as any