-- Update image URLs for dishes with user-provided links
-- Run this in Supabase SQL Editor

-- Upma
UPDATE dishes SET image_url = 'https://www.sharmispassions.com/wp-content/uploads/2023/06/IdliUpma4.jpg' WHERE name = 'Upma';

-- Rajma Chawal
UPDATE dishes SET image_url = 'https://www.secondrecipe.com/wp-content/uploads/2017/08/rajma-chawal-1-1200x918.jpg' WHERE name = 'Rajma Chawal';

-- Egg Roll
UPDATE dishes SET image_url = 'https://mukhorochak.com/wp-content/uploads/2023/09/Kolkata-Kathi-Roll-Egg-Chicken.jpg' WHERE name = 'Egg Roll';

-- Vada Pav
UPDATE dishes SET image_url = 'https://thewhiskaddict.com/wp-content/uploads/2024/03/Vada-Pav-scaled.jpg' WHERE name = 'Vada Pav';

-- Spring Roll
UPDATE dishes SET image_url = 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Veggie-Spring-Rolls.jpg' WHERE name = 'Spring Roll';

-- Gulab Jamun (Updated)
UPDATE dishes SET image_url = 'https://www.vegrecipesofindia.com/wp-content/uploads/2022/10/gulab-jamun-recipe-01.jpg' WHERE name = 'Gulab Jamun';

-- Jalebi
UPDATE dishes SET image_url = 'https://sinfullyspicy.com/wp-content/uploads/2014/10/1-4.jpg' WHERE name = 'Jalebi';

-- Ice Cream
UPDATE dishes SET image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Ice_Cream_dessert_02.jpg/960px-Ice_Cream_dessert_02.jpg' WHERE name = 'Ice Cream';

-- Kulfi
UPDATE dishes SET image_url = 'https://www.sharmispassions.com/wp-content/uploads/2020/12/26786689323_0853a6524e_o.jpg' WHERE name = 'Kulfi';

-- BEVERAGES

-- Watermelon Juice
UPDATE dishes SET image_url = 'https://www.cookclickndevour.com/wp-content/uploads/2019/05/water-melon-agua-fresca-recipe-2.jpg' WHERE name = 'Watermelon Juice';

-- Fresh Lime Soda (Updated)
UPDATE dishes SET image_url = 'https://chickenday.in/wp-content/uploads/2022/07/Tequila-Soda-_-A-refreshing-tequila-cocktail-Moms-Dinner.jpg' WHERE name = 'Fresh Lime Soda';

-- Banana Shake
UPDATE dishes SET image_url = 'https://www.sharmispassions.com/wp-content/uploads/2012/09/banana-milkshake6.jpg' WHERE name = 'Banana Shake';

-- Oreo Shake
UPDATE dishes SET image_url = 'https://saltandbaker.com/wp-content/uploads/2020/12/oreo-milkshake-recipe.jpg' WHERE name = 'Oreo Shake';

-- Verify updates
SELECT name, image_url FROM dishes WHERE name IN (
    'Upma', 'Rajma Chawal', 'Egg Roll', 'Vada Pav', 'Spring Roll', 
    'Gulab Jamun', 'Jalebi', 'Ice Cream', 'Kulfi', 
    'Watermelon Juice', 'Fresh Lime Soda', 'Banana Shake', 'Oreo Shake'
);
