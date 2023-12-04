const { DATE } = require("sequelize");

// Contact FormData Model Defenition
module.exports = (sequelize, DataTypes) => {
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
                    msg:"L'email ne peux pas être vide"
                },
                notNull:{
                    args:true,
                    msg:"Le Nom ne peut pas être vide"
                }
            }
        },
        senderPhone:{
            type:DataTypes.DECIMAL(10,0),
            validate:{
                isNumber:true,
                min:0
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