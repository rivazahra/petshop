import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getPatient = async () => {
  const { data, error } = await supabase.from('pets').select(`
      *,
      owners (
        name,
        email,
        phone
      )
    `)
  if (error) {
    console.log('Error fetching pets:', error)
    return null
  }
  console.log('data',data);
  
  return data
}
