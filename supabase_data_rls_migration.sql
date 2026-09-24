-- ==============================================================================
-- Supabase RLS Migration for Data Tables (events, media, members, achievements)
-- Re-enables policies based on the new RBAC architecture
-- ==============================================================================

-- ENABLE RLS on all data tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- 1. DROP EXISTING POLICIES (if they exist) so we can recreate them
DO $$ 
DECLARE
    tbl text;
    pol record;
BEGIN
    FOR tbl IN SELECT unnest(ARRAY['events', 'media', 'members', 'achievements'])
    LOOP
        FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = tbl
        LOOP
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, tbl);
        END LOOP;
    END LOOP;
END $$;

-- 2. CREATE NEW POLICIES

-- ========================================
-- READ ACCESS (For everyone, even public visitors, assuming public site shows events/achievements)
-- ========================================
CREATE POLICY "Public Read Access Events" ON events FOR SELECT USING (true);
CREATE POLICY "Public Read Access Media" ON media FOR SELECT USING (true);
CREATE POLICY "Public Read Access Members" ON members FOR SELECT USING (true);
CREATE POLICY "Public Read Access Achievements" ON achievements FOR SELECT USING (true);

-- ========================================
-- INSERT & UPDATE ACCESS
-- All Roles (superuser, faculty, technical) can insert and update
-- ========================================
CREATE POLICY "Auth Insert Events" ON events FOR INSERT TO authenticated 
WITH CHECK ( get_my_role() IN ('superuser', 'faculty', 'technical') );
CREATE POLICY "Auth Update Events" ON events FOR UPDATE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty', 'technical') );

CREATE POLICY "Auth Insert Media" ON media FOR INSERT TO authenticated 
WITH CHECK ( get_my_role() IN ('superuser', 'faculty', 'technical') );
CREATE POLICY "Auth Update Media" ON media FOR UPDATE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty', 'technical') );

CREATE POLICY "Auth Insert Members" ON members FOR INSERT TO authenticated 
WITH CHECK ( get_my_role() IN ('superuser', 'faculty', 'technical') );
CREATE POLICY "Auth Update Members" ON members FOR UPDATE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty', 'technical') );

CREATE POLICY "Auth Insert Achievements" ON achievements FOR INSERT TO authenticated 
WITH CHECK ( get_my_role() IN ('superuser', 'faculty', 'technical') );
CREATE POLICY "Auth Update Achievements" ON achievements FOR UPDATE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty', 'technical') );

-- ========================================
-- DELETE ACCESS
-- Only 'superuser' and 'faculty' can delete. 'technical' cannot delete.
-- ========================================
CREATE POLICY "Auth Delete Events" ON events FOR DELETE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty') );

CREATE POLICY "Auth Delete Media" ON media FOR DELETE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty') );

CREATE POLICY "Auth Delete Members" ON members FOR DELETE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty') );

CREATE POLICY "Auth Delete Achievements" ON achievements FOR DELETE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty') );
