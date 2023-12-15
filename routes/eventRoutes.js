// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const eventCtr = require('../controllers/eventController');
 const authCtr = require('../controllers/authController');

// Router Set
router
    .route('/')
    .get(eventCtr.findAllEvents)
    .post(eventCtr.createEvent)

router
    .route('/:id')
    .get(eventCtr.findEventByPk)


// Export Module
module.exports = router;