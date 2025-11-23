-- Enable RLS on ratings table
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can insert their own ratings" ON ratings;
DROP POLICY IF EXISTS "Users can view all ratings" ON ratings;
DROP POLICY IF EXISTS "Authenticated users can insert ratings" ON ratings;
DROP POLICY IF EXISTS "Public can view ratings" ON ratings;
DROP POLICY IF EXISTS "Ratings are viewable by everyone." ON ratings;
DROP POLICY IF EXISTS "Authenticated users can insert ratings." ON ratings;

-- Policy: Allow any authenticated user to insert a rating
-- We verify that the user_id in the row matches the auth.uid() to enforce ownership
CREATE POLICY "Authenticated users can insert ratings"
ON ratings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Allow everyone to view ratings (so we can calculate averages)
CREATE POLICY "Public can view ratings"
ON ratings FOR SELECT
TO public
USING (true);

-- Grant necessary permissions
GRANT ALL ON ratings TO authenticated;
GRANT SELECT ON ratings TO anon;

-- Note: ratings table uses UUID primary key, so no sequence permissions needed.
