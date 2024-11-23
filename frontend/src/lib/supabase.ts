// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// // Typy z Supabase do wykorzystania w kodzie
// type MediaFile = {
//     name: string;
//     public_url: string;
//     bucket_id: string;
// };


// export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// export type { MediaFile };

// import { createClient } from '@supabase/supabase-js';

// // Wstaw swój URL i anon key z panelu Supabase
// const supabaseUrl = 'https://cswuhyugfqkxtbycmfev.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzd3VoeXVnZnFreHRieWNtZmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzODU3NTYsImV4cCI6MjA0Nzk2MTc1Nn0.VC7MaWbXupeITaROqbCLm8EhJeA37C4gxbtfKGaXQ0g'; // Użyj klucza anon. publicznego

// // Inicjalizacja instancji Supabase
// export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@supabase/supabase-js';
// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )
// }

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);