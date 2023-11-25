// Users List Init
// Init & Import
const {DATEONLY} = require("sequelize");

const usersDefault = [
    {
        firstname: "root",
        email: "contact@nonchaloir.com",
        password:"p@sword$2y$10$6lNNrP",
        phone: "0652634844",
        adress:"16 Impasse d'Ornon - Château D'ornon, porte 4, 33170 Gradignan",
        password: "n@nchAl0iR€",
        roles:5
    },
    {
        firstname: "Jean",
        lastname: "Martin",
        email:"webmaster@nonchaloir.com",
        password: "p@sword5W€b",
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