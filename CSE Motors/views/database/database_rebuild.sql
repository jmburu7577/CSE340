-- database_rebuild.sql – FINAL CORRECT VERSION

-- 1. Create type (match your course exactly)
CREATE TYPE account_type AS ENUM ('Client', 'Admin');

-- 2. Create tables
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(50) NOT NULL,
    account_lastname VARCHAR(50) NOT NULL,
    account_email VARCHAR(100) UNIQUE NOT NULL,
    account_password VARCHAR(255) NOT NULL,
    account_type account_type DEFAULT 'Client'
);

CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    classification_id INT REFERENCES classification(classification_id),
    inv_description TEXT,
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255)
);

-- 3. Insert data
INSERT INTO classification (classification_name) VALUES
('Sport'), ('SUV'), ('Truck'), ('Classic');

INSERT INTO inventory (inv_make, inv_model, classification_id, inv_description, inv_image, inv_thumbnail)
VALUES
('Chevrolet', 'Camaro', 1, 'Fast sports car with great handling', '/images/camaro.jpg', '/images/camaro-tn.jpg'),
('Ford', 'Mustang', 1, 'Iconic American muscle', '/images/mustang.jpg', '/images/mustang-tn.jpg'),
('GM', 'Hummer', 2, 'Large SUV with small interiors', '/images/hummer.jpg', '/images/hummer-tn.jpg');

-- 4. REQUIRED: Task 1 Query 4 (use primary key)
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = (
    SELECT inv_id FROM inventory
    WHERE inv_make = 'GM' AND inv_model = 'Hummer'
);

-- 5. REQUIRED: Task 1 Query 6 (must be last)
UPDATE inventory
SET 
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');