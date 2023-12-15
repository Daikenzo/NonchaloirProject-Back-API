// Import & Init
const { checkIsDefaultValidatorErrorMessage } = require("./errorController");
const { ValidationError } = require('sequelize');
const { EventModel } = require('../db/sequelizeSetup');
const bcrypt = require('bcrypt');
const { defaultSaltRound } = require("../configs/secureConfig");

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
// Create
const createEvent = (req, res) => {
    // Init
    const newEvent = req.body;
    // Set
    const checkPrice = (priceList) =>{
    };
    console.log(checkPrice)

    EventModel
        .create({
            name:newEvent.name,
            eventDate:newEvent.eventDate,
            description:newEvent.description,
            type:newEvent.type?newEvent.type : "Spectacles",
            price:newEvent.price,
            creationDate:newEvent.creationDate,
            localAdress:newEvent.adress,
            localContactName:newEvent.contact.name,
            localContactMail:newEvent.contact.email,
            localContactPhone:newEvent.contact.phone

        })
        .then((result) => {
            res.status(201).json({ message: `L'évènement a bien été ajouté.`, data: result })
        })
        .catch((error) => {
            // Redirect Error
            if (error instanceof ValidationError) {
              checkIsDefaultValidatorErrorMessage(error);
              // Return Error 400
              return res.status(400).json({ message: `${error.message}` });
            }
            // Default Error
            res.status(500).json({ message: `Une erreur est survenue :  ${error}` })
        })
};
// Update

// Delete

// Export
module.exports = {findAllEvents, findEventByPk, createEvent}