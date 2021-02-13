const express = require('express');
const authController = require('../controllers/authController');
const ticketsController = require('../controllers/ticketsController');

const router = express.Router();

router.use(authController.protect);

router.post('/sendTicket', ticketsController.createATicket);

router.use(authController.restrict(['manager', 'admin']));
router.post('/getTickets', ticketsController.getTickets);
router.post('/closeTicket/:id', ticketsController.closeTicket);

module.exports = router;