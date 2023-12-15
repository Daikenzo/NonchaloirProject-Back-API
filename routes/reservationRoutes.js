// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const eventCtr = require('../controllers/eventController');
const reservCtr = require('../controllers/revervController');
const authCtr = require('../controllers/authController');
// const { EventModel } = require('../db/sequelizeSetup');

// Router Set
router
    .route('/')
    .get(reservCtr.findAllReservation)

router
    .route('/:id')
    // .get(reservCtr.findReservationByPk)
    // .put(authCtr.protect, eventCtr.updateEvent)
    // .delete(authCtr.protect, authCtr.restrictToOwnUser(EventModel), eventCtr.deleteEvent)


// Export Module
module.exports = router;