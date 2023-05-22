import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://elfwbaukwwwdkhfxpsue.supabase.co";
const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZndiYXVrd3d3ZGtoZnhwc3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyODU3MDQsImV4cCI6MTk5Njg2MTcwNH0.xT-vDevKTo8BkMtGUmtzLLmzW3mOuyZQEAfM3IQHMCY";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    },
});