// Import & Init
const { checkIsDefaultValidatorErrorMessage } = require("./errorController");
const { ValidationError } = require('sequelize');
const { EventModel } = require('../db/sequelizeSetup');
const bcrypt = require('bcrypt');

// Find Event
const findAllEvents = (req, res) => {
    EventModel
        .findAll()//{ include: ReviewModel })
        .then(result => {
            res.json({ message: 'La liste des Évènements/Spectables a bien été récupérée.', data: result });
        })
        .catch(error => {
            res.status(500).json({ message: error });
        })
}

const findEventByPk = (req, res) => {
    EventModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: `L'élément ayant pour id ${req.params.id} n'existe pas.` });
            } else {
                res.json({ message: `L'élément a bien été récupéré.`, data: result });
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Une erreur est survenue : ${error}` });
        });
};

const createEvent = (req, res) => {
    const newEvent = req.body;
    // Set
    EventModel
        .create({
            name:newEvent.name,
            eventDate:newEvent.eventDate,
            createAt:newEvent.creationDate,
        })
};

// Export
module.exports = {findAllEvents, findEventByPk, createEvent}