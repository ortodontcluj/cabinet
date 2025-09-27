const { createClient } = require('@supabase/supabase-js');

// Înlocuiește valorile cu cele din dashboard-ul Supabase
const SUPABASE_URL = 'https://fqjxrmkqgmxecmddnquf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxanhybWtxZ214ZWNtZGRucXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjUxMDIsImV4cCI6MjA3NDU0MTEwMn0.VPGgSrJqAGREL4c3k4zD9Ueffg3Xpgm0gp02ew8x3fM';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
