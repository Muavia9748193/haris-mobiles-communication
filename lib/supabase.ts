import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lcuvdrkgilgjjikhddrt.supabase.co'
const supabaseAnonKey = 'sb_publishable_wp8qefTUxK4RHIwJX7eJvw_gVUSjSng'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)