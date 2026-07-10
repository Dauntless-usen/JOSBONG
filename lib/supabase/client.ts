import { createClient } from "@supabase/supabase-js";

/**
 * Browser-safe Supabase client using the public anon key. Only ever use
 * this for operations allowed by the anon role's RLS policies (e.g.
 * uploading to the quote-attachments bucket) - never for privileged
 * operations like inserting into `leads`, which requires the service role
 * key and must stay server-only (see lib/supabase/admin.ts).
 */
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
