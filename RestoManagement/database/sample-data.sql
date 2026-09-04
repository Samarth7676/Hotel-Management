USE hotel_resto_db;

-- Roles and Users (Passwords are 'password' hashed with BCrypt)
-- Admin: admin, Customer: customer1, Staff: staff1
INSERT INTO users (username, password, email, full_name, role) VALUES
('admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DM999f8mO.6S', 'admin@hotelresto.com', 'System Admin', 'ADMIN'),
('customer1', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DM999f8mO.6S', 'customer1@gmail.com', 'John Doe', 'CUSTOMER'),
('staff1', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DM999f8mO.6S', 'staff1@hotelresto.com', 'Staff Member', 'STAFF');

-- Rooms
INSERT INTO rooms (room_number, room_type, price_per_night, status, description) VALUES
('101', 'SINGLE', 50.00, 'AVAILABLE', 'Cozy single room with basic amenities'),
('102', 'SINGLE', 50.00, 'AVAILABLE', 'Cozy single room with basic amenities'),
('201', 'DOUBLE', 85.00, 'AVAILABLE', 'Spacious double room for families'),
('202', 'DOUBLE', 85.00, 'AVAILABLE', 'Spacious double room for families'),
('301', 'SUITE', 150.00, 'AVAILABLE', 'Luxury suite with balcony and view'),
('401', 'DELUXE', 250.00, 'AVAILABLE', 'Premium deluxe room with all luxuries');

-- Categories
INSERT INTO categories (name) VALUES
('Appetizers'),
('Main Course'),
('Desserts'),
('Beverages'),
('Breakfast');

-- Menu Items
INSERT INTO menu_items (category_id, name, description, price, available) VALUES
(1, 'Spring Rolls', 'Crispy vegetarian spring rolls', 8.99, TRUE),
(1, 'Chicken Satay', 'Grilled chicken skewers with peanut sauce', 12.50, TRUE),
(2, 'Grilled Salmon', 'Salmon fillet with roasted vegetables', 24.99, TRUE),
(2, 'Beef Burger', 'Juicy beef patty with cheese and fries', 15.99, TRUE),
(3, 'Chocolate Lava Cake', 'Warm chocolate cake with melting heart', 7.50, TRUE),
(3, 'Cheesecake', 'Classic New York style cheesecake', 6.99, TRUE),
(4, 'Cappuccino', 'Rich espresso with frothy milk', 4.50, TRUE),
(4, 'Fresh Orange Juice', 'Squeezed daily', 5.00, TRUE),
(5, 'Eggs Benedict', 'Poached eggs on English muffins with hollandaise', 13.99, TRUE);

-- Inventory
INSERT INTO inventory (item_name, quantity, unit, reorder_level) VALUES
('Salmon Fillet', 50, 'kg', 10),
('Beef Patties', 100, 'pcs', 20),
('Potatoes', 200, 'kg', 50),
('Coffee Beans', 20, 'kg', 5),
('Eggs', 500, 'pcs', 100),
('Milk', 100, 'L', 20);

-- Sample Bookings
INSERT INTO bookings (user_id, room_id, check_in_date, check_out_date, total_price, status) VALUES
(2, 1, '2026-05-01', '2026-05-05', 200.00, 'CONFIRMED');

-- Sample Orders
INSERT INTO orders (user_id, table_number, total_amount, order_type, status) VALUES
(2, '5', 33.98, 'DINE_IN', 'COMPLETED');

-- Sample Order Items
INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES
(1, 4, 1, 15.99),
(1, 1, 2, 17.98);
