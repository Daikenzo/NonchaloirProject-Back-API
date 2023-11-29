// User Model defenition

module.exports = (sequelize, DataTypes) => {
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
                args: ['uniqueKey'],
                msg: 'Un utilisateur déjà existant possède cette email.'
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
        username:DataTypes.STRING,
        firstname:{
            type: DataTypes.STRING,
            validate: {
            }
        },
        lastname:{
            type: DataTypes.STRING
        },
        phone: {
            type:DataTypes.INTEGER
        },
        adress:{
            type:DataTypes.STRING
        },
        birthday:{
            type:DataTypes.STRING
        }
    }, {
        scopes: {
            withoutPassword: {
                attributes: { exclude: ['password'] }
            }
        },
        fields:{
            uniqueMsg: "fff"
        }
    },
    {
        updatedAt: false,
        createdAt: new Date()
    })
}
