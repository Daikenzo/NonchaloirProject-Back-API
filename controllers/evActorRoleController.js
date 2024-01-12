// Role Model
const { UniqueConstraintError, ValidationError, Op } = require('sequelize')
const { EvRoleActModel, EventModel,  } = require("../db/sequelizeSetup")
const { checkIsDefaultValidatorErrorMessage } = require('./errorController')

// Get All List
const findAllActRoles = (req, res) => {
    EvRoleActModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des rôles ont été récupéré', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}
// Get ActRole Item
const findActRoleByPk = (req, res) => {
    EvRoleActModel
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
// Get ActRole List by 
const findAllActRoleListByEvent = (req, res) => {
    EventModel.findOne({ where: {id:req.params.id} })
        .then(event => {
            if(!event) { // If Unkown User
                return res.status(404).json({ 
                    message: `L'évènement n'a pas été trouvé.` 
                });
            };
            EvRoleActModel
            .findAll({ where: {EventId:event.id}, include: EvRoleActModel})
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


// Create Actor Role
const createActRole = (req,res) => {
    // Check if Event is here
    EventModel.findOne({ where: {id: req.body.EventId}, 
        include: EvRoleActModel })
        .then(event => {
            if(!event) { // If Unkown User
                return res.status(404).json({ 
                    message: `L'évènement n'a pas été trouvé.` 
                });
            };
            // Get Info
            const newActRoleForm = {
                EventId:event.id,
                roleName:req.body.role,
                roleActor: req.body.actor
            }
            // Check is roleName exist from this event id
            const checkExistActRoleOfEvent = event.ActorRoleLists.filter( (arr) => arr.dataValues.roleName === newActRoleForm.roleName)
            if(checkExistActRoleOfEvent.length !== 0){
                return res.status(400).json({
                    message:`Le rôle a déjà été défini`
                });
            };

            // Create
            EvRoleActModel.create(newActRoleForm)
            .then(ActorRole =>{
                res.status(201).json({
                    message: `Le Rôle de la pièce a été enregistré`, 
                    data:ActorRole
                });
            })
        })
        .catch(error =>{
        // Redirect Error
        if (error instanceof ValidationError) { 
            checkIsDefaultValidatorErrorMessage(error);
            // Return Error 400
            return res.status(400).json({ message: `${error.message}` });
          }
          res.status(500).json({ message: `une erreur est survenue`, data: error.message });
      });
}

module.exports = {findAllActRoles, findActRoleByPk, createActRole}