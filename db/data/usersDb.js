// Users List Init
// Init & Import
const {DATEONLY} = require("sequelize");

const usersDefault = [
    {
        email:`contact@nonch.com`,
        username: 'Root',
        firstname:'Admin',
        adress:{
            "number":"86",
            "street":"Impasse d'ochon - Château D'ochon, porte 4",
            "postCode":66400,
            "city":"Milan de dignan"
        },
        phone: "0100123520",
        password: "Root",
        roles: "Admin"
    },
    {
        firstname: "Anais",
        lastname:"Sanchez",
        email: "anais.sanchez@nonch.com",
        phone: "0650123520",
        adress:{"number":"86", "street":"Impasse d'ochon - Château D'ochon, porte 4", "postCode":66400, "city":"Milan de dignan"},
        password: "mdp",
        roles:"Admin"
    },
    {
        firstname: "Jean",
        lastname: "Martin",
        email:"webmaster@nonch.com",
        password: "mdp",
        roles:"Editor"
    },
    {
        firstname: "Tintin",
        lastname:"Mikado",
        email: "tintin.mika@nonch.com",
        phone: "0100123520",
        adress:{"number":"12", "street":"Rue des Dupont hergé", "postCode":34600, "city":"Moulassard"},
        password: "t1ntin€tMil0u",
        roles:"Editor"
    },
    {
        firstname: "Louis",
        lastname: "Dupond",
        email: "louis.dupond@textmail.com",
        phone: "0642349812",
        adress:{"number":"12", "street":"Rue des Dupont hergé", "postCode":34600, "city":"Moulassard"},
        password: "t1ntin€tMil0u",
        birthday: new DATEONLY('1992-11-22')
    }
]

module.exports = usersDefault;