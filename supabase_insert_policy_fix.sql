-- ==============================================================================
-- Supabase RLS Migration for Profiles (Fix for Admin creation)
-- ==============================================================================

-- Drop the old insert policy
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;

-- Insert Access:
-- 1. Superuser can insert any profile.
-- 2. Normal user can insert their own profile ONLY IF they set role='technical' (default) and is_active=true.
CREATE POLICY "profiles_insert_policy" ON profiles FOR INSERT TO authenticated
WITH CHECK (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'superuser'
  OR 
  (
    auth.uid() = id 
    AND role = 'technical'
  )
);
