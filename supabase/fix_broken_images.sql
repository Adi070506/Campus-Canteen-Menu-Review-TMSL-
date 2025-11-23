-- Alternative Working URLs - Testing Different Sources
-- These are direct image URLs that should work better

-- Breakfast Items - Using working alternatives
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80' WHERE name = 'Poha';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=800&q=80' WHERE name = 'Upma';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80' WHERE name = 'Aloo Paratha';

-- Main Dishes - Using Unsplash alternatives
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80' WHERE name = 'Chicken Tikka Masala';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80' WHERE name = 'Mutton Curry';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1580959375944-0b7b9e7d3e3f?w=800&q=80' WHERE name = 'Fish Fry';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80' WHERE name = 'Chole Bhature';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80' WHERE name = 'Rajma Chawal';

-- Beverages - Using Unsplash
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=800&q=80' WHERE name = 'Fresh Lime Soda';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80' WHERE name = 'Buttermilk';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1629203849068-752ace6e4fa7?w=800&q=80' WHERE name = 'Watermelon Juice';

-- Shakes - Using Unsplash
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80' WHERE name = 'Vanilla Shake';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=800&q=80' WHERE name = 'Banana Shake';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80' WHERE name = 'Oreo Shake';

-- Desserts - Using Unsplash
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?w=800&q=80' WHERE name = 'Gulab Jamun';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80' WHERE name = 'Jalebi';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80' WHERE name = 'Ice Cream';
UPDATE dishes SET image_url = 'https://images.unsplash.com/photo-1588195538326-c5b1e5b80c47?w=800&q=80' WHERE name = 'Kulfi';

-- Verify
SELECT name, image_url FROM dishes ORDER BY name;
