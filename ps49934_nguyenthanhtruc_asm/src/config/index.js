export default Object.freeze({
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  jwtSecret: import.meta.env.VITE_JWT_SECRET,
  jwtExpiration: import.meta.env.VITE_JWT_EXPIRATION,
});