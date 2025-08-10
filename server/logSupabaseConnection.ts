import { supabase } from '../client/lib/supabaseClient';

export async function logSupabaseConnection() {
  try {
    const { error } = await supabase.from('test').select('*').limit(1);
    if (error) {
      // eslint-disable-next-line no-console
      console.error('[Supabase] Database connection failed:', error.message);
    } else {
      // eslint-disable-next-line no-console
      console.log('[Supabase] Database connection successful.');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[Supabase] Database connection error:', err);
  }
}
