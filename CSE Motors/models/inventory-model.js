const { getDb } = require('../data/db');

const getFallbackAll = () => [
  {
    inv_id: 1,
    make: 'DMC',
    model: 'Delorean',
    year: 1981,
    price: 16999,
    mileage: 74750,
    mpg: '29/37',
    extColor: 'Grey',
    intColor: 'Black',
    fuelType: 'Gasoline',
    drivetrain: 'Rear Wheel Drive',
    transmission: 'Manual',
    vin: 'DMC1234567890',
    image: '/images/delorean.jpg',
    description:
      'Stainless steel body with gull-wing doors. A cult classic with futuristic style.',
    classification: 'custom'
  },
  {
    inv_id: 2,
    make: 'Nissan',
    model: 'Sentra SV',
    year: 2019,
    price: 16999,
    mileage: 74750,
    mpg: '29/37',
    extColor: 'Silver',
    intColor: 'Black',
    fuelType: 'Gasoline',
    drivetrain: 'Front Wheel Drive',
    transmission: 'CVT',
    vin: 'NSENTRA2019SV',
    image: '/images/delorean.jpg',
    description:
      'Comfortable commuter with great mpg and modern tech.',
    classification: 'sedan'
  },
  {
    inv_id: 3,
    make: 'Toyota',
    model: 'RAV4',
    year: 2020,
    price: 23999,
    mileage: 32500,
    mpg: '27/34',
    extColor: 'Blue',
    intColor: 'Gray',
    fuelType: 'Gasoline',
    drivetrain: 'All Wheel Drive',
    transmission: 'Automatic',
    vin: 'TRAV42020',
    image: '/images/delorean.jpg',
    description:
      'Versatile SUV with safety features and space for the family.',
    classification: 'suv'
  },
  {
    inv_id: 4,
    make: 'Ford',
    model: 'F-150',
    year: 2018,
    price: 27999,
    mileage: 60500,
    mpg: '20/26',
    extColor: 'Red',
    intColor: 'Black',
    fuelType: 'Gasoline',
    drivetrain: 'Four Wheel Drive',
    transmission: 'Automatic',
    vin: 'FF1502018',
    image: '/images/delorean.jpg',
    description:
      'Capable truck with towing power and comfortable interior.',
    classification: 'truck'
  },
  {
    inv_id: 5,
    make: 'Honda',
    model: 'Civic LX',
    year: 2021,
    price: 19999,
    mileage: 25200,
    mpg: '32/42',
    extColor: 'Blue',
    intColor: 'Gray',
    fuelType: 'Gasoline',
    drivetrain: 'Front Wheel Drive',
    transmission: 'CVT',
    vin: 'HCIVIC2021LX',
    image: '/images/delorean.jpg',
    description:
      'Reliable compact with advanced safety features and excellent fuel economy.',
    classification: 'sedan'
  },
  {
    inv_id: 6,
    make: 'Chevrolet',
    model: 'Silverado 1500',
    year: 2019,
    price: 34999,
    mileage: 48000,
    mpg: '18/24',
    extColor: 'White',
    intColor: 'Black',
    fuelType: 'Gasoline',
    drivetrain: 'Four Wheel Drive',
    transmission: 'Automatic',
    vin: 'CSILV1500',
    image: '/images/delorean.jpg',
    description:
      'Strong towing capacity, durable bed, and comfortable crew cab layout.',
    classification: 'truck'
  },
  {
    inv_id: 7,
    make: 'Toyota',
    model: 'Prius',
    year: 2022,
    price: 22999,
    mileage: 21000,
    mpg: '54/50',
    extColor: 'Green',
    intColor: 'Beige',
    fuelType: 'Hybrid',
    drivetrain: 'Front Wheel Drive',
    transmission: 'CVT',
    vin: 'TPRIUS2022',
    image: '/images/delorean.jpg',
    description:
      'Hybrid efficiency with smooth ride and modern cabin tech.',
    classification: 'hybrid'
  },
  {
    inv_id: 8,
    make: 'Jeep',
    model: 'Wrangler Unlimited',
    year: 2020,
    price: 31999,
    mileage: 37500,
    mpg: '17/25',
    extColor: 'Gray',
    intColor: 'Black',
    fuelType: 'Gasoline',
    drivetrain: 'Four Wheel Drive',
    transmission: 'Automatic',
    vin: 'JWRANGLER2020',
    image: '/images/delorean.jpg',
    description:
      'Adventure-ready off-road capabilities with removable top and rugged styling.',
    classification: 'suv'
  }
];

const getVehicleById = (id) => {
  const db = getDb();
  if (db) {
    const stmt = db.prepare(
      'SELECT * FROM vehicles WHERE inv_id = ?'
    );
    const row = stmt.get(id);
    return row || null;
  }
  const vehicles = getFallbackAll();
  return vehicles.find((v) => String(v.inv_id) === String(id)) || null;
};

const getVehiclesByClassification = (classification) => {
  const db = getDb();
  if (db) {
    const stmt = db.prepare(
      'SELECT * FROM vehicles WHERE classification = ?'
    );
    const rows = stmt.all(String(classification).toLowerCase());
    return rows || [];
  }
  const all = getFallbackAll();
  const key = String(classification).toLowerCase();
  return all.filter((v) => v.classification === key);
};

const getClassifications = () => {
  try {
    const db = getDb();
    if (db) {
      const rows = db.prepare('SELECT DISTINCT classification FROM vehicles').all();
      if (rows.length > 0) {
        return rows.map((r) => String(r.classification));
      }
    }
  } catch (e) {
    console.error('DB getClassifications failed, falling back:', e.message);
  }
  const all = getFallbackAll();
  const set = new Set(all.map((v) => v.classification));
  return Array.from(set);
};

module.exports = { getVehicleById, getVehiclesByClassification, getClassifications };
