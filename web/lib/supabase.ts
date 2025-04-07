import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create a single instance of the Supabase client to reuse throughout the app
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
