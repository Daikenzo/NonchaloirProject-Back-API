// Sequelize Function
//Import
const { Sequelize, DataTypes } = require('sequelize');
const { listen, niquetoi} = require('../configs/databaseConfig');
const { selectEnvDb } = require('../middleware/dbSwitch/databaseSwitcher');
const setDefaultData = require('./setDefaultData');
// Data Init
const ProcessNodeEnvName = process.env.NODE_ENV || 'devellopement';
const db = selectEnvDb(ProcessNodeEnvName);

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
const defineEventRoleActModel = require("../models/EvActorModelDefenition");
const defineReservationModel = require('../models/reservationModelDefenition');

// Table set
const RoleModel = defineRoleModel(sequelize, DataTypes);
const ContactModel = defineContactModel(sequelize, DataTypes);
const UserModel = defineUserModel(sequelize, DataTypes);
const EventModel = defineEventModel(sequelize,DataTypes);
const EvRoleActModel = defineEventRoleActModel(sequelize,DataTypes);
const ReservationModel = defineReservationModel(sequelize,DataTypes);

// Table Jointure
RoleModel.hasMany(UserModel);
UserModel.belongsTo(RoleModel);

// Join ActorRole items
EventModel.hasMany(EvRoleActModel);
EvRoleActModel.belongsTo(EventModel);

// ContactFormList Table Define (Afaka ContactTicketModel)
UserModel.belongsToMany(ContactModel, { 
    through: 'contactFormList', 
    otherKey:'TitcketId',
    updatedAt:false, createdAt:false
});
ContactModel.belongsToMany(UserModel, { 
    through: 'contactFormList',
    foreignKey:'TitcketId',
    updatedAt:false, createdAt:false
});


// NB: voir pour aide sur ce point
UserModel.hasMany(ReservationModel);
ReservationModel.belongsTo(UserModel);

// Join Reservation Table Into
EventModel.hasMany(ReservationModel);
ReservationModel.belongsTo(EventModel);


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
    initDb, sequelize, EventModel, UserModel, RoleModel, ContactModel, ReservationModel, EvRoleActModel
};