-- Check if user can update their own profile
-- Run this to see what policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'profiles';

-- If the above shows no UPDATE policy, run this:
-- Drop and recreate the update policy
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;

CREATE POLICY "Users can update own profile." 
  ON profiles 
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Verify it worked
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'profiles' AND cmd = 'UPDATE';
