// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const roleController = require('../controllers/roleController');
// const authController = require('../controllers/authController');

// Router Set
router
    .route('/')
    .get(roleController.findAllroles)



// Export Module
module.exports = router;