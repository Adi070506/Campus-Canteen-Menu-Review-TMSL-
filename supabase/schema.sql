-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (links to auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text check (role in ('student', 'staff')) default 'student',
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Locations (Canteen, Food Truck, Snack Store)
create table locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Dishes (Global menu)
create table dishes (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric not null,
  category text, -- e.g., 'Breakfast', 'Lunch', 'Snacks'
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Daily Menus (One per location per day)
create table daily_menus (
  id uuid default uuid_generate_v4() primary key,
  location_id uuid references locations(id) on delete cascade,
  date date default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(location_id, date)
);

-- Daily Menu Items (Dishes available today)
create table daily_menu_items (
  id uuid default uuid_generate_v4() primary key,
  daily_menu_id uuid references daily_menus(id) on delete cascade,
  dish_id uuid references dishes(id) on delete cascade,
  status text check (status in ('Available', 'Low', 'Out of Stock')) default 'Available',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Ratings & Feedback
create table ratings (
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
alter table profiles enable row level security;
alter table locations enable row level security;
alter table dishes enable row level security;
alter table daily_menus enable row level security;
alter table daily_menu_items enable row level security;
alter table ratings enable row level security;

-- Public read access
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Locations are viewable by everyone." on locations for select using (true);
create policy "Dishes are viewable by everyone." on dishes for select using (true);
create policy "Daily menus are viewable by everyone." on daily_menus for select using (true);
create policy "Daily menu items are viewable by everyone." on daily_menu_items for select using (true);
create policy "Ratings are viewable by everyone." on ratings for select using (true);

-- Authenticated insert/update (Refine later for Staff vs Student)
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Staff only policies (Placeholder - assumes role check in app or trigger)
-- For now allowing authenticated users to insert ratings
create policy "Authenticated users can insert ratings." on ratings for insert with check (auth.role() = 'authenticated');
