-- Comprehensive Demo Data: 2 Weeks of Reviews with Realistic Leaderboard Impact
-- This creates varied point distribution across users for a realistic leaderboard
-- Top users will have different point totals based on review activity

-- STRATEGY:
-- - User 1 (Top): 12 reviews = 600 points
-- - User 2 (2nd): 9 reviews = 450 points  
-- - User 3 (3rd): 7 reviews = 350 points
-- - Other users: 2-5 reviews each = 100-250 points

-- ============================================
-- BESTSELLERS (High ratings, glowing reviews)
-- ============================================

-- Chicken Biryani - BESTSELLER (4.8 avg, many reviews)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
-- Top reviewer (User 1) - 3 reviews
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Absolutely delicious! Perfect spice level and the chicken was so tender.', ARRAY['Delicious', 'Perfect'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Crispy and perfect! The potato filling is amazing.', ARRAY['Crispy', 'Delicious'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Refreshing and perfect sweetness! Love it.', ARRAY['Refreshing', 'Perfect'], NOW() - INTERVAL '3 days'),

-- 2nd place reviewer (User 2) - 2 reviews
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Best biryani I have ever had! Amazing flavors and fresh ingredients.', ARRAY['Fresh', 'Tasty'], NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Love the crispiness! Best dosa in the canteen.', ARRAY['Fresh', 'Crispy'], NOW() - INTERVAL '2 days'),

-- 3rd place reviewer (User 3) - 2 reviews
((SELECT id FROM profiles LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Love this dish! Always my favorite. The rice is perfectly cooked.', ARRAY['Favorite', 'Great'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Best cold coffee! Not too sweet, just right.', ARRAY['Delicious', 'Good Sweetness'], NOW() - INTERVAL '3 days'),

-- Other active users
((SELECT id FROM profiles LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 4, 'Really good but a bit too spicy for me. Still excellent quality!', ARRAY['Spicy', 'Good Quality'], NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Fantastic! The aroma alone makes me hungry. Perfect portion size.', ARRAY['Excellent', 'Good Portion'], NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Outstanding taste! This is what biryani should taste like.', ARRAY['Delicious', 'Authentic'], NOW() - INTERVAL '5 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 5, 'Wonderful dish! Always fresh and hot when served.', ARRAY['Fresh', 'Hot'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 7), (SELECT id FROM dishes WHERE name = 'Chicken Biryani'), 4, 'Very good! Just wish there was a mild option for those who can''t handle spice.', ARRAY['Tasty', 'Spicy'], NOW() - INTERVAL '10 days');

-- Masala Dosa - BESTSELLER (4.7 avg)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
-- Top reviewer continues
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Good taste! Creamy and delicious.', ARRAY['Tasty', 'Creamy'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 4, 'Soft idlis and tasty sambar. Good breakfast option.', ARRAY['Soft', 'Tasty'], NOW() - INTERVAL '5 days'),

-- 2nd place continues
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 5, 'Love it! Rich and flavorful.', ARRAY['Delicious', 'Rich'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Excellent! Always cold and refreshing.', ARRAY['Excellent', 'Cold'], NOW() - INTERVAL '5 days'),

-- 3rd place continues  
((SELECT id FROM profiles LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Excellent! Always my go-to breakfast option.', ARRAY['Favorite', 'Excellent'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 5, 'Perfect! Idlis are fluffy and sambar is delicious.', ARRAY['Perfect', 'Delicious'], NOW() - INTERVAL '6 days'),

-- Other users
((SELECT id FROM profiles LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 4, 'Great taste but sometimes served a bit cold.', ARRAY['Tasty', 'Cold'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Perfect every time! The sambar is also delicious.', ARRAY['Perfect', 'Delicious'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Masala Dosa'), 5, 'Amazing! Crispy outside, soft inside. Just right.', ARRAY['Amazing', 'Crispy'], NOW() - INTERVAL '9 days');

-- Cold Coffee - BESTSELLER for beverages (4.6 avg)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
-- Top reviewer continues (now at 7 reviews)
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 4, 'Refreshing and good sweetness. Nice and cold.', ARRAY['Refreshing', 'Cold'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Samosa'), 4, 'Crispy and good filling. Tasty!', ARRAY['Crispy', 'Tasty'], NOW() - INTERVAL '7 days'),

-- 2nd place continues (now at 6 reviews)
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 4, 'Good and healthy. Always fresh.', ARRAY['Good', 'Fresh'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 5, 'Delicious! Perfect mango flavor.', ARRAY['Delicious', 'Perfect'], NOW() - INTERVAL '8 days'),

-- 3rd place continues (now at 5 reviews)
((SELECT id FROM profiles LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Great dish! Paneer is soft and fresh.', ARRAY['Great', 'Fresh'], NOW() - INTERVAL '8 days'),

-- Other users with varied activity
((SELECT id FROM profiles LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 4, 'Very good but sometimes a bit watery.', ARRAY['Good', 'Watery'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Cold Coffee'), 5, 'Love this! Perfect for hot days.', ARRAY['Favorite', 'Refreshing'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 4, 'Nice breakfast. Idlis could be a bit hotter though.', ARRAY['Good', 'Warm'], NOW() - INTERVAL '8 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 7), (SELECT id FROM dishes WHERE name = 'Idli Sambar'), 5, 'Excellent! Love the sambar flavor.', ARRAY['Excellent', 'Tasty'], NOW() - INTERVAL '11 days');

-- ============================================
-- POORLY RATED ITEMS (Specific issues)
-- ============================================

-- Upma - NEEDS ATTENTION (2.4 avg - temperature & taste issues)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
-- Top reviewer gives critical feedback (now at 10 reviews)
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Upma'), 2, 'Served cold and bland. Needs more seasoning.', ARRAY['Cold', 'Bland'], NOW() - INTERVAL '8 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Fish Fry'), 2, 'Overcooked and dry. Not fresh at all.', ARRAY['Overcooked', 'Dry'], NOW() - INTERVAL '9 days'),

-- 2nd place reviewer (now at 8 reviews)
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Upma'), 2, 'Not hot enough and tasteless. Very disappointing.', ARRAY['Cold', 'Tasteless'], NOW() - INTERVAL '9 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Watermelon Juice'), 2, 'Too watery and diluted. Barely tastes like watermelon.', ARRAY['Watery', 'Diluted'], NOW() - INTERVAL '10 days'),

-- 3rd place reviewer (now at 7 reviews - final count)
((SELECT id FROM profiles LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Upma'), 3, 'Lukewarm when served. Taste is okay but could be better.', ARRAY['Lukewarm', 'Okay'], NOW() - INTERVAL '10 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 2), (SELECT id FROM dishes WHERE name = 'Fish Fry'), 3, 'Too oily and the fish doesn''t taste fresh.', ARRAY['Oily', 'Not Fresh'], NOW() - INTERVAL '11 days'),

-- Other users
((SELECT id FROM profiles LIMIT 1 OFFSET 8), (SELECT id FROM dishes WHERE name = 'Upma'), 2, 'Cold and no flavor. Please improve this dish.', ARRAY['Cold', 'No Flavor'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 9), (SELECT id FROM dishes WHERE name = 'Upma'), 3, 'Warm but bland. Needs more spices and salt.', ARRAY['Warm', 'Bland'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 10), (SELECT id FROM dishes WHERE name = 'Upma'), 2, 'Not fresh, tastes old. Temperature is also an issue.', ARRAY['Stale', 'Cold'], NOW() - INTERVAL '8 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 11), (SELECT id FROM dishes WHERE name = 'Upma'), 2, 'Disappointing. Cold and tasteless.', ARRAY['Cold', 'Tasteless'], NOW() - INTERVAL '10 days');

-- Fish Fry - NEEDS ATTENTION (2.6 avg - quality & texture issues)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
-- Top reviewer final reviews (now at 12 reviews = 600 points)
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Watermelon Juice'), 3, 'Very thin consistency. Needs more fruit, less water.', ARRAY['Thin', 'Weak'], NOW() - INTERVAL '10 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 0), (SELECT id FROM dishes WHERE name = 'Samosa'), 3, 'Okay but sometimes too oily.', ARRAY['Okay', 'Oily'], NOW() - INTERVAL '11 days'),

-- 2nd place final review (now at 9 reviews = 450 points)
((SELECT id FROM profiles LIMIT 1 OFFSET 1), (SELECT id FROM dishes WHERE name = 'Samosa'), 4, 'Good snack. Fresh and crispy.', ARRAY['Good', 'Fresh'], NOW() - INTERVAL '12 days'),

-- Other users
((SELECT id FROM profiles LIMIT 1 OFFSET 8), (SELECT id FROM dishes WHERE name = 'Fish Fry'), 2, 'Dry and overcooked. Quality needs improvement.', ARRAY['Dry', 'Bad Quality'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 9), (SELECT id FROM dishes WHERE name = 'Fish Fry'), 3, 'Greasy and not crispy. Expected better.', ARRAY['Greasy', 'Soggy'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 10), (SELECT id FROM dishes WHERE name = 'Fish Fry'), 2, 'Old fish, bad quality. Please use fresh ingredients.', ARRAY['Old', 'Bad Quality'], NOW() - INTERVAL '9 days');

-- Watermelon Juice - BEVERAGE ISSUE (2.7 avg - consistency problems)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
((SELECT id FROM profiles LIMIT 1 OFFSET 8), (SELECT id FROM dishes WHERE name = 'Watermelon Juice'), 2, 'Watery and not sweet enough. Disappointing.', ARRAY['Watery', 'Not Sweet Enough'], NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 9), (SELECT id FROM dishes WHERE name = 'Watermelon Juice'), 3, 'Diluted. Please use less water!', ARRAY['Diluted', 'Weak'], NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 10), (SELECT id FROM dishes WHERE name = 'Watermelon Juice'), 3, 'Too much water, not enough flavor.', ARRAY['Watery', 'Bland'], NOW() - INTERVAL '10 days');

-- ============================================
-- ADDITIONAL REVIEWS FOR OTHER USERS (varied points)
-- ============================================

-- Users 4-7 with moderate activity (2-4 reviews each)
INSERT INTO ratings (user_id, dish_id, rating, comment, tags, created_at) VALUES
-- User 4 (3 reviews = 150 points)
((SELECT id FROM profiles LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Very good! Could be a bit less oily though.', ARRAY['Good', 'Oily'], NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 3), (SELECT id FROM dishes WHERE name = 'Samosa'), 3, 'Average. Could be crispier.', ARRAY['Average', 'Soggy'], NOW() - INTERVAL '8 days'),

-- User 5 (3 reviews = 150 points)
((SELECT id FROM profiles LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 4, 'Tasty and well-cooked. Enjoy it every time.', ARRAY['Tasty', 'Good'], NOW() - INTERVAL '9 days'),
((SELECT id FROM profiles LIMIT 1 OFFSET 4), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 4, 'Good but could be a bit thicker.', ARRAY['Good', 'Thin'], NOW() - INTERVAL '10 days'),

-- User 6 (2 reviews = 100 points)
((SELECT id FROM profiles LIMIT 1 OFFSET 5), (SELECT id FROM dishes WHERE name = 'Mango Lassi'), 4, 'Tasty and refreshing. Great for summer.', ARRAY['Tasty', 'Refreshing'], NOW() - INTERVAL '9 days'),

-- User 7 (2 reviews = 100 points)
((SELECT id FROM profiles LIMIT 1 OFFSET 6), (SELECT id FROM dishes WHERE name = 'Paneer Butter Masala'), 5, 'Excellent! Love the creamy texture.', ARRAY['Excellent', 'Creamy'], NOW() - INTERVAL '10 days');

-- Verify the leaderboard impact
SELECT 
    p.full_name,
    COUNT(r.id) as review_count,
    COUNT(r.id) * 50 as total_points,
    ROUND(AVG(r.rating)::numeric, 1) as avg_rating_given
FROM profiles p
LEFT JOIN ratings r ON p.id = r.user_id 
WHERE r.created_at >= NOW() - INTERVAL '14 days'
GROUP BY p.id, p.full_name
ORDER BY total_points DESC
LIMIT 10;

-- Verify dish analytics
SELECT 
    d.name as dish_name,
    d.category,
    COUNT(r.id) as review_count,
    ROUND(AVG(r.rating)::numeric, 1) as avg_rating,
    COUNT(CASE WHEN r.rating >= 4 THEN 1 END) as positive_reviews,
    COUNT(CASE WHEN r.rating <= 2 THEN 1 END) as negative_reviews
FROM dishes d
LEFT JOIN ratings r ON d.id = r.dish_id 
WHERE r.created_at >= NOW() - INTERVAL '14 days'
GROUP BY d.id, d.name, d.category
HAVING COUNT(r.id) > 0
ORDER BY avg_rating DESC;
