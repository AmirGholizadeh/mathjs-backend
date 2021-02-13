const express = require('express');
const authController = require('../controllers/authController');
const reportsController = require('../controllers/reportsController');
const router = express.Router();

router.post('/createAReport', authController.protect, reportsController.createAReport);

module.exports = router;