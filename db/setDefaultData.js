// Import function
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
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
            // Get Admin User
            await RoleModel.findOne({ where: { label: 'Admin' } })
                .then(async role => {
                    // Get All Admin from userDb
                    const adminUser = usersDb.filter(user =>{
                        return user.roles == role.label
                    });
                    // Create User
                    adminUser.forEach(user =>{
                        const psw = user.password? user.password : 'mdp';
                        return bcrypt.hash(psw, 10)
                            .then(hash =>{
                                return UserModel.create({
                                    email:user.email,
                                    firstname:user.firstname,
                                    lastname:user.lastname,
                                    username:user.username? user.username : user.email,
                                    adress:user.adress,
                                    phone:user.phone,
                                    birthday:user.birthday,
                                    password:hash,
                                    RoleId:role.id
                                });
                            })
                            .catch((error) =>{
                                console.error({Error : error.message}, 400)
                            });
                    });
                }),
            // Get Editor Users
            await RoleModel.findOne({ where: { label: 'Editor' } })
                .then(async role => {
                    // Get All Admin from userDb
                    const editorUser = usersDb.filter(user =>{
                        return user.roles == role.label
                    });
                    // Create User
                    editorUser.forEach(user =>{
                        const psw = user.password? user.password : 'mdp';
                        return bcrypt.hash(psw, 10)
                            .then(hash =>{
                                return UserModel.create({
                                    email:user.email,
                                    firstname:user.firstname,
                                    lastname:user.lastname,
                                    username:user.username? user.username : user.email,
                                    adress:user.adress,
                                    phone:user.phone,
                                    birthday:user.birthday,
                                    password:hash,
                                    RoleId:role.id
                                });
                            })
                            .catch((error) =>{
                                console.error({Error : error.message}, 400)
                            });
                    });
                }),
            // Get All Users
            await RoleModel.findOne()
                .then(async role => {
                    // Get All Admin from userDb
                    const regularUser = usersDb.filter(user =>{
                        return (user.roles !== "Admin" && user.roles !== "Editor")
                    });
                    // Create User
                    regularUser.forEach(user =>{
                        const psw = user.password? user.password : 'mdp';
                        return bcrypt.hash(psw, 10)
                            .then(hash =>{
                                return UserModel.create({
                                    email:user.email,
                                    firstname:user.firstname,
                                    lastname:user.lastname,
                                    username:user.username? user.username : user.email,
                                    adress:user.adress,
                                    phone:user.phone,
                                    birthday:user.birthday,
                                    password:hash,
                                    RoleId:role.id
                                });
                            })
                            .catch((error) =>{
                                console.error({Error : error.message}, 400)
                            });
                    });
                })
        );

        
            
    });
    
};