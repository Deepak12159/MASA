-- Supabase Row Level Security (RLS) setup for 'profiles' table

-- 1. Enable RLS on the profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Allow any authenticated user to read all profiles (required for UI to list members/admins)
CREATE POLICY "Allow authenticated to read profiles" 
ON profiles FOR SELECT 
TO authenticated USING (true);

-- 3. Allow a newly registered user to insert their own profile upon first login
CREATE POLICY "Allow users to insert their own profile" 
ON profiles FOR INSERT 
TO authenticated WITH CHECK (auth.uid() = id);

-- 4. Superuser can update ALL profiles (including changing roles of admins and other superusers)
CREATE POLICY "Superusers can update all profiles" 
ON profiles FOR UPDATE 
TO authenticated 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'superuser'
);

-- 5. Admin can update profiles, BUT they cannot update a superuser's profile 
-- They also cannot accidentally or intentionally promote someone to 'superuser'
CREATE POLICY "Admins can update non-superuser profiles" 
ON profiles FOR UPDATE 
TO authenticated 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' 
  AND role != 'superuser'
)
WITH CHECK (
  role != 'superuser' 
);

-- 6. Superuser can delete (terminate) any profile
CREATE POLICY "Superusers can delete profiles" 
ON profiles FOR DELETE 
TO authenticated 
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'superuser'
);
