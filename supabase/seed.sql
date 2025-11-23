-- Clear existing data
DELETE FROM daily_menu_items;
DELETE FROM daily_menus;
DELETE FROM dishes;
DELETE FROM locations;

-- Insert Locations
INSERT INTO locations (name, image_url) VALUES
('Canteen', 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=1000'),
('Food Truck', 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&q=80&w=1000'),
('Snack Store', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1000'),
('Juice Bar', 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&q=80&w=1000');

-- Insert Dishes with carefully selected images
INSERT INTO dishes (name, description, price, category, image_url, is_veg) VALUES
-- Breakfast Items (Veg)
('Masala Dosa', 'Crispy rice crepe filled with spiced potato masala', 40, 'Breakfast', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Idli Sambar', 'Steamed rice cakes served with lentil soup', 30, 'Breakfast', 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Poha', 'Flattened rice with peanuts and spices', 25, 'Breakfast', 'https://images.pexels.com/photos/14477797/pexels-photo-14477797.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Upma', 'Savory semolina porridge with vegetables', 30, 'Breakfast', 'https://images.pexels.com/photos/5560551/pexels-photo-5560551.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Aloo Paratha', 'Stuffed flatbread with spiced potatoes', 35, 'Breakfast', 'https://images.pexels.com/photos/4753879/pexels-photo-4753879.jpeg?auto=compress&cs=tinysrgb&w=800', true),

-- Lunch Items (Veg)
('Veg Thali', 'Complete meal with rice, dal, sabzi, and roti', 60, 'Lunch', 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Paneer Butter Masala', 'Cottage cheese in rich tomato gravy', 90, 'Lunch', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Dal Makhani', 'Creamy black lentils with butter', 70, 'Lunch', 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Chole Bhature', 'Spicy chickpeas with fried bread', 50, 'Lunch', 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Rajma Chawal', 'Kidney beans curry with steamed rice', 55, 'Lunch', 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800', true),

-- Lunch Items (Non-Veg)
('Chicken Biryani', 'Aromatic basmati rice cooked with tender chicken and spices', 120, 'Lunch', 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Butter Chicken', 'Tender chicken in creamy tomato gravy', 110, 'Lunch', 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Chicken Tikka Masala', 'Grilled chicken in spiced curry', 100, 'Lunch', 'https://images.pexels.com/photos/5410401/pexels-photo-5410401.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Mutton Curry', 'Spicy mutton curry with aromatic spices', 140, 'Lunch', 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Fish Fry', 'Crispy fried fish with spices', 90, 'Lunch', 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Egg Curry', 'Boiled eggs in spicy gravy', 60, 'Lunch', 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=800', false),

-- Snacks (Veg)
('Samosa', 'Deep-fried pastry with savory filling', 10, 'Snacks', 'https://images.pexels.com/photos/6646600/pexels-photo-6646600.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Vada Pav', 'Spiced potato fritter in a bun', 15, 'Snacks', 'https://images.pexels.com/photos/14477797/pexels-photo-14477797.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Pav Bhaji', 'Spiced vegetable mash with buttered bread', 45, 'Snacks', 'https://images.pexels.com/photos/5560551/pexels-photo-5560551.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Pakora', 'Mixed vegetable fritters', 20, 'Snacks', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Spring Roll', 'Crispy vegetable rolls', 25, 'Snacks', 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Cheese Sandwich', 'Grilled sandwich with cheese and vegetables', 30, 'Snacks', 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=800', true),

-- Snacks (Non-Veg)
('Chicken Samosa', 'Deep-fried pastry with chicken filling', 15, 'Snacks', 'https://images.pexels.com/photos/6646600/pexels-photo-6646600.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Chicken Wings', 'Spicy fried chicken wings', 80, 'Snacks', 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800', false),
('Egg Roll', 'Rolled paratha with egg filling', 25, 'Snacks', 'https://images.pexels.com/photos/4753879/pexels-photo-4753879.jpeg?auto=compress&cs=tinysrgb&w=800', false),

-- Beverages & Drinks (All Veg)
('Cold Coffee', 'Chilled coffee with milk and sugar', 30, 'Beverages', 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Masala Chai', 'Spiced Indian tea', 10, 'Beverages', 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Fresh Lime Soda', 'Refreshing lime drink with soda', 20, 'Beverages', 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Mango Lassi', 'Sweet yogurt drink with mango', 40, 'Beverages', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Buttermilk', 'Spiced yogurt drink', 15, 'Beverages', 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Fresh Orange Juice', 'Freshly squeezed orange juice', 35, 'Beverages', 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Watermelon Juice', 'Fresh watermelon juice', 30, 'Beverages', 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800', true),

-- Shakes & Smoothies (All Veg)
('Chocolate Shake', 'Thick chocolate milkshake', 50, 'Shakes', 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Strawberry Shake', 'Fresh strawberry milkshake', 55, 'Shakes', 'https://images.pexels.com/photos/1337824/pexels-photo-1337824.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Vanilla Shake', 'Classic vanilla milkshake', 45, 'Shakes', 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Banana Shake', 'Creamy banana milkshake', 40, 'Shakes', 'https://images.pexels.com/photos/1337824/pexels-photo-1337824.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Oreo Shake', 'Cookies and cream shake', 60, 'Shakes', 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Mixed Fruit Smoothie', 'Healthy blend of seasonal fruits', 65, 'Shakes', 'https://images.pexels.com/photos/1337824/pexels-photo-1337824.jpeg?auto=compress&cs=tinysrgb&w=800', true),

-- Desserts (All Veg)
('Gulab Jamun', 'Sweet milk dumplings in sugar syrup', 20, 'Desserts', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Jalebi', 'Crispy sweet spirals', 25, 'Desserts', 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Ice Cream', 'Assorted flavors', 30, 'Desserts', 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800', true),
('Kulfi', 'Traditional Indian ice cream', 25, 'Desserts', 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800', true);

-- Create Daily Menu for Today
DO $$
DECLARE
    canteen_id uuid;
    truck_id uuid;
    snack_store_id uuid;
    juice_bar_id uuid;
    menu_id uuid;
BEGIN
    -- Get location IDs
    SELECT id INTO canteen_id FROM locations WHERE name = 'Canteen' LIMIT 1;
    SELECT id INTO truck_id FROM locations WHERE name = 'Food Truck' LIMIT 1;
    SELECT id INTO snack_store_id FROM locations WHERE name = 'Snack Store' LIMIT 1;
    SELECT id INTO juice_bar_id FROM locations WHERE name = 'Juice Bar' LIMIT 1;

    -- Create Menu for Canteen (Breakfast & Lunch items ONLY - both veg and non-veg)
    INSERT INTO daily_menus (location_id, date) VALUES (canteen_id, CURRENT_DATE) RETURNING id INTO menu_id;
    INSERT INTO daily_menu_items (daily_menu_id, dish_id, status)
    SELECT menu_id, id, 'Available' FROM dishes WHERE name IN (
        'Masala Dosa', 'Idli Sambar', 'Poha', 'Upma', 'Aloo Paratha',
        'Veg Thali', 'Chicken Biryani', 'Paneer Butter Masala', 'Dal Makhani', 
        'Butter Chicken', 'Egg Curry', 'Chole Bhature', 'Rajma Chawal',
        'Chicken Tikka Masala', 'Mutton Curry', 'Fish Fry'
    );

    -- Create Menu for Food Truck (Street Food Snacks ONLY - both veg and non-veg)
    INSERT INTO daily_menus (location_id, date) VALUES (truck_id, CURRENT_DATE) RETURNING id INTO menu_id;
    INSERT INTO daily_menu_items (daily_menu_id, dish_id, status)
    SELECT menu_id, id, 'Available' FROM dishes WHERE name IN (
        'Vada Pav', 'Pav Bhaji', 'Chicken Samosa', 'Chicken Wings', 'Egg Roll'
    );

    -- Create Menu for Snack Store (Quick Snacks & Sandwiches ONLY)
    INSERT INTO daily_menus (location_id, date) VALUES (snack_store_id, CURRENT_DATE) RETURNING id INTO menu_id;
    INSERT INTO daily_menu_items (daily_menu_id, dish_id, status)
    SELECT menu_id, id, 'Available' FROM dishes WHERE name IN (
        'Samosa', 'Pakora', 'Spring Roll', 'Cheese Sandwich', 
        'Gulab Jamun', 'Jalebi', 'Ice Cream', 'Kulfi'
    );

    -- Create Menu for Juice Bar (ALL Beverages, Shakes, and Juices ONLY)
    INSERT INTO daily_menus (location_id, date) VALUES (juice_bar_id, CURRENT_DATE) RETURNING id INTO menu_id;
    INSERT INTO daily_menu_items (daily_menu_id, dish_id, status)
    SELECT menu_id, id, 'Available' FROM dishes WHERE name IN (
        'Cold Coffee', 'Masala Chai', 'Fresh Lime Soda', 'Mango Lassi', 'Buttermilk',
        'Fresh Orange Juice', 'Watermelon Juice',
        'Chocolate Shake', 'Strawberry Shake', 'Vanilla Shake', 'Banana Shake', 
        'Oreo Shake', 'Mixed Fruit Smoothie'
    );
    
END $$;
