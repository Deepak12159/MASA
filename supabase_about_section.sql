-- ==============================================================================
-- Site Settings Table for Editable About Section
-- ==============================================================================

CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(50) UNIQUE NOT NULL,
    value TEXT NOT NULL
);

-- Insert default About content
INSERT INTO site_settings (key, value)
VALUES ('about_content', 'Welcome to MAASA (Medi-Caps Aeronautics and Space Association). We are dedicated to exploring the frontiers of technology and space.')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 1. Read access for everyone
CREATE POLICY "Public Read Access Site Settings" ON site_settings FOR SELECT USING (true);

-- 2. Update access for Superusers and Faculty only
CREATE POLICY "Admin Update Site Settings" ON site_settings FOR UPDATE TO authenticated 
USING ( get_my_role() IN ('superuser', 'faculty', 'technical') );

CREATE POLICY "Admin Insert Site Settings" ON site_settings FOR INSERT TO authenticated 
WITH CHECK ( get_my_role() IN ('superuser', 'faculty', 'technical') );
