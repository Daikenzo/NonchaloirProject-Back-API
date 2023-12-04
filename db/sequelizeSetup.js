// Sequelize Function
//Import
const { Sequelize, DataTypes } = require('sequelize');
const { listen, db } = require('../configs/databaseConfig');
const roles = require('./data/roles.json');
const usersDefault = require('./data/usersDb');
const setDefaultData = require('./setDefaultData')

// Data Init
let setDataSample = {roles: roles, users: usersDefault};

// Sequelize Init - Loggin:boolean = Sequelize Log activate
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    port: db.port? db.port : 3306,
    dialect: db.dialect,
    logging:false
});

// Authenticate & Connect Database
sequelize.authenticate()
    .then(() => console.log(
        'La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(
        `Impossible de se connecter à la base de données ${error}`));

// Table Model defenition
const defineRoleModel = require('../models/roleModelDefinition');
const defineContactModel = require('../models/contactModelDefenition');
const defineUserModel = require('../models/userModelDefinition');
const defineEventModel = require('../models/eventSpectModelDefenition');
// Table set
const RoleModel = defineRoleModel(sequelize, DataTypes);
const ContactModel = defineContactModel(sequelize, DataTypes);
const UserModel = defineUserModel(sequelize, DataTypes);
const EventModel = defineEventModel(sequelize,DataTypes);

// Table Jointure
RoleModel.hasMany(UserModel);
UserModel.belongsTo(RoleModel);

// Database Initialisation
const initDb = () => {
    sequelize
        .sync({force: true}) // Sync Data config
        .then(()=>{   //
            setDefaultData(RoleModel, UserModel);
            // console.log('Sequelize ON');
        });
};

// Export Module
module.exports = {
    initDb, sequelize, EventModel, UserModel, RoleModel
};