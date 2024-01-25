// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const eventCtr = require('../controllers/eventController');
const ActRoleCtr = require('../controllers/evActorRoleController');
const reservCtr = require('../controllers/revervController');
const authCtr = require('../controllers/authController');
const { EventModel } = require('../db/sequelizeSetup');

// Router Set
router
    .route('/')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), eventCtr.findAllEvents)
    .post(authCtr.protect, authCtr.restrictTo("Editor"), eventCtr.createEvent)

router
    .route('/:id')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), eventCtr.findEventByPk)
    .put(authCtr.protect, authCtr.restrictToOwnUser(EventModel), eventCtr.updateEvent)
    .delete(authCtr.protect, authCtr.restrictTo("Admin"), eventCtr.deleteEvent)
router
    .route('/:eventId/actor')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), eventCtr.findAllActRoleListByEvent)
router
    .route('/:eventId/actor/:id')
    .post(authCtr.protect, authCtr.restrictTo("Editor"), ActRoleCtr.createActRole)
router
    .route('/:eventId/reservation')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), reservCtr.findAllReservationListByEventParam)
router
    .route('/:eventId/reservation/:id')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), reservCtr.findReservByPkByEvent)
    .post(authCtr.protect,authCtr.restrictToOwnUser(EventModel), reservCtr.createReservation)

// Export Module
module.exports = router;