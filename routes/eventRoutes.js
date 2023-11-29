// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const eventController = require('../controllers/eventController');
 const authController = require('../controllers/authController');

// Router Set
router
    .route('/')
    .get(eventController.findAllevents)

router
    .route('/:id')
    .get(eventController.findEvent)


// Export Module
module.exports = router;