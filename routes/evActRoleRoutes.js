// Init Express Router
const express = require('express');
const router = express.Router();
// Init Conthrollers
const eventCtr = require('../controllers/eventController');
const ActRoleCtr = require('../controllers/evActorRoleController');
const authCtr = require('../controllers/authController');
const { EventModel, UserModel } = require('../db/sequelizeSetup');

// Router Set
router
    .route('/')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), ActRoleCtr.findAllActRoles)
    // .delete(authCtr.protect, authCtr.restrictTo("Admin"), ActRoleCtr.deleteAllActRoles)

router
    .route('/:id')
    .get(authCtr.protect, authCtr.restrictTo("Editor"), ActRoleCtr.findActRoleByPk)
    .post(authCtr.protect, authCtr.restrictTo("Editor"), ActRoleCtr.createActRole)
    // .put(authCtr.protect, authCtr.restrictToOwnUser(EventModel), ActRoleCtr.updateActRole)
    // .delete(authCtr.protect, authCtr.restrictTo("Editor"), ActRoleCtr.deleteActRole)


// Export Module
module.exports = router;