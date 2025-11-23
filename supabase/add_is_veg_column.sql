-- Add is_veg column to dishes table
ALTER TABLE dishes ADD COLUMN IF NOT EXISTS is_veg boolean DEFAULT true;
