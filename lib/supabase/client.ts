// Supabase Client Helper
// Allows connecting to a live Supabase instance with fallback to local mock mode
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  );
}
