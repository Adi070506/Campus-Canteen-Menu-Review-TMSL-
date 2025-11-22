-- Only create tables that don't exist yet
-- Skip profiles since it already exists

-- Locations (Canteen, Food Truck, Snack Store)
CREATE TABLE IF NOT EXISTS locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Dishes (Global menu)
CREATE TABLE IF NOT EXISTS dishes (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric not null,
  category text, -- e.g., 'Breakfast', 'Lunch', 'Snacks'
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Daily Menus (One per location per day)
CREATE TABLE IF NOT EXISTS daily_menus (
  id uuid default uuid_generate_v4() primary key,
  location_id uuid references locations(id) on delete cascade,
  date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(location_id, date)
);

-- Daily Menu Items (Dishes available today)
CREATE TABLE IF NOT EXISTS daily_menu_items (
  id uuid default uuid_generate_v4() primary key,
  daily_menu_id uuid references daily_menus(id) on delete cascade,
  dish_id uuid references dishes(id) on delete cascade,
  status text check (status in ('Available', 'Low', 'Out of Stock')) default 'Available',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Ratings & Feedback
CREATE TABLE IF NOT EXISTS ratings (
  id uuid default uuid_generate_v4() primary key,
  dish_id uuid references dishes(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  rating integer check (rating >= 1 and rating <= 5),
  tags text[], -- e.g., ['Too Oily', 'Spicy']
  comment text,
  sentiment text check (sentiment in ('Positive', 'Negative', 'Neutral')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies (Basic)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Locations are viewable by everyone." ON locations;
DROP POLICY IF EXISTS "Dishes are viewable by everyone." ON dishes;
DROP POLICY IF EXISTS "Daily menus are viewable by everyone." ON daily_menus;
DROP POLICY IF EXISTS "Daily menu items are viewable by everyone." ON daily_menu_items;
DROP POLICY IF EXISTS "Ratings are viewable by everyone." ON ratings;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
DROP POLICY IF EXISTS "Authenticated users can insert ratings." ON ratings;

-- Public read access
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Locations are viewable by everyone." ON locations FOR SELECT USING (true);
CREATE POLICY "Dishes are viewable by everyone." ON dishes FOR SELECT USING (true);
CREATE POLICY "Daily menus are viewable by everyone." ON daily_menus FOR SELECT USING (true);
CREATE POLICY "Daily menu items are viewable by everyone." ON daily_menu_items FOR SELECT USING (true);
CREATE POLICY "Ratings are viewable by everyone." ON ratings FOR SELECT USING (true);

-- Authenticated insert/update
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Staff only policies
CREATE POLICY "Authenticated users can insert ratings." ON ratings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
