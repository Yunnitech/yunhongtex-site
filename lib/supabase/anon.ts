import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous read-only Supabase client. Deliberately does NOT touch cookies so
 * front-end pages stay statically pre-renderable. Writes go through the
 * authenticated client in `lib/supabase/server.ts`.
 */
export function createAnonSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}
