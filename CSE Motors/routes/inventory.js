const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventoryController');

router.get('/detail/:inv_id', invController.buildDetail);
router.get('/classification/:type', invController.buildClassification);

module.exports = router; 
