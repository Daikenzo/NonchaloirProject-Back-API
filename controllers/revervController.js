// Reservation Controllers
const { UniqueConstraintError, ValidationError } = require('sequelize')
const { ReservationModel, UserModel, EventModel } = require("../db/sequelizeSetup");
const { checkIsDefaultValidatorErrorMessage } = require('./errorController');

// Find Reservation
const findAllReservation = (req, res) => {
    ReservationModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des réservations ont été récupérés', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        });
};
// Find Reservation list By Event (with eventId param)
const findAllReservationListByEventParam = (req, res) => {
    EventModel.findOne({ where: {id:req.params.eventId} })
        .then(event => {
            if(!event) { // If Unkown User
                return res.status(404).json({ 
                    message: `L'évènement n'a pas été trouvé.` 
                });
            };
            ReservationModel
            .findAll({ where: {EventId:event.id}})
            .then(result => {
                if(!result) { // If Unkown User
                    return res.status(404).json({ 
                        message: `La liste est vide` 
                    });
                };
                return res.json({ 
                    message: 'La liste des rôles a été récupéré', data: result 
                });
            });
        })
        .catch(error => {
            res.status(500).json({ message: `Une erreur est survenue : ${error}` });
        });
};


// la création dépends  de l'id utilisateur et de l'id du spectacle
// Find One Ticket
const findReservByPk = (req, res) => {
    ReservationModel
        .findByPk(req.params.id)
        .then(result => {
            if(!result){
                // If Unkown Event
                return res.status(404).json({ 
                    message: `L'évènement n'a pas été trouvé.` 
                });
            };
            res.json({ message: `La réservation n°${req.params.id} a été récupéré`, data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        });
};
// Find Reservation By Event
const findReservByPkByEvent = (req, res) => {
    EventModel.findOne({ where: {id:req.params.eventId} })
        .then(event => {
            if(!event) { // If Unkown User
                return res.status(404).json({ 
                    message: `L'évènement n'a pas été trouvé.` 
                });
            };
            ReservationModel
            .findOne({ where: {id:req.params.id, EventId:event.id}})
            .then(result => {
                if(!result) { // If Unkown User
                    return res.status(404).json({ 
                        message: `La réservation n°${req.params.id} n'existe pas ou est attribué a un autre évènement`
                    });
                };
                return res.json({ 
                    message: `La réservation n°${req.params.id} de l'évènement ${event.id} a été récupéré`, data: result 
                });
            });
        })
        .catch(error => {
            res.status(500).json({ message: `Une erreur est survenue : ${error}` });
        });
};

/*
SELECT TicketId, Libelle, UserId, EventId
from Reservations
 */

/*Cas de figure
    Cas 1: Un utilisateur peut commander plusieurs réservation pour un ou plisueurs spectacle
    cas 2: Un utilisateur peut commander une ou plusieurs place pour un même spectacle (dans la limite des place disponible)
*/
// Create Ticket
const createReservation = (req, res) =>{
    UserModel.findOne({ where: {username:req.username} })
    .then(user => {
        if(!user) { // If Unkown User
            return res.status(404).json({ 
                message: `L'utilisateur n'a pas été trouvé.` 
            });
        };
        const eventIdParam = req.params.eventId || null
        const eventId = !eventIdParam? (req.body.EventId || req.body.eventId) : eventIdParam
        const UserId = req.body.UserId? req.body.UserId : user.id
        return EventModel
        .findOne({ where: {id:eventId}, include:ReservationModel })
        .then(event => {
            if(!event){
                // If Unkown Event
                return res.status(404).json({ 
                    message: `L'évènement n'a pas été trouvé.` 
                });
            };
            // Check is roleName exist from this event id
            const checkExistReservLabel = event.Reservations.filter( (arr) => arr.dataValues.label === req.body.label)
            if(checkExistReservLabel.length !== 0){
                return res.status(400).json({
                    message:`Cette étiquette de place est déjà défini`
                });
            };
            // Create Reservation
            let payment = req.body.paymentState? paymentState : "Unpaid";
            if (payment === null || payment !== "Unpaid" || payment !=="Paid"){
                payment = "Unpaid"
            }
            return ReservationModel.create({
                ...req.body, UserId: UserId, EventId:event.id, paymentState:payment
            })
            .then(result =>{
                // Success
                res.status(201).json({
                    message: `Réservation Effectué`,
                    data: result
                });
            });
        })
        .catch(error =>{

            res.status(400).json({
                message:error.message
            })
        })
    })
    .catch(error => {
        // console.log(error)
        if (error instanceof ValidationError) {
            checkIsDefaultValidatorErrorMessage(error);
            // Return Error 400
            return res.status(400).json({ 
                message: `${error.message}` 
            });
          }
        res.status(500).json({ message: error })
    });
};

// Update
const updateReservation = (req, res) =>{
    ReservationModel.findOne({ where: { username: req.username } })
    .then(reservation =>{
        if(!reservation) { // If Unkown User
            return res.status(404).json({ 
                message: `Aucune réservation n'a pas été trouvé.` 
            });
        };
        // Set New Body Data
        const reqData = req.body;
        let payment = req.body.paymentState? req.body.paymentState : "Unpaid";
            if (payment === null || payment !== "Unpaid" || payment !=="Paid"){
                payment = reservation.paymentState
            }
        const NewReservData = {
            ...reservation,
            UserId: reservation.UserId, // Block UserId Update
            EventId: reservation.EventId, // Block EventId Update
            label:reservation.label, //req.body.label && req.body.label,
            paymentState: payment
        }
        EventModel.create(NewReservData)
            .then((event)=>{
                res.status(201).json({ 
                    message: `Réservation de l'utilisateur ${event.UserId} pour l'évènement ${event.EventId} modifié.`, 
                    data: event 
                });
            });
    })
    .catch(error => {
        if (error instanceof ValidationError) {
            checkIsDefaultValidatorErrorMessage(error);
            // Return Error 400
            return res.status(400).json({ 
                message: `${error.message}` 
            });
          }
        res.status(500).json({ message: error })
    });
};

// Delete
const deleteReservation = (req, res) =>{
    ReservationModel
    .findByPk(req.params.id)
    .then(result => {
        if (!result) {
            //throw new Error('Aucun coworking trouvé')
            res.status(404).json({ message: `le ticket de contact n'existe pas` })
        } else {
            // If Event is Paid, Return forbiden Responses
            if (result.dataValues.paymentState === "Paid"){
                return res.status(403).json({
                    message:`Impossible de supprimer un ticket dont le paiement a été payé et validé.`
                });
            };
            return result
                .destroy()
                .then(() => {
                    res.json({ 
                        message: `ticket de contact supprimé : ${result.dataValues.id}`, 
                        data: result 
                    });
                });
        };
    })
    .catch(error => {
        res.status(500).json({ message: `${error}` })
    })
};

// Export
module.exports = {
    findAllReservation, findReservByPk, 
    findAllReservationListByEventParam, findReservByPkByEvent,
    createReservation, updateReservation, deleteReservation
};