import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client with session persistence in cookies (handled by @supabase/ssr)
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Simple server client (deprecated in favor of createServerClient in actions/components)
// Keeping it for backward compatibility if used elsewhere, but it won't have auth context
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
export function createClient() {
    return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
