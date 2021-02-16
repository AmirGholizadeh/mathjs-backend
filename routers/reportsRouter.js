const express = require('express');
const authController  = require('../controllers/authController');
const reportsController  = require('../controllers/reportsController');

const router = express.Router();

router.use(authController.protect);

router.post("/getReports", authController.restrict(['manager']), reportsController.getReports);

module.exports = router;