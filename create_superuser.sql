-- CREATE A SUPERUSER DIRECTLY IN SUPABASE

DO $$
DECLARE
    -- Generate a new unique ID for the user
    new_user_id uuid := gen_random_uuid();
    
    -- ! SET YOUR DESIRED EMAIL AND PASSWORD HERE !
    user_email text := 'admin@medicaps.ac.in';
    user_password text := 'Medicaps@123';
BEGIN
    -- 1. Insert into auth.users (Supabase's built-in authentication table)
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin
    )
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        new_user_id,
        'authenticated',
        'authenticated',
        user_email,
        crypt(user_password, gen_salt('bf')), -- Encrypts the password
        now(), -- Automatically confirms the email
        now(),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{}',
        false
    );

    -- 2. Insert into our custom public.profiles table as 'superuser'
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
        new_user_id, 
        user_email, 
        'Super Admin', 
        'superuser'
    );

END $$;
