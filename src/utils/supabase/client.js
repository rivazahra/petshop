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
        phone,
        address
      )
    `)
  if (error) {
    console.log('Error fetching pets:', error)
    return null
  }
  return data
}

export const getMedicalRecords = async ()=>{
  const {data,error} = await supabase.from('medical_records').select(`*,
    pets(
    id,
    name,
    species,
    birth_date,
    weight,
    gender,
    photo_url)`)
    
    if(error){
      console.log("Error fetching medical records:", error);
      return null
    }
    return data
}

