// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const userController = require('../controllers/userController');
// const authController = require('../controllers/authController');

// Router Set
router.route('/').get(userController.findAllUsers)


// Export Module
module.exports = router