// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const eventCtr = require('../controllers/eventController');
const authCtr = require('../controllers/authController');
const { EventModel } = require('../db/sequelizeSetup');

// Router Set
router
    .route('/')
    .get(eventCtr.findAllEvents)
    .post(authCtr.protect, authCtr.restrictTo("Editor"), eventCtr.createEvent)

router
    .route('/:id')
    .get(eventCtr.findEventByPk)
    .put(authCtr.protect, authCtr.restrictTo("Editor"), eventCtr.updateEvent)
    .delete(authCtr.protect, authCtr.restrictTo("Admin"), eventCtr.deleteEvent)


// Export Module
module.exports = router;