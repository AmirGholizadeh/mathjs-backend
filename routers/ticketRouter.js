const express = require('express');
const authController = require('../controllers/authController');
const ticketsController = require('../controllers/ticketsController');

const router = express.Router();

router.use(authController.protect);

router.post('/sendTicket', ticketsController.createATicket);

router.use(authController.restrict(['manager', 'admin']));
router.get('/getTickets', ticketsController.getTickets);

module.exports = router;