import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key. This key
 * bypasses RLS, so this module must never be imported from a "use client"
 * component or any code that ships to the browser - it should only ever
 * be used inside API routes / server actions (e.g. app/api/quote/route.ts).
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);
