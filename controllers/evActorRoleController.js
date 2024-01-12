// Role Model
const { UniqueConstraintError, ValidationError } = require('sequelize')
const { EvRoleActModel } = require("../db/sequelizeSetup")

const findAllRoles = (req, res) => {
    EvRoleActModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des rôles ont été récupéré', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

module.exports = {findAllRoles}