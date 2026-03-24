const express = require('express');
const router = express.Router();
const { throwServerError } = require('../controllers/errorController');

router.get('/test', throwServerError);

module.exports = router;
