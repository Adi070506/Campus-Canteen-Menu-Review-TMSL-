-- Fix Staff Access: Set Your Account as Staff
-- This will give you access to the Staff Dashboard

-- Option 1: Set a specific user as staff (replace with your email)
UPDATE profiles 
SET role = 'staff' 
WHERE email = 'your-email@example.com';

-- Option 2: Set the first user as staff
UPDATE profiles 
SET role = 'staff' 
WHERE id = (SELECT id FROM profiles ORDER BY created_at LIMIT 1);

-- Option 3: Set multiple users as staff (first 2 users)
UPDATE profiles 
SET role = 'staff' 
WHERE id IN (
    SELECT id FROM profiles ORDER BY created_at LIMIT 2
);

-- Verify the change
SELECT id, email, full_name, role FROM profiles WHERE role = 'staff';

-- Note: After running this, you may need to sign out and sign back in
-- for the role change to take effect
