// Import function
const bcrypt = require('bcrypt');
// Import Data
const roles = require('./data/roles');
const usersDb = require('./data/usersDb');

module.exports = (RoleModel) => {

    // set Roles
    const rolePromises = roles.map(role => {
        return RoleModel.create({
            label: role
        });
    })
}