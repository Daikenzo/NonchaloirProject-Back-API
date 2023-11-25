// Init
const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserModel } = require('../db/sequelize')
const bcrypt = require('bcrypt')
// Check User (All)
exports.findAllUsers = (req, res) => {
    console.log(UserModel);
    UserModel.scope('withoutPassword')
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des utilisateurs a bien été récupérée.', data: result })
        })
        .catch(error => {
            // Internal Error
            res.status(500).json({ message: error })
        });
};
// Update / Put User
exports.updateUser = (req, res) => {
    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Aucun utilisateur trouvé' })
            } else {
                return bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const dataUser = { ...req.body, password: hash }
                        return result
                            .update(dataUser)
                            .then(() => {
                                res.json({ message: `Utilisateur modifié : ${result.dataValues.id} `, 
                                data: result })
                            })
                    });
            };
        })
        .catch(error => {
            // Duplicate Value Error
            if (error instanceof ValidationError) {
                console.log(error)
                if (error instanceof UniqueConstraintError){
                  error.message = error.message + ": l'utilisateur est déjà présent"
                }
                return res.status(400).json({ message: `${error.message}` });
              }
            // Internal Error
            res.status(500).json({ message: error.message })
        });
};
// Delete User
exports.deleteUser = (req, res) => {
    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Aucun utilisateur trouvé' })
            } else {
                return result
                    .destroy()
                    .then(() => {
                        result.password = 'hidden'
                        res.json({ message: `utilisateur supprimé : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            // Internal Error
            res.status(500).json({ message: `${error}` })
        });
};