-- ============================================
-- PRE-MIGRATION CHECK
-- ============================================
-- Run this query FIRST to check for duplicate usernames (case-insensitive)
-- If any results are returned, resolve duplicates before proceeding

SELECT 
    LOWER(username) as username_lower, 
    COUNT(*) as count, 
    STRING_AGG(username, ', ') as variants
FROM "user" 
GROUP BY LOWER(username) 
HAVING COUNT(*) > 1;

-- ============================================
-- EXPECTED RESULT: No rows returned
-- If rows are returned, you have duplicate usernames that need resolution
-- 
-- RESOLUTION OPTIONS:
-- 1. Manually rename duplicate usernames to make them unique
-- 2. Contact affected users to choose new usernames
-- 3. Append numbers to duplicates (e.g., "john" -> "john2")
--
-- Example resolution for duplicates:
-- UPDATE "user" SET username = 'john2' WHERE username = 'John' AND id = 123;
-- ============================================


-- ============================================
-- MAIN MIGRATION
-- ============================================
-- Add portfolio-related fields to user table
-- Only run this after confirming no duplicates exist above

BEGIN;

-- Add new columns for portfolio functionality
ALTER TABLE "user" 
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT TRUE NOT NULL,
ADD COLUMN IF NOT EXISTS theme_preference VARCHAR(50) DEFAULT 'classic',
ADD COLUMN IF NOT EXISTS analytics_enabled BOOLEAN DEFAULT FALSE NOT NULL;

-- Create index for public portfolio queries (improves performance)
CREATE INDEX IF NOT EXISTS ix_user_is_public ON "user" (is_public);

-- Create index for case-insensitive username lookups (already exists from previous migration)
-- This ensures /portfolio/JohnDoe and /portfolio/johndoe work identically
CREATE UNIQUE INDEX IF NOT EXISTS ix_user_username_lower ON "user" (LOWER(username));

-- Verify the changes
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'user' 
  AND column_name IN ('is_public', 'theme_preference', 'analytics_enabled')
ORDER BY column_name;

COMMIT;

-- ============================================
-- POST-MIGRATION VERIFICATION
-- ============================================
-- Run these queries to verify the migration was successful

-- 1. Check that all users have the new fields with correct defaults
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN is_public = TRUE THEN 1 END) as public_portfolios,
    COUNT(CASE WHEN is_public = FALSE THEN 1 END) as private_portfolios,
    COUNT(CASE WHEN theme_preference = 'classic' THEN 1 END) as classic_theme,
    COUNT(CASE WHEN analytics_enabled = TRUE THEN 1 END) as analytics_enabled_count
FROM "user";

-- 2. Verify indexes were created
SELECT 
    indexname, 
    indexdef 
FROM pg_indexes 
WHERE tablename = 'user' 
  AND indexname IN ('ix_user_is_public', 'ix_user_username_lower')
ORDER BY indexname;

-- ============================================
-- ROLLBACK SCRIPT (if needed)
-- ============================================
-- Only use this if you need to undo the migration

-- BEGIN;
-- DROP INDEX IF EXISTS ix_user_is_public;
-- ALTER TABLE "user" DROP COLUMN IF EXISTS is_public;
-- ALTER TABLE "user" DROP COLUMN IF EXISTS theme_preference;
-- ALTER TABLE "user" DROP COLUMN IF EXISTS analytics_enabled;
-- COMMIT;
