const { getVehicleById, getVehiclesByClassification } = require('../models/inventory-model');
const { vehicleDetailHTML, classificationGridHTML } = require('../utilities');

const buildDetail = (req, res, next) => {
  try {
    const { inv_id } = req.params;
    const vehicle = getVehicleById(inv_id);
    if (!vehicle) {
      const err = new Error('Vehicle not found');
      err.status = 404;
      throw err;
    }
    const vehicleMarkup = vehicleDetailHTML(vehicle);
    res.render('inventory/detail', {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicleMarkup
    });
  } catch (e) {
    next(e);
  }
};

const buildClassification = (req, res, next) => {
  try {
    const { type } = req.params;
    const key = String(type).toLowerCase();
    const list = getVehiclesByClassification(key);
    if (!list || list.length === 0) {
      const err = new Error('No vehicles found for classification');
      err.status = 404;
      throw err;
    }
    const classificationMarkup = classificationGridHTML(list);
    res.render('inventory/classification', {
      title: `${key.charAt(0).toUpperCase() + key.slice(1)} Vehicles`,
      classificationMarkup
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { buildDetail, buildClassification };
