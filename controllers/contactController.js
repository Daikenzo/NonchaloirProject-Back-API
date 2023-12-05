// Import & Init
const { checkIsDefaultValidatorErrorMessage } = require("./errorController");
const { ValidationError } = require('sequelize');
const { ContactModel } = require('../db/sequelizeSetup');
const bcrypt = require('bcrypt');

// Find Contact
exports.findAllContacts = (req, res) => {
    ContactModel
        .findAll()//{ include: ReviewModel })
        .then(result => {
            res.json({ message: 'La liste des Messages de contact a bien été récupérée.', data: result });
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
};

exports.findContactByPk = (req, res) => {
    ContactModel
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
