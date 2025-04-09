
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Check for required environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

// Initialize the Supabase client
export const supabase = createClient<Database>(
  supabaseUrl || 'https://womywfryiogzkgpmutzb.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbXl3ZnJ5aW9nemtncG11dHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTE1ODQsImV4cCI6MjA1OTc4NzU4NH0.9LiFmdAMU8ZPQhDd-0LwLPzDmdL9d-BYyXw4afaAJzw',
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
