let db = null;
try {
  const Database = require('better-sqlite3');
  db = new Database(__dirname + '/cse-motors.db');
  db.pragma('journal_mode = WAL');
  // Check if classification column exists
  const info = db.pragma('table_info(vehicles)');
  const hasClassification = info.some((col) => col.name === 'classification');
  if (!hasClassification && info.length > 0) {
    db.exec('DROP TABLE vehicles');
  }
  db.exec(`
    CREATE TABLE IF NOT EXISTS vehicles (
      inv_id INTEGER PRIMARY KEY,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      price INTEGER NOT NULL,
      mileage INTEGER NOT NULL,
      mpg TEXT,
      extColor TEXT,
      intColor TEXT,
      fuelType TEXT,
      drivetrain TEXT,
      transmission TEXT,
      vin TEXT,
      image TEXT,
      description TEXT,
      classification TEXT
    );
  `);

  const count = db.prepare('SELECT COUNT(*) AS c FROM vehicles').get().c;
  if (count === 0) {
    const insert = db.prepare(`
      INSERT INTO vehicles (
        inv_id, make, model, year, price, mileage, mpg, extColor, intColor,
        fuelType, drivetrain, transmission, vin, image, description, classification
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insert.run(
      1, 'DMC', 'Delorean', 1981, 16999, 74750, '29/37', 'Grey', 'Black',
      'Gasoline', 'Rear Wheel Drive', 'Manual', 'DMC1234567890', '/images/delorean.jpg',
      'Stainless steel body with gull-wing doors. A cult classic with futuristic style.', 'custom'
    );
    insert.run(
      2, 'Nissan', 'Sentra SV', 2019, 16999, 74750, '29/37', 'Silver', 'Black',
      'Gasoline', 'Front Wheel Drive', 'CVT', 'NSENTRA2019SV', '/images/delorean.jpg',
      'Comfortable commuter with great mpg and modern tech.', 'sedan'
    );
    insert.run(
      3, 'Toyota', 'RAV4', 2020, 23999, 32500, '27/34', 'Blue', 'Gray',
      'Gasoline', 'All Wheel Drive', 'Automatic', 'TRAV42020', '/images/delorean.jpg',
      'Versatile SUV with safety features and space for the family.', 'suv'
    );
    insert.run(
      4, 'Ford', 'F-150', 2018, 27999, 60500, '20/26', 'Red', 'Black',
      'Gasoline', 'Four Wheel Drive', 'Automatic', 'FF1502018', '/images/delorean.jpg',
      'Capable truck with towing power and comfortable interior.', 'truck'
    );
    insert.run(
      5, 'Honda', 'Civic LX', 2021, 19999, 25200, '32/42', 'Blue', 'Gray',
      'Gasoline', 'Front Wheel Drive', 'CVT', 'HCIVIC2021LX', '/images/delorean.jpg',
      'Reliable compact with advanced safety features and excellent fuel economy.', 'sedan'
    );
    insert.run(
      6, 'Chevrolet', 'Silverado 1500', 2019, 34999, 48000, '18/24', 'White', 'Black',
      'Gasoline', 'Four Wheel Drive', 'Automatic', 'CSILV1500', '/images/delorean.jpg',
      'Strong towing capacity, durable bed, and comfortable crew cab layout.', 'truck'
    );
    insert.run(
      7, 'Toyota', 'Prius', 2022, 22999, 21000, '54/50', 'Green', 'Beige',
      'Hybrid', 'Front Wheel Drive', 'CVT', 'TPRIUS2022', '/images/delorean.jpg',
      'Hybrid efficiency with smooth ride and modern cabin tech.', 'hybrid'
    );
    insert.run(
      8, 'Jeep', 'Wrangler Unlimited', 2020, 31999, 37500, '17/25', 'Gray', 'Black',
      'Gasoline', 'Four Wheel Drive', 'Automatic', 'JWRANGLER2020', '/images/delorean.jpg',
      'Adventure-ready off-road capabilities with removable top and rugged styling.', 'suv'
    );
  }
} catch (e) {
  console.error('Database initialization failed:', e.message);
  db = null;
}

const getDb = () => db;

module.exports = { getDb };
