// Reservation Controllers
const { UniqueConstraintError, ValidationError } = require('sequelize')
const { ReservationModel } = require("../db/sequelizeSetup")

// Find Reservation
const findAllReservation = (req, res) => {
    ReservationModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des réservations ont été récupérés', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

// Export
module.exports = {findAllReservation};