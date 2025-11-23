-- Seed Profiles and Ratings
-- This script creates profiles for the leaderboard users and adds random ratings for all dishes.
-- It handles existing users gracefully to avoid duplicate key errors.

DO $$
DECLARE
    user_record RECORD;
    new_user_id UUID;
    dish_record RECORD;
    rating_val INTEGER;
    tags_arr TEXT[];
    comment_text TEXT;
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
        INSERT INTO profiles (id, full_name, avatar_url, role)
        VALUES (
            new_user_id,
            (user_obj->>'name'),
            (user_obj->>'avatar'),
            'student'
        )
        ON CONFLICT (id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            avatar_url = EXCLUDED.avatar_url;

        -- 4. Generate Ratings for this user
        FOR dish_record IN SELECT id FROM dishes
        LOOP
            -- 70% chance to rate a dish
            IF random() > 0.3 THEN
                -- Determine Rating (Weighted)
                -- 5 stars: 40%, 4 stars: 35%, 3 stars: 15%, 2 stars: 5%, 1 star: 5%
                IF random() < 0.40 THEN rating_val := 5;
                ELSIF random() < 0.75 THEN rating_val := 4;
                ELSIF random() < 0.90 THEN rating_val := 3;
                ELSIF random() < 0.95 THEN rating_val := 2;
                ELSE rating_val := 1;
                END IF;

                -- Determine Tags
                IF random() > 0.5 THEN tags_arr := ARRAY['Tasty', 'Fresh'];
                ELSE tags_arr := ARRAY['Spicy', 'Too Oily'];
                END IF;

                -- Determine Comment based on Rating
                IF rating_val = 5 THEN
                    IF random() < 0.2 THEN comment_text := 'Absolutely delicious! Loved every bite.';
                    ELSIF random() < 0.4 THEN comment_text := 'Best meal I have had in a while.';
                    ELSIF random() < 0.6 THEN comment_text := 'Super fresh and tasty.';
                    ELSIF random() < 0.8 THEN comment_text := 'Just perfect.';
                    ELSE comment_text := 'Amazing! Can''t wait to have it again.';
                    END IF;
                ELSIF rating_val = 4 THEN
                    IF random() < 0.2 THEN comment_text := 'Really good, would order again.';
                    ELSIF random() < 0.4 THEN comment_text := 'Great taste, but slow service.';
                    ELSIF random() < 0.6 THEN comment_text := 'Pretty good value for money.';
                    ELSIF random() < 0.8 THEN comment_text := 'Nice flavors.';
                    ELSE comment_text := 'Solid choice for lunch.';
                    END IF;
                ELSIF rating_val = 3 THEN
                    IF random() < 0.3 THEN comment_text := 'Decent, but portion size could be better.';
                    ELSIF random() < 0.6 THEN comment_text := 'It was okay, nothing special.';
                    ELSE comment_text := 'Average taste.';
                    END IF;
                ELSIF rating_val = 2 THEN
                    IF random() < 0.5 THEN comment_text := 'Not my favorite.';
                    ELSE comment_text := 'Too oily.';
                    END IF;
                ELSE -- 1 Star
                    IF random() < 0.5 THEN comment_text := 'Terrible. Cold when served.';
                    ELSE comment_text := 'Would not recommend.';
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
                );
            END IF;
        END LOOP;
    END LOOP;
END $$;
