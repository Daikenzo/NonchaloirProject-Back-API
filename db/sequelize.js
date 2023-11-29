// Sequelize Function
//Import
const { Sequelize, DataTypes } = require('sequelize');
const { listen, db } = require('../configs/databaseConfig');
const roles = require('./data/roles.json');
const usersDefault = require('./data/usersDb');
const setDefaultData = require('./setDefaultData')

// Data Init
let setDataSample = {roles: roles, users: usersDefault};

// Sequelize Init
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    port: db.port? db.port : 3306,
    dialect: db.dialect,
    logging:db.logging ? db.logging : false
});
// Authenticate & Connect Database
sequelize.authenticate()
    .then(() => console.log(
        'La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(
        `Impossible de se connecter à la base de données ${error}`));
// 

// Table Model defenition
const defineUserModel = require('../models/userModelDefinition');
const defineRoleModel = require('../models/roleModelDefinition');
// Table set
const UserModel = defineUserModel(sequelize, DataTypes);
const RoleModel = defineRoleModel(sequelize, DataTypes);

// Table Jointure
RoleModel.hasMany(UserModel)
UserModel.belongsTo(RoleModel)

// Database Initialisation
const initDb = () => {
    sequelize
        .sync({force: true})
        .then(()=>{   //
            setDefaultData(RoleModel);
            // console.log('Sequelize ON');
        });
};

// Export Module
module.exports = {
    initDb, sequelize, UserModel, RoleModel
}