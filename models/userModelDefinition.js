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
                msg: 'This email is already taken.'
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
        }
    },
    {
        updatedAt: false,
        createdAt: new Date()
    })
}
