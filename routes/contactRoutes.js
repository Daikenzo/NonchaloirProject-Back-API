// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const contactCtr = require('../controllers/contactController');
const authCtr = require('../controllers/authController');
// const {  } = require('../db/sequelizeSetup');

// Router Set
router
    .route('/')
    .get(contactCtr.findAllContacts)
    // .post(authCtr.protect, authCtr.restrictTo("Editor"), contactCtr.createContactTicket)

router
    .route('/:id')
    .get(contactCtr.findContactByPk)
    // .put(authCtr.protect, eventCtr.updateEvent)
    // .delete(authCtr.protect, authCtr.restrictToOwnUser(EventModel), eventCtr.deleteEvent)


// Export Module
module.exports = router;