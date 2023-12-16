const { DATE } = require("sequelize");
const { UserModel, ContactModel } = require("../db/sequelizeSetup");

// Contact FormData Model Defenition
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('contactFormList', {
        UserId: {
            type: DataTypes.INTEGER,
            reference:{
                model:UserModel,
                key:'id'
            }
        },
        contactTicketId:{
            type:DataTypes.INTEGER,
            reference:{
                model:ContactModel,
                key:'id'
            }
        }

    },{
        updatedAt: false
    });
};