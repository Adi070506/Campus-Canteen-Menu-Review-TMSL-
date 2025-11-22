-- Insert Locations
INSERT INTO locations (name, image_url) VALUES
('Canteen', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000'),
('Food Truck', 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&q=80&w=1000'),
('Snack Store', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000');

-- Insert Dishes
INSERT INTO dishes (name, description, price, category, image_url) VALUES
('Masala Dosa', 'Crispy rice crepe filled with spiced potato masala', 40, 'Breakfast', 'https://images.unsplash.com/photo-1589301760576-4163d5503c0c?auto=format&fit=crop&q=80&w=1000'),
('Veg Thali', 'Complete meal with rice, dal, sabzi, and roti', 60, 'Lunch', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000'),
('Chicken Biryani', 'Aromatic basmati rice cooked with tender chicken and spices', 120, 'Lunch', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1000'),
('Samosa', 'Deep-fried pastry with savory filling', 10, 'Snacks', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000'),
('Cold Coffee', 'Chilled coffee with milk and sugar', 30, 'Beverages', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=1000');

-- Create Daily Menu for Today (Dynamic Date)
DO $$
DECLARE
    canteen_id uuid;
    truck_id uuid;
    dosa_id uuid;
    thali_id uuid;
    biryani_id uuid;
    samosa_id uuid;
    menu_id uuid;
BEGIN
    SELECT id INTO canteen_id FROM locations WHERE name = 'Canteen' LIMIT 1;
    SELECT id INTO truck_id FROM locations WHERE name = 'Food Truck' LIMIT 1;
    
    SELECT id INTO dosa_id FROM dishes WHERE name = 'Masala Dosa' LIMIT 1;
    SELECT id INTO thali_id FROM dishes WHERE name = 'Veg Thali' LIMIT 1;
    SELECT id INTO biryani_id FROM dishes WHERE name = 'Chicken Biryani' LIMIT 1;
    SELECT id INTO samosa_id FROM dishes WHERE name = 'Samosa' LIMIT 1;

    -- Create Menu for Canteen
    INSERT INTO daily_menus (location_id, date) VALUES (canteen_id, CURRENT_DATE) RETURNING id INTO menu_id;
    
    -- Add Items
    INSERT INTO daily_menu_items (daily_menu_id, dish_id, status) VALUES
    (menu_id, dosa_id, 'Available'),
    (menu_id, thali_id, 'Available'),
    (menu_id, biryani_id, 'Low');

    -- Create Menu for Food Truck
    INSERT INTO daily_menus (location_id, date) VALUES (truck_id, CURRENT_DATE) RETURNING id INTO menu_id;
    
    -- Add Items
    INSERT INTO daily_menu_items (daily_menu_id, dish_id, status) VALUES
    (menu_id, samosa_id, 'Available');
    
END $$;
