const express= require('express');
const authController = require('../controllers/authController');
const replyController = require('../controllers/replyController');

const router = express.Router();

router.post('/sendAReply/:id', authController.protect, replyController.sendAReply);

module.exports = router;