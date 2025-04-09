
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Initialize the Supabase client
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: {
      // Enable real-time subscriptions for collaboration
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

// Configure realtime presence for better typing experience
const channel = supabase.channel('global');
channel.subscribe((status) => {
  if (status === 'SUBSCRIBED') {
    console.log('Successfully subscribed to global channel');
  }
});
