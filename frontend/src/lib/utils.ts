

// export function getStrapiURL() {
//     return process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://fruitify-backend.onrender.com";
// }

// export function getStrapiMedia(url: string | null) {
//     if(url == null) return null;
//     if(url.startsWith("data:")) return url;
//     if(url.startsWith("https") || url.startsWith("//")) return url;
//     return `${getStrapiURL()}${url}`;
// }


import { supabase } from './supabase';

// Funkcja pobierająca URL do jednego pliku
export function getPublicUrl(path: string) {
    const { data } = supabase.storage
      .from('fruitify')
      .getPublicUrl(path);
  
    return data?.publicUrl;
  };
  

