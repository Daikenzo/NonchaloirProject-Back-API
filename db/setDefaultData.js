// Import function
const bcrypt = require('bcrypt');
// Import Data
const roles = require('./data/roles');
const usersDb = require('./data/usersDb');

// Extra For Security : Get Password decoded from Custom Decode Beaver

module.exports = (RoleModel, UserModel) => {
    // set Roles
    const rolePromises = roles.map(role => {
        return RoleModel.create({
            label: role
        });
    })
    // Set Default User into B  
    Promise.all(rolePromises).then(async () => {
        const userPromises = []
        userPromises.push(
            await RoleModel.findOne({ where: { label: 'Admin' } })
                .then(async role => {
                    return bcrypt.hash('Root', 10)
                        .then(hash => {
                            return UserModel.create({
                                email:`contact@nonch.com`,
                                username: 'Root',
                                firstname:'Admin',
                                adress:"86 Impasse d'ochon - Château D'ochon, porte 4, 664200 Milan de dignan",
                                phone: "0100123520",
                                password: hash,
                                RoleId: role.id
                            })
                        })
                })
        );

        
            
    });
    
};