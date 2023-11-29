// Users List Init
// Init & Import
const {DATEONLY} = require("sequelize");

const usersDefault = [
    {
        firstname: "root",
        email: "contact@nonch.com",
        phone: "0100123520",
        adress:"86 Impasse d'ochon - Château D'ochon, porte 4, 664200 Milan de dignan",
        password: "mdp",
        roles:5
    },
    {
        firstname: "Jean",
        lastname: "Martin",
        email:"webmaster@nonch.com",
        password: "mdp",
        roles:4
    },
    {
        firstname: "Louis",
        lastname: "Dupond",
        email: "louis.dupond@textmail.com",
        phone: "0642349812",
        adress:"12 Rue des Dupont hergé, 34600 Moulassard",
        password: "t1ntin€tMil0u",
        birthday: new DATEONLY('1992-11-22'),
        roles:1
    }
]

module.exports = usersDefault;