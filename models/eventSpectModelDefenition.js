const { DATEONLY, DATE, NOW } = require("sequelize");

// Event / Spetacles Model Defenition
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le nom ne peut pas être vide'
                }
            }
        },
        type:DataTypes.STRING,
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        eventDate: {
            type:DataTypes.DATE,
            defaultValue: sequelize.NOW,
            validate:{
                isDate:{
                    args:true,
                    msg:"veuillez entrez une date valide."
                }
            }
        },
        creationDate: {
            type:DataTypes.DATEONLY,
            defaultValue: this.eventDate,
            validate:{
                isDate:{
                    args:true,
                    msg:"veuillez entrez une date valide."
                }
            }
        },
        price:{
            type:DataTypes.JSON,
            validate:{
                isPriceValid(value) {
                    // Le prix doit être avoir au minimum
                    if (value.hasOwnProperty('normal') && value.hasOwnProperty('adherent') && value.hasOwnProperty('junior')) {
                        if (value.normal === null || (value.adherent === null && value.junior === null)) {
                            throw new Error('Au moins le prix standard doit être renseigné');
                        };
                    } else {
                        throw new Error('La syntaxe des données est incorrecte.');
                    };
                }
            }
        },
        localAdress:{
            type:DataTypes.JSON
        },
        localContactName:DataTypes.STRING,
        localContactMail:{
            type:DataTypes.STRING,
            validate:{
                isEmail:{
                    args:true,
                    msg:"Veuillez entrez une adresse email valide"
                }
            }
        },
        localContactPhone:{
            type:DataTypes.DECIMAL(10,0)
        }
    },{
        updatedAt: false
    });
};