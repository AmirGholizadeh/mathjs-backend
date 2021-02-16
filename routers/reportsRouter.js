const express = require('express');
const authController  = require('../controllers/authController');
const reportsController  = require('../controllers/reportsController');

const router = express.Router();

router.use(authController.protect, authController.restrict(['manager']));


router.post("/getReports/:page", reportsController.getReports);
router.post('/getIndividualReports/:id',reportsController.getIndividualReports);

module.exports = router;