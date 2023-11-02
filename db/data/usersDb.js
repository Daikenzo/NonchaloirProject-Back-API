// Users List Init
// Init & Import
const {DATEONLY} = require("sequelize");

const usersDefault = [
    {
        firstname: "root",
        email: "contact@nonchaloir.com",
        phone: "",
        roles: 4
    },
    {
        firstname: "Louis",
        lastname: "Dupond",
        email: "louis.dupond@textmail.com",
        phone: "0642349812",
        birthday: new DATEONLY('1992-11-22'),
        roles:1
    }
]

module.export = usersDefault;