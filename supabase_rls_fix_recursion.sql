-- ==============================================================================
-- FIX: Supabase RLS Migration for Profiles (Fixing Infinite Recursion)
-- ==============================================================================

-- 1. Helper function for securely fetching role (Bypasses RLS to avoid infinite loops)
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE;

-- 2. Helper function for securely fetching active status
CREATE OR REPLACE FUNCTION get_my_active_status()
RETURNS BOOLEAN AS $$
  SELECT is_active FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE;

-- Drop all problematic policies on profiles
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_superuser" ON profiles;
DROP POLICY IF EXISTS "profiles_update_self" ON profiles;
DROP POLICY IF EXISTS "profiles_delete_superuser" ON profiles;
DROP POLICY IF EXISTS "Allow authenticated to read profiles" ON profiles;
DROP POLICY IF EXISTS "Allow users to insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Superusers can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update non-superuser profiles" ON profiles;
DROP POLICY IF EXISTS "Superusers can delete profiles" ON profiles;

-- 3. READ ACCESS
CREATE POLICY "profiles_select_policy" ON profiles FOR SELECT TO authenticated
USING (
  id = auth.uid() -- Fast path: A user can always read their own profile
  OR get_my_role() = 'superuser' -- Superusers can read all profiles
  OR (
    get_my_role() IN ('faculty', 'technical')
    AND role != 'superuser' -- Faculty/Tech cannot see Superusers
  )
);

-- 4. INSERT ACCESS
CREATE POLICY "profiles_insert_policy" ON profiles FOR INSERT TO authenticated
WITH CHECK (
  get_my_role() = 'superuser' -- Superuser can insert any profile
  OR 
  (
    auth.uid() = id 
    AND role = 'technical' -- Normal users can only insert themselves as 'technical' initially
  )
);

-- 5. UPDATE ACCESS
CREATE POLICY "profiles_update_superuser" ON profiles FOR UPDATE TO authenticated
USING ( get_my_role() = 'superuser' );

CREATE POLICY "profiles_update_self" ON profiles FOR UPDATE TO authenticated
USING ( auth.uid() = id )
WITH CHECK (
  auth.uid() = id 
  AND role = get_my_role() -- A normal user cannot change their own role
  AND is_active = get_my_active_status() -- A normal user cannot change their own active status
);

-- 6. DELETE ACCESS
CREATE POLICY "profiles_delete_superuser" ON profiles FOR DELETE TO authenticated
USING ( get_my_role() = 'superuser' );
