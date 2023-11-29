// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// Import Sequelize Model & Middleware for restrict
const { UserModel } = require('../db/sequelize');

// Router Set
router
    .route('/')
    .get(userController.findAllUsers)

router
    .route('/login')
    .post(authController.login)
    
router
    .route('/signup')
    .post(authController.signUp)

router
    .route('/:id')
    .get(userController.findUser)
    .put(authController.protect, authController.restrictToOwnUser(UserModel), userController.updateUser)


// Export Module
module.exports = router;