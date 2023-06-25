import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://citvmvnrirthbmiaaost.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpdHZtdm5yaXJ0aGJtaWFhb3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2OTc3NzAsImV4cCI6MjAwMzI3Mzc3MH0._6McaLumxeGihOtc5Uo2ZSl2o5PWcH76TorIa17pj8Q";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
