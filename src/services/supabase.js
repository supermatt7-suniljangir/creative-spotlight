/* eslint-disable no-unused-vars */
import { createClient } from '@supabase/supabase-js'
    
// Initialize 
const supabaseUrl = 'https://pcfgmvjdcqcbiichaacn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZmdtdmpkY3FjYmlpY2hhYWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MTgxODYsImV4cCI6MjAzNjI5NDE4Nn0.aolBs_7NcswW5yVRUMwKcIy6Z0EyAPSV-ZUWA5xmlNI';
const SERVER_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZmdtdmpkY3FjYmlpY2hhYWNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMDcxODE4NiwiZXhwIjoyMDM2Mjk0MTg2fQ.0xC4Faf1F8CsU7ZSiIS9tGvcdHEYVQc3X2kY5BdRLBg' 
const supabase = createClient(supabaseUrl, supabaseKey)

export  {supabase, supabaseUrl, supabaseKey, SERVER_ROLE_KEY};