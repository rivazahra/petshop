import { supabase } from './supabase/client'

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) throw error
  return data
}

export const Logout = async (navigate) => {
  await supabase.auth.signOut()
  localStorage.clear()
  sessionStorage.clear()
  navigate('/login')
  
}
