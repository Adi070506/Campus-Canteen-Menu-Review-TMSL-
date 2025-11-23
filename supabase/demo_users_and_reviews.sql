-- Enhanced Seed Data: 15 NEW Users + Strategic Reviews
-- This adds 15 new users to make 25 total (with your existing 10)
-- All reviews use ONLY the new user IDs to avoid conflicts

-- Insert 15 NEW Demo Users
-- Password for all: "demo123"
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'neha.gupta@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'rahul.verma@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'sneha.joshi@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'amit.shah@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'pooja.rao@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('10101010-1010-1010-1010-101010101010', 'siddharth.malhotra@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('20202020-2020-2020-2020-202020202020', 'riya.chopra@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('30303030-3030-3030-3030-303030303030', 'kunal.bhatt@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('40404040-4040-4040-4040-404040404040', 'tanvi.agarwal@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('50505050-5050-5050-5050-505050505050', 'harsh.pandey@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('60606060-6060-6060-6060-606060606060', 'meera.saxena@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('70707070-7070-7070-7070-707070707070', 'yash.tiwari@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('80808080-8080-8080-8080-808080808080', 'simran.bose@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('90909090-9090-9090-9090-909090909090', 'aryan.khanna@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW()),
('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', 'naina.sinha@example.com', crypt('demo123', gen_salt('bf')), NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Profiles for 15 NEW Users
INSERT INTO profiles (id, email, full_name, role)
VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'neha.gupta@example.com', 'Neha Gupta', 'student'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'rahul.verma@example.com', 'Rahul Verma', 'student'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'sneha.joshi@example.com', 'Sneha Joshi', 'student'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'amit.shah@example.com', 'Amit Shah', 'student'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'pooja.rao@example.com', 'Pooja Rao', 'student'),
('10101010-1010-1010-1010-101010101010', 'siddharth.malhotra@example.com', 'Siddharth Malhotra', 'student'),
('20202020-2020-2020-2020-202020202020', 'riya.chopra@example.com', 'Riya Chopra', 'student'),
('30303030-3030-3030-3030-303030303030', 'kunal.bhatt@example.com', 'Kunal Bhatt', 'student'),
('40404040-4040-4040-4040-404040404040', 'tanvi.agarwal@example.com', 'Tanvi Agarwal', 'student'),
('50505050-5050-5050-5050-505050505050', 'harsh.pandey@example.com', 'Harsh Pandey', 'student'),
('60606060-6060-6060-6060-606060606060', 'meera.saxena@example.com', 'Meera Saxena', 'student'),
('70707070-7070-7070-7070-707070707070', 'yash.tiwari@example.com', 'Yash Tiwari', 'student'),
('80808080-8080-8080-8080-808080808080', 'simran.bose@example.com', 'Simran Bose', 'student'),
('90909090-9090-9090-9090-909090909090', 'aryan.khanna@example.com', 'Aryan Khanna', 'student'),
('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', 'naina.sinha@example.com', 'Naina Sinha', 'student')
ON CONFLICT (id) DO NOTHING;

-- Strategic Reviews using ONLY the 15 new users
-- This ensures Battle Cards show: Top (Biryani, Dosa, Cold Coffee) vs Bottom (Upma, Fish Fry)

DO $$
DECLARE
    biryani_id uuid; butter_chicken_id uuid; masala_dosa_id uuid;
    paneer_id uuid; samosa_id uuid; vada_pav_id uuid; upma_id uuid;
    fish_fry_id uuid; cold_coffee_id uuid; masala_chai_id uuid;
    mango_lassi_id uuid; chocolate_shake_id uuid; pakora_id uuid;
    dal_makhani_id uuid; orange_juice_id uuid;
BEGIN
    -- Get dish IDs
    SELECT id INTO biryani_id FROM dishes WHERE name = 'Chicken Biryani' LIMIT 1;
    SELECT id INTO butter_chicken_id FROM dishes WHERE name = 'Butter Chicken' LIMIT 1;
    SELECT id INTO masala_dosa_id FROM dishes WHERE name = 'Masala Dosa' LIMIT 1;
    SELECT id INTO paneer_id FROM dishes WHERE name = 'Paneer Butter Masala' LIMIT 1;
    SELECT id INTO samosa_id FROM dishes WHERE name = 'Samosa' LIMIT 1;
    SELECT id INTO vada_pav_id FROM dishes WHERE name = 'Vada Pav' LIMIT 1;
    SELECT id INTO upma_id FROM dishes WHERE name = 'Upma' LIMIT 1;
    SELECT id INTO fish_fry_id FROM dishes WHERE name = 'Fish Fry' LIMIT 1;
    SELECT id INTO cold_coffee_id FROM dishes WHERE name = 'Cold Coffee' LIMIT 1;
    SELECT id INTO masala_chai_id FROM dishes WHERE name = 'Masala Chai' LIMIT 1;
    SELECT id INTO mango_lassi_id FROM dishes WHERE name = 'Mango Lassi' LIMIT 1;
    SELECT id INTO chocolate_shake_id FROM dishes WHERE name = 'Chocolate Shake' LIMIT 1;
    SELECT id INTO pakora_id FROM dishes WHERE name = 'Pakora' LIMIT 1;
    SELECT id INTO dal_makhani_id FROM dishes WHERE name = 'Dal Makhani' LIMIT 1;
    SELECT id INTO orange_juice_id FROM dishes WHERE name = 'Fresh Orange Juice' LIMIT 1;

    -- TOP RATED DISHES (Crowd Favourite)
    
    -- Chicken Biryani (Most Loved - 12 reviews, avg 4.7)
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', biryani_id, 5, 'Best biryani ever! Perfectly cooked rice and tender chicken pieces.', ARRAY['Must Try', 'Perfect'], NOW() - INTERVAL '5 days'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', biryani_id, 5, 'Absolutely delicious! The spices are perfectly balanced.', ARRAY['Flavorful', 'Spicy'], NOW() - INTERVAL '4 days'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', biryani_id, 4.5, 'Great taste and generous portion. Worth every rupee!', ARRAY['Good Portion', 'Value'], NOW() - INTERVAL '3 days'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', biryani_id, 5, 'Aromatic and flavorful! The raita complements it perfectly.', ARRAY['Aromatic', 'Complete'], NOW() - INTERVAL '2 days'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', biryani_id, 4.5, 'Tender chicken and fragrant rice. Highly recommend!', ARRAY['Tender', 'Fragrant'], NOW() - INTERVAL '1 day'),
    ('10101010-1010-1010-1010-101010101010', biryani_id, 5, 'My go-to lunch! Never disappoints.', ARRAY['Favorite', 'Consistent'], NOW() - INTERVAL '18 hours'),
    ('20202020-2020-2020-2020-202020202020', biryani_id, 4.5, 'Rich flavors and perfect spice level. Love it!', ARRAY['Rich', 'Perfect Spice'], NOW() - INTERVAL '12 hours'),
    ('30303030-3030-3030-3030-303030303030', biryani_id, 5, 'Best value for money! Tastes home-cooked.', ARRAY['Value', 'Homely'], NOW() - INTERVAL '8 hours'),
    ('40404040-4040-4040-4040-404040404040', biryani_id, 4, 'Very good! Could use more saffron but excellent overall.', ARRAY['Good', 'Tasty'], NOW() - INTERVAL '5 hours'),
    ('50505050-5050-5050-5050-505050505050', biryani_id, 5, 'Mouthwatering! The best dish on campus.', ARRAY['Amazing', 'Top'], NOW() - INTERVAL '3 hours'),
    ('60606060-6060-6060-6060-606060606060', biryani_id, 4.5, 'Perfectly layered and well-cooked. Delicious!', ARRAY['Perfect', 'Delicious'], NOW() - INTERVAL '2 hours'),
    ('70707070-7070-7070-7070-707070707070', biryani_id, 5, 'Incredible taste! Will order again and again.', ARRAY['Incredible', 'Repeat'], NOW() - INTERVAL '1 hour');

    -- Masala Dosa (High Rated - 10 reviews, avg 4.6)
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    ('80808080-8080-8080-8080-808080808080', masala_dosa_id, 5, 'Crispy perfection! The potato filling is amazing.', ARRAY['Crispy', 'Perfect'], NOW() - INTERVAL '4 days'),
    ('90909090-9090-9090-9090-909090909090', masala_dosa_id, 4.5, 'Best breakfast option! Fresh and tasty.', ARRAY['Breakfast', 'Fresh'], NOW() - INTERVAL '3 days'),
    ('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', masala_dosa_id, 5, 'Thin, crispy dosa with flavorful filling. Love it!', ARRAY['Thin', 'Flavorful'], NOW() - INTERVAL '2 days'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', masala_dosa_id, 4.5, 'Great value! The chutneys are fresh and tasty.', ARRAY['Value', 'Fresh Chutney'], NOW() - INTERVAL '1 day'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', masala_dosa_id, 5, 'Authentic South Indian taste! Highly recommend.', ARRAY['Authentic', 'Recommend'], NOW() - INTERVAL '16 hours'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', masala_dosa_id, 4, 'Good dosa, crispy with well-spiced filling.', ARRAY['Good', 'Crispy'], NOW() - INTERVAL '10 hours'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', masala_dosa_id, 5, 'Perfect for a light meal. So satisfying!', ARRAY['Light', 'Satisfying'], NOW() - INTERVAL '7 hours'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', masala_dosa_id, 4.5, 'Crispy outside, flavorful inside. Excellent!', ARRAY['Crispy', 'Excellent'], NOW() - INTERVAL '4 hours'),
    ('10101010-1010-1010-1010-101010101010', masala_dosa_id, 5, 'My favorite breakfast! Never gets old.', ARRAY['Favorite', 'Classic'], NOW() - INTERVAL '2 hours'),
    ('20202020-2020-2020-2020-202020202020', masala_dosa_id, 4.5, 'Delicious and filling. Great start to the day!', ARRAY['Delicious', 'Filling'], NOW() - INTERVAL '1 hour');

    -- Cold Coffee (Top Beverage - 9 reviews, avg 4.7)
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    ('30303030-3030-3030-3030-303030303030', cold_coffee_id, 5, 'Super refreshing! Perfect sweetness and ice-cold.', ARRAY['Refreshing', 'Perfect'], NOW() - INTERVAL '4 days'),
    ('40404040-4040-4040-4040-404040404040', cold_coffee_id, 4.5, 'Creamy and smooth! Great energy boost.', ARRAY['Creamy', 'Energy'], NOW() - INTERVAL '3 days'),
    ('50505050-5050-5050-5050-505050505050', cold_coffee_id, 5, 'Best cold coffee on campus! Well-chilled.', ARRAY['Best', 'Chilled'], NOW() - INTERVAL '2 days'),
    ('60606060-6060-6060-6060-606060606060', cold_coffee_id, 5, 'Rich coffee flavor! Not too sweet, just perfect.', ARRAY['Rich', 'Balanced'], NOW() - INTERVAL '1 day'),
    ('70707070-7070-7070-7070-707070707070', cold_coffee_id, 4, 'Good coffee taste. Could be colder but still good.', ARRAY['Good', 'Tasty'], NOW() - INTERVAL '14 hours'),
    ('80808080-8080-8080-8080-808080808080', cold_coffee_id, 5, 'Frothy and delicious! My daily afternoon drink.', ARRAY['Frothy', 'Daily'], NOW() - INTERVAL '9 hours'),
    ('90909090-9090-9090-9090-909090909090', cold_coffee_id, 4.5, 'Smooth and refreshing! Perfect for hot days.', ARRAY['Smooth', 'Cooling'], NOW() - INTERVAL '5 hours'),
    ('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', cold_coffee_id, 5, 'Perfect blend! Strong coffee with creamy texture.', ARRAY['Perfect', 'Strong'], NOW() - INTERVAL '3 hours'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', cold_coffee_id, 4.5, 'Delicious! Beats the afternoon slump.', ARRAY['Delicious', 'Energizing'], NOW() - INTERVAL '1 hour');

    -- BOTTOM RATED DISHES (Needs Attention)
    
    -- Upma (Needs Improvement - 8 reviews, avg 2.8)
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', upma_id, 2, 'Too bland and dry. Needs more flavor and moisture.', ARRAY['Bland', 'Dry'], NOW() - INTERVAL '5 days'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', upma_id, 3, 'Okay-ish. Could use more vegetables and spices.', ARRAY['Okay', 'Needs Spice'], NOW() - INTERVAL '4 days'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', upma_id, 2.5, 'Not very flavorful. Texture is too mushy.', ARRAY['Not Flavorful', 'Mushy'], NOW() - INTERVAL '3 days'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', upma_id, 3, 'Average at best. Needs better seasoning.', ARRAY['Average', 'Improve'], NOW() - INTERVAL '2 days'),
    ('10101010-1010-1010-1010-101010101010', upma_id, 2, 'Too dry and lacks flavor. Disappointing.', ARRAY['Dry', 'Disappointing'], NOW() - INTERVAL '1 day'),
    ('20202020-2020-2020-2020-202020202020', upma_id, 3.5, 'Decent but could be better. Add more spices.', ARRAY['Decent', 'Needs Spice'], NOW() - INTERVAL '12 hours'),
    ('30303030-3030-3030-3030-303030303030', upma_id, 2.5, 'Not my favorite. Too plain and boring.', ARRAY['Plain', 'Boring'], NOW() - INTERVAL '6 hours'),
    ('40404040-4040-4040-4040-404040404040', upma_id, 3, 'Could be improved. Needs better seasoning.', ARRAY['Needs Work', 'Bland'], NOW() - INTERVAL '2 hours');

    -- Fish Fry (Needs Attention - 7 reviews, avg 3.1)
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    ('50505050-5050-5050-5050-505050505050', fish_fry_id, 3, 'Fish was overcooked. Could be better.', ARRAY['Overcooked', 'Okay'], NOW() - INTERVAL '4 days'),
    ('60606060-6060-6060-6060-606060606060', fish_fry_id, 2.5, 'Too oily and fish wasn''t fresh enough.', ARRAY['Oily', 'Not Fresh'], NOW() - INTERVAL '3 days'),
    ('70707070-7070-7070-7070-707070707070', fish_fry_id, 3.5, 'Decent but needs fresher fish. Coating is good.', ARRAY['Decent', 'Good Coating'], NOW() - INTERVAL '2 days'),
    ('80808080-8080-8080-8080-808080808080', fish_fry_id, 3, 'Average taste. Fish could be more tender.', ARRAY['Average', 'Tough'], NOW() - INTERVAL '1 day'),
    ('90909090-9090-9090-9090-909090909090', fish_fry_id, 2, 'Disappointed. Fish was dry and over-fried.', ARRAY['Dry', 'Over-fried'], NOW() - INTERVAL '15 hours'),
    ('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', fish_fry_id, 3.5, 'Not bad but could use fresher ingredients.', ARRAY['Not Bad', 'Needs Fresh'], NOW() - INTERVAL '8 hours'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', fish_fry_id, 3, 'Okay. Spice mix is good but fish quality needs work.', ARRAY['Okay', 'Improve'], NOW() - INTERVAL '3 hours');

    -- MEDIUM RATED DISHES (For variety)
    
    -- Paneer Butter Masala (8 reviews, avg 4.3)
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', paneer_id, 5, 'Soft paneer in rich gravy! Absolutely delicious.', ARRAY['Soft', 'Rich'], NOW() - INTERVAL '4 days'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', paneer_id, 4, 'Good taste, decent portion. Gravy could be thicker.', ARRAY['Good', 'Decent'], NOW() - INTERVAL '3 days'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', paneer_id, 4.5, 'Creamy and flavorful! Goes great with naan.', ARRAY['Creamy', 'Flavorful'], NOW() - INTERVAL '2 days'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', paneer_id, 4, 'Tasty but a bit too sweet for my taste.', ARRAY['Tasty', 'Sweet'], NOW() - INTERVAL '1 day'),
    ('10101010-1010-1010-1010-101010101010', paneer_id, 4.5, 'Delicious! Paneer is fresh and soft.', ARRAY['Delicious', 'Fresh'], NOW() - INTERVAL '16 hours'),
    ('20202020-2020-2020-2020-202020202020', paneer_id, 4, 'Good veg option. Rich and satisfying.', ARRAY['Veg', 'Satisfying'], NOW() - INTERVAL '10 hours'),
    ('30303030-3030-3030-3030-303030303030', paneer_id, 4.5, 'Excellent gravy! Paneer pieces are generous.', ARRAY['Excellent', 'Generous'], NOW() - INTERVAL '5 hours'),
    ('40404040-4040-4040-4040-404040404040', paneer_id, 4, 'Very good! Mild spice, perfect for everyone.', ARRAY['Mild', 'Good'], NOW() - INTERVAL '2 hours');

    -- Samosa (9 reviews, avg 4.2)
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    ('50505050-5050-5050-5050-505050505050', samosa_id, 4.5, 'Crispy and hot! Perfect evening snack.', ARRAY['Crispy', 'Hot'], NOW() - INTERVAL '4 days'),
    ('60606060-6060-6060-6060-606060606060', samosa_id, 4, 'Good taste and value. Filling is well-spiced.', ARRAY['Value', 'Spiced'], NOW() - INTERVAL '3 days'),
    ('70707070-7070-7070-7070-707070707070', samosa_id, 4.5, 'Flaky crust with tasty potato filling!', ARRAY['Flaky', 'Tasty'], NOW() - INTERVAL '2 days'),
    ('80808080-8080-8080-8080-808080808080', samosa_id, 4, 'Classic samosa! Best with green chutney.', ARRAY['Classic', 'Chutney'], NOW() - INTERVAL '1 day'),
    ('90909090-9090-9090-9090-909090909090', samosa_id, 4.5, 'Perfectly fried! Not too oily.', ARRAY['Perfect', 'Not Oily'], NOW() - INTERVAL '14 hours'),
    ('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', samosa_id, 3.5, 'Good but filling is sometimes bland.', ARRAY['Good', 'Bland'], NOW() - INTERVAL '9 hours'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', samosa_id, 4.5, 'Great snack! Always fresh and crispy.', ARRAY['Fresh', 'Great'], NOW() - INTERVAL '6 hours'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', samosa_id, 4, 'Tasty and affordable. My go-to snack.', ARRAY['Affordable', 'Go-to'], NOW() - INTERVAL '3 hours'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', samosa_id, 4.5, 'Delicious! Crust is perfectly golden.', ARRAY['Delicious', 'Golden'], NOW() - INTERVAL '1 hour');

    -- Masala Chai (10 reviews, avg 4.4)
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', masala_chai_id, 5, 'Perfect chai! Strong and aromatic.', ARRAY['Strong', 'Aromatic'], NOW() - INTERVAL '5 days'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', masala_chai_id, 4.5, 'Piping hot and flavorful! Best on campus.', ARRAY['Hot', 'Flavorful'], NOW() - INTERVAL '4 days'),
    ('10101010-1010-1010-1010-101010101010', masala_chai_id, 4, 'Good chai but could be stronger.', ARRAY['Good', 'Mild'], NOW() - INTERVAL '3 days'),
    ('20202020-2020-2020-2020-202020202020', masala_chai_id, 4.5, 'Refreshing! The ginger kick is perfect.', ARRAY['Refreshing', 'Ginger'], NOW() - INTERVAL '2 days'),
    ('30303030-3030-3030-3030-303030303030', masala_chai_id, 5, 'Authentic Indian chai! Reminds me of home.', ARRAY['Authentic', 'Homely'], NOW() - INTERVAL '1 day'),
    ('40404040-4040-4040-4040-404040404040', masala_chai_id, 4, 'Nice and warm. Good for cold mornings.', ARRAY['Warm', 'Morning'], NOW() - INTERVAL '16 hours'),
    ('50505050-5050-5050-5050-505050505050', masala_chai_id, 4.5, 'Well-brewed with perfect spice balance.', ARRAY['Well-brewed', 'Balanced'], NOW() - INTERVAL '11 hours'),
    ('60606060-6060-6060-6060-606060606060', masala_chai_id, 4.5, 'Delicious! Strong tea with great aroma.', ARRAY['Delicious', 'Strong'], NOW() - INTERVAL '7 hours'),
    ('70707070-7070-7070-7070-707070707070', masala_chai_id, 4, 'Good chai. Sometimes a bit too sweet.', ARRAY['Good', 'Sweet'], NOW() - INTERVAL '4 hours'),
    ('80808080-8080-8080-8080-808080808080', masala_chai_id, 4.5, 'Perfect afternoon pick-me-up!', ARRAY['Perfect', 'Pick-me-up'], NOW() - INTERVAL '1 hour');

    -- Additional variety reviews
    INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
    -- Butter Chicken (food - taste/texture focus)
    ('90909090-9090-9090-9090-909090909090', butter_chicken_id, 4.5, 'Creamy and rich! Chicken is so tender.', ARRAY['Creamy', 'Tender'], NOW() - INTERVAL '3 days'),
    ('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', butter_chicken_id, 4, 'Good taste but portion could be bigger.', ARRAY['Good', 'Small'], NOW() - INTERVAL '2 days'),
    
    -- Vada Pav (food - taste/spice focus)
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', vada_pav_id, 4.5, 'Authentic Mumbai taste! Spicy and delicious.', ARRAY['Authentic', 'Spicy'], NOW() - INTERVAL '2 days'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', vada_pav_id, 4, 'Good street food. Fresh and tasty.', ARRAY['Street Food', 'Fresh'], NOW() - INTERVAL '1 day'),
    
    -- Mango Lassi (beverage - refreshment/consistency focus)
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', mango_lassi_id, 5, 'Thick and fruity! So refreshing on hot days.', ARRAY['Thick', 'Refreshing'], NOW() - INTERVAL '3 days'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', mango_lassi_id, 4.5, 'Creamy and delicious! Real mango flavor.', ARRAY['Creamy', 'Real Mango'], NOW() - INTERVAL '2 days'),
    
    -- Chocolate Shake (beverage - sweetness/temperature focus)
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', chocolate_shake_id, 4.5, 'Rich and thick! Like dessert in a glass.', ARRAY['Rich', 'Thick'], NOW() - INTERVAL '2 days'),
    ('10101010-1010-1010-1010-101010101010', chocolate_shake_id, 4, 'Good chocolate flavor. Could be colder.', ARRAY['Good', 'Warm'], NOW() - INTERVAL '1 day');

END $$;
