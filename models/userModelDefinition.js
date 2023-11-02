// User Model defenition
// Init Date 
// const {DATE} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users_test', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: `L'utilisateur est déjà pris`
            },
            allowNull: false,
            validate: {
                notNull: {
                    msg: `Il faut un nom d'utilisateur`
                },
                notEmpty: {
                    msg: `Le nom d'utilisateur ne peut pas être vide`
                }
            }
        },
        password: DataTypes.STRING,
        firstName:{
            type: DataTypes.STRING,
            validate: {
            }
        },
        lastName:{
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
        createdAt: false
    })
}
