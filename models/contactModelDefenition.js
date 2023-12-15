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
                isAlpha:true,
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
                isAlpha:true,
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
                    msg:"Le Nom ne peut pas être vide"
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
        sendermessage:{
            type:DataTypes.BLOB('medium'),
            allowNull:false,
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Le Nom ne peut pas être vide"
                },
                notNull:{
                    args:true,
                    msg:"Le Nom ne peut pas être vide"
                }
            }
        }
    },{
        updatedAt: false
    });
};