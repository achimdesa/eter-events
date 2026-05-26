const supabaseUrl = 'https://ameswctizbwbkcclkvve.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZXN3Y3RpemJ3YmtjY2xrdnZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODcxMjMsImV4cCI6MjA5NTM2MzEyM30.iGj2QcKa70IeANK-tjh_bKtlhFwtgot267HrIAvraW8';

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);
