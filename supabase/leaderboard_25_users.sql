-- Comprehensive Leaderboard Demo Data: 25 Users with Unique Ratings
-- This creates a realistic leaderboard with varied point distribution
-- Points are calculated as: review_count * 50

-- DISTRIBUTION:
-- Top 3: 600, 550, 500 points (12, 11, 10 reviews)
-- Top 10: 450-250 points (9-5 reviews)
-- Top 25: 200-50 points (4-1 reviews)

-- ============================================
-- TOP TIER USERS (600-500 points)
-- ============================================

-- User 1: 12 reviews = 600 points (CHAMPION)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Absolutely delicious! Perfect spice level.', ARRAY['Delicious', 'Perfect'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Crispy and amazing!', ARRAY['Crispy', 'Fresh'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Best cold coffee ever!', ARRAY['Refreshing', 'Perfect'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Very good and creamy.', ARRAY['Tasty', 'Creamy'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 5, 'Perfect breakfast!', ARRAY['Soft', 'Delicious'], NOW() - INTERVAL '5 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Samosa'), 4, 'Crispy and tasty!', ARRAY['Crispy', 'Good'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 5, 'Refreshing drink!', ARRAY['Delicious', 'Cold'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Outstanding!', ARRAY['Excellent', 'Rich'], NOW() - INTERVAL '8 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Veg Thali'), 4, 'Good variety!', ARRAY['Fresh', 'Tasty'], NOW() - INTERVAL '9 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Dal Makhani'), 5, 'Creamy and perfect!', ARRAY['Delicious', 'Creamy'], NOW() - INTERVAL '10 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Chole Bhature'), 4, 'Filling and good!', ARRAY['Tasty', 'Good'], NOW() - INTERVAL '11 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Gulab Jamun'), 5, 'Sweet perfection!', ARRAY['Sweet', 'Delicious'], NOW() - INTERVAL '12 days');

-- User 2: 11 reviews = 550 points
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Best biryani ever!', ARRAY['Amazing', 'Tasty'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Love the crispiness!', ARRAY['Crispy', 'Fresh'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 4, 'Good but a bit watery.', ARRAY['Good', 'Watery'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 5, 'Rich and flavorful!', ARRAY['Delicious', 'Rich'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 4, 'Healthy and good!', ARRAY['Fresh', 'Tasty'], NOW() - INTERVAL '5 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Samosa'), 5, 'Perfectly crispy!', ARRAY['Crispy', 'Excellent'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Absolutely amazing!', ARRAY['Perfect', 'Delicious'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Vada Pav'), 4, 'Good snack!', ARRAY['Tasty', 'Spicy'], NOW() - INTERVAL '8 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 5, 'Perfect sweetness!', ARRAY['Delicious', 'Refreshing'], NOW() - INTERVAL '9 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Pav Bhaji'), 4, 'Flavorful!', ARRAY['Tasty', 'Spicy'], NOW() - INTERVAL '10 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Jalebi'), 5, 'Sweet and crispy!', ARRAY['Sweet', 'Crispy'], NOW() - INTERVAL '11 days');

-- User 3: 10 reviews = 500 points
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'My favorite dish!', ARRAY['Favorite', 'Excellent'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Always perfect!', ARRAY['Perfect', 'Crispy'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Refreshing!', ARRAY['Cold', 'Delicious'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Great taste!', ARRAY['Tasty', 'Good'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 5, 'Fluffy idlis!', ARRAY['Perfect', 'Soft'], NOW() - INTERVAL '5 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Rich and creamy!', ARRAY['Delicious', 'Creamy'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Dal Makhani'), 4, 'Good dal!', ARRAY['Tasty', 'Creamy'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Samosa'), 4, 'Crispy and good!', ARRAY['Crispy', 'Tasty'], NOW() - INTERVAL '8 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Veg Thali'), 5, 'Complete meal!', ARRAY['Fresh', 'Variety'], NOW() - INTERVAL '9 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Gulab Jamun'), 5, 'Perfect dessert!', ARRAY['Sweet', 'Soft'], NOW() - INTERVAL '10 days');

-- ============================================
-- HIGH TIER USERS (450-300 points)
-- ============================================

-- User 4: 9 reviews = 450 points
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 4, 'Good but spicy!', ARRAY['Spicy', 'Good'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Excellent!', ARRAY['Crispy', 'Tasty'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 4, 'Good drink!', ARRAY['Refreshing', 'Good'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 5, 'Love it!', ARRAY['Delicious', 'Creamy'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 4, 'Nice breakfast!', ARRAY['Good', 'Healthy'], NOW() - INTERVAL '5 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Samosa'), 3, 'Average.', ARRAY['Okay', 'Oily'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Amazing!', ARRAY['Perfect', 'Rich'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 4, 'Tasty!', ARRAY['Good', 'Sweet'], NOW() - INTERVAL '8 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Veg Thali'), 4, 'Good variety!', ARRAY['Fresh', 'Good'], NOW() - INTERVAL '9 days');

-- User 5: 8 reviews = 400 points
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Fantastic!', ARRAY['Excellent', 'Tasty'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Perfect!', ARRAY['Crispy', 'Delicious'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Love it!', ARRAY['Perfect', 'Cold'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Good dish!', ARRAY['Tasty', 'Creamy'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 4, 'Nice!', ARRAY['Good', 'Soft'], NOW() - INTERVAL '5 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Delicious!', ARRAY['Perfect', 'Rich'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Dal Makhani'), 4, 'Creamy!', ARRAY['Good', 'Tasty'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Samosa'), 4, 'Crispy!', ARRAY['Good', 'Tasty'], NOW() - INTERVAL '8 days');

-- User 6: 7 reviews = 350 points
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Outstanding!', ARRAY['Excellent', 'Perfect'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Amazing!', ARRAY['Crispy', 'Fresh'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 4, 'Good!', ARRAY['Refreshing', 'Good'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Tasty!', ARRAY['Good', 'Creamy'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 5, 'Perfect!', ARRAY['Delicious', 'Soft'], NOW() - INTERVAL '5 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Excellent!', ARRAY['Perfect', 'Rich'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 4, 'Refreshing!', ARRAY['Good', 'Sweet'], NOW() - INTERVAL '7 days');

-- User 7: 6 reviews = 300 points
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 4, 'Very good!', ARRAY['Tasty', 'Spicy'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Love it!', ARRAY['Crispy', 'Perfect'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Perfect!', ARRAY['Cold', 'Delicious'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Good!', ARRAY['Tasty', 'Creamy'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 4, 'Nice!', ARRAY['Good', 'Fresh'], NOW() - INTERVAL '5 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Amazing!', ARRAY['Excellent', 'Rich'], NOW() - INTERVAL '6 days');

-- ============================================
-- MID TIER USERS (250-150 points)
-- ============================================

-- Users 8-15: 5-3 reviews each (250-150 points)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
-- User 8: 5 reviews = 250 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 7), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Great!', ARRAY['Delicious'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 7), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 4, 'Good!', ARRAY['Tasty'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 7), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Perfect!', ARRAY['Refreshing'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 7), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Nice!', ARRAY['Good'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 7), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 5, 'Excellent!', ARRAY['Perfect'], NOW() - INTERVAL '5 days'),

-- User 9: 5 reviews = 250 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 8), (SELECT id FROM dishes WHERE name = 'Upma'), 2, 'Cold and bland.', ARRAY['Cold', 'Bland'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 8), (SELECT id FROM dishes WHERE name = 'Fish Fry'), 2, 'Dry and overcooked.', ARRAY['Dry', 'Overcooked'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 8), (SELECT id FROM dishes WHERE name = 'Watermelon Juice'), 2, 'Too watery.', ARRAY['Watery', 'Diluted'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 8), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Love it!', ARRAY['Perfect'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 8), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Amazing!', ARRAY['Delicious'], NOW() - INTERVAL '5 days'),

-- User 10: 4 reviews = 200 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 9), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Perfect!', ARRAY['Crispy'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 9), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 4, 'Good!', ARRAY['Refreshing'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 9), (SELECT id FROM dishes WHERE name = 'Samosa'), 4, 'Tasty!', ARRAY['Good'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 9), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 5, 'Delicious!', ARRAY['Perfect'], NOW() - INTERVAL '4 days'),

-- User 11: 4 reviews = 200 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 10), (SELECT id FROM dishes WHERE name = 'Upma'), 2, 'Not fresh.', ARRAY['Stale', 'Cold'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 10), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Excellent!', ARRAY['Perfect'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 10), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Good!', ARRAY['Tasty'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 10), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 5, 'Great!', ARRAY['Delicious'], NOW() - INTERVAL '4 days'),

-- User 12: 4 reviews = 200 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 11), (SELECT id FROM dishes WHERE name = 'Upma'), 2, 'Disappointing.', ARRAY['Cold', 'Tasteless'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 11), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Love it!', ARRAY['Crispy'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 11), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Perfect!', ARRAY['Delicious'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 11), (SELECT id FROM dishes WHERE name = 'Dal Makhani'), 4, 'Good!', ARRAY['Tasty'], NOW() - INTERVAL '4 days'),

-- User 13: 3 reviews = 150 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 12), (SELECT id FROM dishes WHERE name = 'Upma'), 3, 'Okay.', ARRAY['Warm', 'Bland'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 12), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Great!', ARRAY['Tasty'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 12), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Perfect!', ARRAY['Refreshing'], NOW() - INTERVAL '3 days'),

-- User 14: 3 reviews = 150 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 13), (SELECT id FROM dishes WHERE name = 'Fish Fry'), 3, 'Greasy.', ARRAY['Oily', 'Soggy'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 13), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Excellent!', ARRAY['Crispy'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 13), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Good!', ARRAY['Tasty'], NOW() - INTERVAL '3 days'),

-- User 15: 3 reviews = 150 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 14), (SELECT id FROM dishes WHERE name = 'Watermelon Juice'), 3, 'Diluted.', ARRAY['Watery', 'Weak'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 14), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Amazing!', ARRAY['Perfect'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 14), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Delicious!', ARRAY['Excellent'], NOW() - INTERVAL '3 days');

-- ============================================
-- LOW TIER USERS (100-50 points)
-- ============================================

-- Users 16-25: 2-1 reviews each (100-50 points)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
-- User 16: 2 reviews = 100 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 15), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Great!', ARRAY['Tasty'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 15), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 4, 'Good!', ARRAY['Crispy'], NOW() - INTERVAL '2 days'),

-- User 17: 2 reviews = 100 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 16), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Perfect!', ARRAY['Refreshing'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 16), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Nice!', ARRAY['Good'], NOW() - INTERVAL '2 days'),

-- User 18: 2 reviews = 100 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 17), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 5, 'Excellent!', ARRAY['Perfect'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 17), (SELECT id FROM dishes WHERE name = 'Butter Chicken'), 5, 'Amazing!', ARRAY['Delicious'], NOW() - INTERVAL '2 days'),

-- User 19: 2 reviews = 100 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 18), (SELECT id FROM dishes WHERE name = 'Dal Makhani'), 4, 'Good!', ARRAY['Tasty'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 18), (SELECT id FROM dishes WHERE name = 'Samosa'), 4, 'Crispy!', ARRAY['Good'], NOW() - INTERVAL '2 days'),

-- User 20: 2 reviews = 100 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 19), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 5, 'Delicious!', ARRAY['Perfect'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 19), (SELECT id FROM dishes WHERE name = 'Veg Thali'), 4, 'Good variety!', ARRAY['Fresh'], NOW() - INTERVAL '2 days'),

-- User 21: 1 review = 50 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 20), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Excellent!', ARRAY['Perfect'], NOW() - INTERVAL '1 day'),

-- User 22: 1 review = 50 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 21), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Great!', ARRAY['Crispy'], NOW() - INTERVAL '1 day'),

-- User 23: 1 review = 50 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 22), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 4, 'Good!', ARRAY['Refreshing'], NOW() - INTERVAL '1 day'),

-- User 24: 1 review = 50 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 23), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 5, 'Perfect!', ARRAY['Delicious'], NOW() - INTERVAL '1 day'),

-- User 25: 1 review = 50 points
((SELECT id FROM profiles ORDER BY created_at LIMIT 1 OFFSET 24), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 4, 'Nice!', ARRAY['Good'], NOW() - INTERVAL '1 day');

-- Verify the leaderboard distribution
SELECT 
    p.full_name,
    p.email,
    COUNT(r.id) as review_count,
    COUNT(r.id) * 50 as total_points,
    ROUND(AVG(r.rating)::numeric, 1) as avg_rating_given
FROM profiles p
LEFT JOIN ratings r ON p.id = r.user_id 
WHERE r.created_at >= NOW() - INTERVAL '14 days'
GROUP BY p.id, p.full_name, p.email
ORDER BY total_points DESC
LIMIT 25;
