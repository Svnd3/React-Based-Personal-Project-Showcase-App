import { createClient } from "@supabase/supabase-js";

// Support either VITE_API_URL or VITE_SUPABASE_URL (common naming in Vercel)
const supabaseUrl =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
