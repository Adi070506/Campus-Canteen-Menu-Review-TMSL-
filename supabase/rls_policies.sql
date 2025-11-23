-- Drop all existing policies first
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
DROP POLICY IF EXISTS "Locations are viewable by everyone." ON locations;
DROP POLICY IF EXISTS "Dishes are viewable by everyone." ON dishes;
DROP POLICY IF EXISTS "Daily menus are viewable by everyone." ON daily_menus;
DROP POLICY IF EXISTS "Daily menu items are viewable by everyone." ON daily_menu_items;
DROP POLICY IF EXISTS "Ratings are viewable by everyone." ON ratings;
DROP POLICY IF EXISTS "Authenticated users can insert ratings." ON ratings;

-- Recreate all policies
-- Profiles: Everyone can read, users can update their own
CREATE POLICY "Public profiles are viewable by everyone." 
  ON profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile." 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Locations, Dishes, Menus: Public read access
CREATE POLICY "Locations are viewable by everyone." 
  ON locations FOR SELECT 
  USING (true);

CREATE POLICY "Dishes are viewable by everyone." 
  ON dishes FOR SELECT 
  USING (true);

CREATE POLICY "Daily menus are viewable by everyone." 
  ON daily_menus FOR SELECT 
  USING (true);

CREATE POLICY "Daily menu items are viewable by everyone." 
  ON daily_menu_items FOR SELECT 
  USING (true);

-- Ratings: Everyone can read, authenticated users can insert
CREATE POLICY "Ratings are viewable by everyone." 
  ON ratings FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert ratings." 
  ON ratings FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Daily menu items: Staff can update availability status
CREATE POLICY "Staff can update menu item availability."
  ON daily_menu_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'staff'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'staff'
    )
  );
