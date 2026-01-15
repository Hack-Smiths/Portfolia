-- Migration: Change avatar column from VARCHAR to TEXT to support base64 image data
-- Date: 2026-01-16
-- Reason: Base64-encoded images are too large for VARCHAR(500), causing DataError

-- Change the avatar column type from VARCHAR to TEXT
ALTER TABLE profiles 
ALTER COLUMN avatar TYPE TEXT;

-- Add a comment to document the change
COMMENT ON COLUMN profiles.avatar IS 'Stores avatar image as base64-encoded string or URL';
