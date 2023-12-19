const { DATE } = require("sequelize");

// Contact FormData Model Defenition
module.exports = (sequelize, DataTypes) => {
    // Phone Regex (European)
    const phoneExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g; 
    return sequelize.define('contact', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        senderFirstName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    args:true,
                    msg:"Le Prénom ne peut pas être vide"
                }
            }
        },
        senderLastName:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    args:true,
                    msg:"Le Nom ne peut pas être vide"
                }
            }
        },
        senderEmail:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:{
                    args:true,
                    msg:"Veuillez entrez un email valide"
                },
                notNull:{
                    args:true,
                    msg:"L'adresse mail'ne peut pas être vide"
                }
            }
        },
        senderPhone: {
            type:DataTypes.STRING,
            validate:{
                is:{
                    args:phoneExp,
                    msg:"vous devez respecter le format de téléphone européen"
                }
            }
        },
        senderAdress:{
            type:DataTypes.JSON
        },
        subjectMessage:{
            type:DataTypes.TEXT,
            allowNull:false,
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Le ne champ ne peux pas être vide"
                },
                notNull:{
                    args:true,
                    msg:"Le message ne peut pas être vide"
                }
            }
        },
        statusState:{
            type:DataTypes.ENUM,
            values: ['Progress','Valided', 'Deleted'],
            defaultValue:'Progress'
        }

    },{
        updatedAt: false
    });
};