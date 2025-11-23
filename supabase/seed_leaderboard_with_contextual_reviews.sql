-- Seed Profiles and Ratings with Contextual Reviews
-- This script creates profiles for the leaderboard users and adds contextual ratings.
-- Food items get reviews about taste, texture, spices, portion
-- Beverages get reviews about refreshment, temperature, sweetness, consistency

DO $$
DECLARE
    user_record RECORD;
    new_user_id UUID;
    dish_record RECORD;
    rating_val NUMERIC;
    tags_arr TEXT[];
    comment_text TEXT;
    dish_category TEXT;
    users_list JSONB := '[
        {"name": "Arjun Sharma", "email": "arjun.sharma@example.com", "avatar": "https://ui-avatars.com/api/?name=Arjun+Sharma&background=0D8ABC&color=fff&size=150", "gender": "male"},
        {"name": "Priya Patel", "email": "priya.patel@example.com", "avatar": "https://ui-avatars.com/api/?name=Priya+Patel&background=F97316&color=fff&size=150", "gender": "female"},
        {"name": "Rohan Mehta", "email": "rohan.mehta@example.com", "avatar": "https://ui-avatars.com/api/?name=Rohan+Mehta&background=8B5CF6&color=fff&size=150", "gender": "male"},
        {"name": "Ananya Singh", "email": "ananya.singh@example.com", "avatar": "https://ui-avatars.com/api/?name=Ananya+Singh&background=EC4899&color=fff&size=150", "gender": "female"},
        {"name": "Vikram Reddy", "email": "vikram.reddy@example.com", "avatar": "https://ui-avatars.com/api/?name=Vikram+Reddy&background=10B981&color=fff&size=150", "gender": "male"},
        {"name": "Kavya Nair", "email": "kavya.nair@example.com", "avatar": "https://ui-avatars.com/api/?name=Kavya+Nair&background=F59E0B&color=fff&size=150", "gender": "female"},
        {"name": "Aditya Kumar", "email": "aditya.kumar@example.com", "avatar": "https://ui-avatars.com/api/?name=Aditya+Kumar&background=3B82F6&color=fff&size=150", "gender": "male"},
        {"name": "Ishita Desai", "email": "ishita.desai@example.com", "avatar": "https://ui-avatars.com/api/?name=Ishita+Desai&background=EF4444&color=fff&size=150", "gender": "female"},
        {"name": "Karthik Iyer", "email": "karthik.iyer@example.com", "avatar": "https://ui-avatars.com/api/?name=Karthik+Iyer&background=6366F1&color=fff&size=150", "gender": "male"},
        {"name": "Diya Kapoor", "email": "diya.kapoor@example.com", "avatar": "https://ui-avatars.com/api/?name=Diya+Kapoor&background=A855F7&color=fff&size=150", "gender": "female"}
    ]';
    user_obj JSONB;
BEGIN
    -- Loop through defined users
    FOR user_obj IN SELECT * FROM jsonb_array_elements(users_list)
    LOOP
        -- 1. Check if user exists in auth.users by email
        SELECT id INTO new_user_id FROM auth.users WHERE email = (user_obj->>'email');
        
        -- 2. If not exists, create new user in auth.users
        IF new_user_id IS NULL THEN
            new_user_id := uuid_generate_v4();
            INSERT INTO auth.users (id, email, raw_user_meta_data)
            VALUES (
                new_user_id,
                (user_obj->>'email'),
                json_build_object('full_name', (user_obj->>'name'))
            );
        END IF;
        
        -- 3. Upsert into profiles
        INSERT INTO profiles (id, email, full_name, avatar_url, role)
        VALUES (
            new_user_id,
            (user_obj->>'email'),
            (user_obj->>'name'),
            (user_obj->>'avatar'),
            'student'
        )
        ON CONFLICT (id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            avatar_url = EXCLUDED.avatar_url,
            email = EXCLUDED.email;
        
        -- 4. Generate Contextual Ratings for this user
        FOR dish_record IN SELECT id, name, category FROM dishes
        LOOP
            -- 70% chance to rate a dish
            IF random() > 0.3 THEN
                -- Determine Rating (Weighted towards positive)
                -- 5 stars: 40%, 4.5 stars: 20%, 4 stars: 25%, 3 stars: 10%, 2 stars: 3%, 1 star: 2%
                IF random() < 0.40 THEN rating_val := 5;
                ELSIF random() < 0.60 THEN rating_val := 4.5;
                ELSIF random() < 0.85 THEN rating_val := 4;
                ELSIF random() < 0.95 THEN rating_val := 3;
                ELSIF random() < 0.98 THEN rating_val := 2;
                ELSE rating_val := 1;
                END IF;
                
                -- Get dish category
                dish_category := dish_record.category;
                
                -- CONTEXTUAL TAGS AND COMMENTS BASED ON CATEGORY
                IF dish_category IN ('Beverages', 'Shakes') THEN
                    -- BEVERAGE REVIEWS: Focus on refreshment, temperature, sweetness, consistency
                    IF rating_val >= 4.5 THEN
                        tags_arr := (ARRAY[
                            ARRAY['Refreshing', 'Perfect Sweet'],
                            ARRAY['Well Chilled', 'Smooth'],
                            ARRAY['Creamy', 'Thick'],
                            ARRAY['Fresh', 'Cooling']
                        ])[floor(random() * 4 + 1)];
                        comment_text := (ARRAY[
                            'Super refreshing! Perfect sweetness and well-chilled.',
                            'Smooth and creamy! Great consistency.',
                            'Perfectly balanced sweetness. Very refreshing!',
                            'Ice-cold and delicious! Just what I needed.',
                            'Thick and rich! Love the flavor.'
                        ])[floor(random() * 5 + 1)];
                    ELSIF rating_val >= 3.5 THEN
                        tags_arr := (ARRAY[
                            ARRAY['Good', 'Refreshing'],
                            ARRAY['Tasty', 'Cold'],
                            ARRAY['Decent', 'Sweet']
                        ])[floor(random() * 3 + 1)];
                        comment_text := (ARRAY[
                            'Good flavor but could be colder.',
                            'Refreshing! A bit too sweet for my taste.',
                            'Decent drink. Nice and cold.',
                            'Good consistency but needs more flavor.'
                        ])[floor(random() * 4 + 1)];
                    ELSE
                        tags_arr := (ARRAY[
                            ARRAY['Too Sweet', 'Warm'],
                            ARRAY['Watery', 'Bland'],
                            ARRAY['Not Fresh', 'Okay']
                        ])[floor(random() * 3 + 1)];
                        comment_text := (ARRAY[
                            'Too sweet and not cold enough.',
                            'Watery consistency. Needs improvement.',
                            'Not very refreshing. Average at best.'
                        ])[floor(random() * 3 + 1)];
                    END IF;
                ELSE
                    -- FOOD REVIEWS: Focus on taste, texture, spices, portion, quality
                    IF rating_val >= 4.5 THEN
                        tags_arr := (ARRAY[
                            ARRAY['Delicious', 'Perfect Spice'],
                            ARRAY['Flavorful', 'Fresh'],
                            ARRAY['Tender', 'Well Cooked'],
                            ARRAY['Crispy', 'Tasty'],
                            ARRAY['Good Portion', 'Value']
                        ])[floor(random() * 5 + 1)];
                        comment_text := (ARRAY[
                            'Absolutely delicious! Perfectly cooked and well-spiced.',
                            'Amazing taste! Fresh ingredients and generous portion.',
                            'Best dish I''ve had! Tender and flavorful.',
                            'Crispy and hot! Just perfect.',
                            'Excellent quality! Great value for money.',
                            'Mouthwatering! The spices are spot on.'
                        ])[floor(random() * 6 + 1)];
                    ELSIF rating_val >= 3.5 THEN
                        tags_arr := (ARRAY[
                            ARRAY['Good', 'Tasty'],
                            ARRAY['Decent', 'Fresh'],
                            ARRAY['Okay Spice', 'Good Portion']
                        ])[floor(random() * 3 + 1)];
                        comment_text := (ARRAY[
                            'Good taste but could use more spices.',
                            'Decent portion. Fresh and tasty.',
                            'Pretty good! Spice level is okay.',
                            'Nice flavors but portion could be bigger.',
                            'Solid choice. Well-cooked.'
                        ])[floor(random() * 5 + 1)];
                    ELSE
                        tags_arr := (ARRAY[
                            ARRAY['Bland', 'Dry'],
                            ARRAY['Too Oily', 'Overcooked'],
                            ARRAY['Not Fresh', 'Small Portion'],
                            ARRAY['Needs Work', 'Disappointing']
                        ])[floor(random() * 4 + 1)];
                        comment_text := (ARRAY[
                            'Too bland and dry. Needs more flavor.',
                            'Overcooked and too oily.',
                            'Not very fresh. Disappointing.',
                            'Small portion and lacks taste.',
                            'Needs improvement in seasoning.'
                        ])[floor(random() * 5 + 1)];
                    END IF;
                END IF;
                
                -- Insert Rating
                INSERT INTO ratings (dish_id, user_id, rating, tags, comment, created_at)
                VALUES (
                    dish_record.id,
                    new_user_id,
                    rating_val,
                    tags_arr,
                    comment_text,
                    now() - (random() * interval '30 days')
                )
                ON CONFLICT DO NOTHING;
            END IF;
        END LOOP;
    END LOOP;
END $$;
