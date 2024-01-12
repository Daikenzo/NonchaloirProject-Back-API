// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const eventCtr = require('../controllers/eventController');
const reservCtr = require('../controllers/revervController');
const authCtr = require('../controllers/authController');
const { EventModel } = require('../db/sequelizeSetup');

// Router Set
router
    .route('/')
    .get(authCtr.protect, authCtr.restrictTo("Admin"), reservCtr.findAllReservation)

router
    .route('/:id')
    .get(authCtr.protect, authCtr.restrictTo("Admin"), reservCtr.findReservByPk)
    .post(authCtr.protect, authCtr.restrictTo("User"),authCtr.restrictToOwnUser(EventModel), reservCtr.createReservation)
    .put(authCtr.protect, authCtr.restrictToOwnUser(EventModel), reservCtr.updateReservation)
    .delete(authCtr.protect, authCtr.restrictTo("Admin"), authCtr.restrictToOwnUser(EventModel), eventCtr.deleteEvent)


// Export Module
module.exports = router;