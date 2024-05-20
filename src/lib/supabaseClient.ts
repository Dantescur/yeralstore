import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

/**
 * The Supabase client is used to interact with the Supabase API.
 * It is initialized with the Supabase project URL and the Supabase API key.
 * These are stored in the environment variables VITE_SUPABASE_URL and VITE_SUPABASE_KEY.
 *
 * @see https://supabase.io/docs/reference/javascript/initializing
 */
export const supabase = createClient<Database>(
    // The Supabase project URL
    import.meta.env.VITE_SUPABASE_URL,
    // The Supabase API key
    import.meta.env.VITE_SUPABASE_KEY
)

