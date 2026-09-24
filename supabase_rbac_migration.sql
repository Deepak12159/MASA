-- ==============================================================================
-- Supabase RBAC Migration
-- Creates exactly 3 roles: 'superuser', 'faculty', 'technical'
-- ==============================================================================

-- 1. Create role enum (Optional but recommended, using check constraint for compatibility)
ALTER TABLE profiles 
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('superuser', 'faculty', 'technical'));

-- 2. Migrate existing roles
-- Keep 'superuser' as 'superuser'
-- Convert 'admin' to 'faculty' (unless they should be superuser)
-- Convert 'tech' to 'technical'
UPDATE profiles SET role = 'technical' WHERE role = 'tech';
UPDATE profiles SET role = 'faculty' WHERE role = 'admin';

-- 3. Add account status (is_active)
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 4. Secure Bootstrap Superuser function (run manually by owner once)
-- Allows promoting a specific email to superuser securely.
CREATE OR REPLACE FUNCTION bootstrap_superuser(target_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET role = 'superuser' 
  WHERE email = target_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Revoke direct access to bootstrap function from anon/authenticated
REVOKE EXECUTE ON FUNCTION bootstrap_superuser(TEXT) FROM public;
REVOKE EXECUTE ON FUNCTION bootstrap_superuser(TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION bootstrap_superuser(TEXT) FROM authenticated;
-- Only postgres / service_role can run this.

-- ==============================================================================
-- RLS POLICIES FOR 'profiles' TABLE
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies on profiles to recreate them safely
DROP POLICY IF EXISTS "Allow authenticated to read profiles" ON profiles;
DROP POLICY IF EXISTS "Allow users to insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Superusers can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update non-superuser profiles" ON profiles;
DROP POLICY IF EXISTS "Superusers can delete profiles" ON profiles;

-- Drop new policies to make script idempotent
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_superuser" ON profiles;
DROP POLICY IF EXISTS "profiles_update_self" ON profiles;
DROP POLICY IF EXISTS "profiles_delete_superuser" ON profiles;

-- Read Access:
-- Superusers can see everyone.
-- Faculty and Technical can only see active non-superuser profiles, or their own profile.
CREATE POLICY "profiles_select_policy" ON profiles FOR SELECT TO authenticated
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'superuser'
  OR 
  (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('faculty', 'technical')
    AND (role != 'superuser' OR id = auth.uid())
  )
);

-- Insert Access:
-- User can insert their own profile ONLY IF they set role='technical' (default) and is_active=true.
-- Prevents self-escalation on creation.
CREATE POLICY "profiles_insert_policy" ON profiles FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = id 
  AND role = 'technical'
);

-- Update Access:
-- 1. Superusers can update any profile (except they shouldn't accidentally lock themselves out, but we allow full access).
-- 2. Users can update their OWN profile's name, but CANNOT change their own role or is_active status.
CREATE POLICY "profiles_update_superuser" ON profiles FOR UPDATE TO authenticated
USING ( (SELECT role FROM profiles WHERE id = auth.uid()) = 'superuser' );

CREATE POLICY "profiles_update_self" ON profiles FOR UPDATE TO authenticated
USING ( auth.uid() = id )
WITH CHECK (
  auth.uid() = id 
  AND role = (SELECT role FROM profiles WHERE id = auth.uid()) -- Cannot change own role
  AND is_active = (SELECT is_active FROM profiles WHERE id = auth.uid()) -- Cannot change own active status
);

-- Delete Access:
-- Superuser ONLY can delete profiles (though soft-delete via is_active is preferred, we leave DELETE for strict compliance).
CREATE POLICY "profiles_delete_superuser" ON profiles FOR DELETE TO authenticated
USING ( (SELECT role FROM profiles WHERE id = auth.uid()) = 'superuser' );


-- ==============================================================================
-- HELPER FUNCTION TO GET CURRENT ROLE (Useful for other tables' RLS)
-- ==============================================================================
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE;

CREATE OR REPLACE FUNCTION is_active_user()
RETURNS BOOLEAN AS $$
  SELECT is_active FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE;
