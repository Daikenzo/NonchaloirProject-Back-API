// Import & Init
const { checkIsDefaultValidatorErrorMessage } = require("./errorController");
const { ValidationError } = require('sequelize');
const { UserModel, EventModel } = require('../db/sequelizeSetup');
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
    // Verif Valid User
    UserModel.findOne({ where: { username: req.username } })
    .then(user => {
        if (!user) { // If Unkown User
            return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
        }
        // Set Event Data
        const reqData = req.body;
        const newEvent = {
            UserId:user.id,
            name:reqData.name,
            eventDate:reqData.eventDate,
            creationDate:reqData.creationDate,
            description:reqData.description,
            type:reqData.type?reqData.type : "Spectacles",
            price:reqData.price,
            localAdress:reqData.adress,
            localContactName:reqData.contact.name,
            localContactMail:reqData.contact.email,
            localContactPhone:reqData.contact.phone
        };
        // Set Default Value
        if (newEvent.price.normal){ // Price Value
            if(newEvent.price.adherent === null) newEvent.price.adherent = 0;
            if(newEvent.price.group === null) newEvent.price.group = 10;
            if(!newEvent.price.student && newEvent.price.junior === null) newEvent.price.junior = 8;
            if(newEvent.price.student=== null && !newEvent.price.junior) newEvent.price.student = 8;
        };
        // Create Into database
        EventModel.create(newEvent)
            .then((event)=>{
                res.status(201).json({ message: `L'évènement a bien été ajouté.`, data: event })
            })
            .catch((error) => {
                // Redirect Error
                if (error instanceof ValidationError) { 
                  checkIsDefaultValidatorErrorMessage(error);
                  // Return Error 400
                  return res.status(400).json({ message: `${error.message}` });
                }
                res.status(500).json({ message: `L'évènement n'a pas pu être crée`, data: error.message })
            })
    })
    .catch((error) => { // Default Error
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
const createEventWithImage = (req, res) => {
    
};

// Update
const updateEvent = (req, res) =>{
    // Init
    console.log("updateEvent");
}
// Delete
const deleteEvent = (req, res) =>{
    // Init
    console.log("deleteEvent");
}
// Export
module.exports = {findAllEvents, findEventByPk, createEvent, updateEvent, deleteEvent}