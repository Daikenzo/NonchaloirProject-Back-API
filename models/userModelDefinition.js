// User Model defenition

module.exports = (sequelize, DataTypes) => {
    // Phone Regex
    const phoneExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g; 
    return sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Un utilisateur déjà existant possède cette email."
            },
            validate: {
                isEmail: {
                    msg: `L'adresse Email doit être valide.`
                },
                notNull: {
                    msg: `L'adresse Email doit être valide.`
                },
                notEmpty: {
                    msg: `L'adresse utilisateur ne peut pas être vide`
                }
            }
        },
        password: DataTypes.STRING,
        username:{
            type:DataTypes.STRING,
            unique: {
                msg: "L'identifiant avec cet Username existe déjà"
            }
        },
        firstname:{
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg:"Le prénom doit être rempli"
                },
                notEmpty: {
                    msg:"Le prénom doit être rempli"
                }
            }
        },
        lastname:{
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg:"Le nom doit être rempli"
                }
            }
        },
        phone: {
            type:DataTypes.STRING,
            validate:{
                is:{
                    args:phoneExp,
                    msg:"vous devez respecter le format de téléphone européen"
                }
            }
        },
        adress:{
            type:DataTypes.JSON,
            validate:{

            }
        },
        birthday:{
            type:DataTypes.DATEONLY,
            defaultValue:DataTypes.NOW
        }
    }, {
        onDelete: 'CASCADE', // Sur un effacement de données, supprimé toutes info en cascade
        defaultScope: { // Default Scope when 
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: { // For Jwt token
                attributes: {}
            }
        }
    },
    {
        updatedAt: false,
        createdAt: new Date()
    });
};
