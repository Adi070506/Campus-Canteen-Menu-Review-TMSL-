-- ==========================================
-- 1. FIX PROFILE SCHEMA (Missing updated_at)
-- ==========================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'updated_at') THEN
        ALTER TABLE profiles ADD COLUMN updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());
    END IF;
END $$;

-- ==========================================
-- 2. FIX RLS POLICIES (PROFILES & RATINGS)
-- ==========================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
DROP POLICY IF EXISTS "Ratings are viewable by everyone." ON ratings;
DROP POLICY IF EXISTS "Authenticated users can insert ratings." ON ratings;

-- Re-create Profile Policies
CREATE POLICY "Public profiles are viewable by everyone." 
ON profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile." 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Re-create Rating Policies
CREATE POLICY "Ratings are viewable by everyone." 
ON ratings FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert ratings." 
ON ratings FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- ==========================================
-- 3. SEED RANDOM RATINGS
-- ==========================================

DO $$
DECLARE
  dish_record RECORD;
  user_id uuid;
  i INT;
  rating_val INT;
  review_text TEXT;
  tags TEXT[];
BEGIN
  -- Get a valid user ID to attribute ratings to
  SELECT id INTO user_id FROM profiles LIMIT 1;
  
  IF user_id IS NOT NULL THEN
    -- Loop through all dishes
    FOR dish_record IN SELECT id FROM dishes LOOP
      
      -- Insert 3 to 7 random ratings for each dish
      FOR i IN 1..(floor(random() * 5 + 3)::int) LOOP
        
        rating_val := floor(random() * 2 + 4)::int; -- 4 or 5
        IF random() < 0.3 THEN rating_val := 3; END IF;
        
        review_text := CASE (floor(random() * 6)::int)
          WHEN 0 THEN 'Absolutely delicious! Highly recommended.'
          WHEN 1 THEN 'Good value for money, but could be spicier.'
          WHEN 2 THEN 'Loved it, will definitely order again.'
          WHEN 3 THEN 'A bit cold when it arrived, but tasty.'
          WHEN 4 THEN 'Fresh ingredients and great taste.'
          ELSE 'Decent portion size.'
        END;

        tags := ARRAY[]::text[];
        IF random() < 0.5 THEN tags := array_append(tags, 'Tasty'); END IF;
        IF random() < 0.3 THEN tags := array_append(tags, 'Fresh'); END IF;
        IF random() < 0.2 THEN tags := array_append(tags, 'Spicy'); END IF;
        IF random() < 0.2 THEN tags := array_append(tags, 'Good Portion'); END IF;

        INSERT INTO ratings (dish_id, user_id, rating, comment, tags, created_at)
        VALUES (
          dish_record.id,
          user_id,
          rating_val,
          review_text,
          tags,
          NOW() - (random() * interval '30 days')
        );
      END LOOP;
    END LOOP;
  END IF;
END $$;
