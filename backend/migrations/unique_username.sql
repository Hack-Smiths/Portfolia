-- Add unique constraint for username
-- First, ensure existing usernames are lowercase to match our application logic (optional, but good practice if mixed case exists)
-- UPDATE "user" SET username = LOWER(username);

-- Create a unique index on the lowercased username to ensure case-insensitive uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS ix_user_username_lower ON "user" (LOWER(username));

-- Optionally, we can also add a standard unique constraint if we want case-sensitive strictness too,
-- but the index above usually covers our needs for "unique username".
-- ALTER TABLE "user" ADD CONSTRAINT uq_user_username UNIQUE (username);
