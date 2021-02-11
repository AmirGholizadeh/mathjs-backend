const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login)
router.get('/validateToken/:token', authController.validateToken);
router.post('/editTopScore', authController.protect, userController.editTopScore);
router.get('/getTopUsers/:page', userController.getTopUsers);
router.use(authController.restrict(['manager', 'admin']))
router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getOneUser);

module.exports = router;
