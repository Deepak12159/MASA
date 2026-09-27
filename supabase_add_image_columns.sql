-- Add 'image' column to members and achievements tables
-- Run this in your Supabase SQL Editor

ALTER TABLE members ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS image TEXT;
