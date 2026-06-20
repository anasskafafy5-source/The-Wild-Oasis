import { createClient } from '@supabase/supabase-js';

// استدعاء المتغيرات السرية بالطريقة الخاصة بـ Vite
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// إنشاء العميل (Client) وتصديره للمشروع
export const supabase = createClient(supabaseUrl, supabaseAnonKey);