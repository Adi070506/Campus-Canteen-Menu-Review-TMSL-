-- Grant Staff Access to Your Account
-- Run this in Supabase SQL Editor

-- STEP 1: Find your user ID (check which email is yours)
SELECT id, email, full_name, role FROM profiles ORDER BY created_at;

-- STEP 2: Set YOUR account as staff (replace 'your-email@example.com' with your actual email)
UPDATE profiles 
SET role = 'staff' 
WHERE email = 'your-email@example.com';

-- OR if you want to set the first user as staff:
UPDATE profiles 
SET role = 'staff' 
WHERE id = (SELECT id FROM profiles ORDER BY created_at LIMIT 1);

-- STEP 3: Verify it worked
SELECT id, email, full_name, role FROM profiles WHERE role = 'staff';

-- After running this:
-- 1. Sign out from your app
-- 2. Sign back in
-- 3. Navigate to /staff
-- 4. You should now have access!
