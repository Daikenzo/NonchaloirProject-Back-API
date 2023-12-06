// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const roleCtr = require('../controllers/roleController');
// const authController = require('../controllers/authController');

// Router Set
router
    .route('/')
    .get(roleCtr.findAllRoles)



// Export Module
module.exports = router;