// Contact FormData Model Defenition
module.exports = (sequelize, Datatypes) => {
    return sequelize.define('contactform', {
        id: {
            type:DataTypes.INTEGER,
            primarykey: true,
            autoincrement:true
        },
        senderFirstName:{
            type:DataTypes.STRING,
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
        updatedAt: false,
        createdAt: new Date()
    });
};