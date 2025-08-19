import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
export const supabaseUrl = "https://ykbsjxhdbmovuynnxtfs.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
console.log("Supabase Key:", supabaseKey); // Debugging line to check the key
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
