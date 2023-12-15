// Init
const { checkIsDefaultValidatorErrorMessage } = require("./errorController");
const { ValidationError } = require('sequelize');
const { UserModel } = require('../db/sequelizeSetup');
const bcrypt = require('bcrypt');
const { defaultSaltRound } = require("../configs/secureConfig");
// Check User
const findAllUsers = (req, res) => {
    console.log(UserModel);
    UserModel
        // .scope('withoutPassword')
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des utilisateurs a bien été récupérée.', data: result });
        })
        .catch(error => {
            // Internal Error
            res.status(500).json({ message: error });
        });
};

const findUserByPk = (req, res) => {
    UserModel
        // .scope('withoutPassword')
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Aucun utilisateur trouvé' });
            } else {
            res.json({ message: `L'utilisateur N°${req.params.id} a bien été récupérée.`, data: result });
        }})
        .catch(error => {
            res.status(500).json({ message: error });
        });
};

// Update / Put User
const updateUser = (req, res) => {
    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Aucun utilisateur trouvé' })
            } else {
                return bcrypt.hash(req.body.password, defaultSaltRound)
                    .then(hash => {
                        const dataUser = { ...req.body, password: hash }
                        return result
                            .update(dataUser)
                            .then(() => {
                                res.json({ message: `Utilisateur modifié : ${result.dataValues.id} `, 
                                data: result });
                            });
                    });
            };
        })
        .catch(error => {
            // Redirect Error
            if (error instanceof ValidationError) {
                // check and rename if Default Error Message
                checkIsDefaultValidatorErrorMessage(error);
                // Return Error 400
                return res.status(400).json({ message: `${error.message}` });
            }
            // Internal Error
            res.status(500).json({ message: error.message });
        });
};
// Delete User
const deleteUser = (req, res) => {
    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Aucun utilisateur trouvé' })
            } else {
                return result
                    .destroy()
                    .then(() => {
                        result.password = 'hidden';
                        res.json({ message: `utilisateur supprimé : ${result.dataValues.id} `, data: result });
                    });
            };
        })
        .catch(error => {
            // Internal Error
            res.status(500).json({ message: `${error}` });
        });
};

// Export
module.exports = {findAllUsers, findUserByPk, updateUser, deleteUser};