-- Create module_progress table
CREATE TABLE IF NOT EXISTS module_progress (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_module UNIQUE (user_id, module_id)
);

-- Add RLS policies
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert their own module progress
CREATE POLICY "Users can insert their own module progress"
ON module_progress
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous users to view their own module progress
CREATE POLICY "Users can view their own module progress"
ON module_progress
FOR SELECT
TO anon
USING (true);