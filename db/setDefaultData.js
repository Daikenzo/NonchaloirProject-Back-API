// Import function
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
// Import Data
const roles = require('./data/roles');
const usersDb = require('./data/usersDb');
const eventDb = require('./data/eventsDb');

// Extra For Security : Get Password decoded from Custom Decode Beaver

module.exports = (RoleModel, UserModel, ContactModel, EventModel, EvRoleActModel, ReservationModel) => {
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
                        const psw = user.password? user.password : 'admin';
                        return bcrypt.hash(psw, 10)
                            .then(hash =>{
                                return UserModel.create({
                                    ...user, // Get All Exist attribute in object
                                    username:user.username? user.username : user.email,
                                    password:hash,
                                    RoleId:role.id
                                });
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
                                    ...user, // Get All Exist attribute in object
                                    username:user.username? user.username : user.email,
                                    password:hash,
                                    RoleId:role.id
                                });
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
                                    ...user, // Get All Exist attribute in object
                                    username:user.username? user.username : user.email,
                                    password:hash,
                                    RoleId:user.RoleId? user.RoleId : role.id
                                });
                            });
                    });
                })
        ); // Fin user Create
        Promise.all(userPromises)
            .then( async() =>{
                // Create Event
                const eventPromises = eventDb.map(mockEvent =>{
                    return EventModel.create({
                        name:mockEvent.name,
                        type:mockEvent.type || "Spectacle",
                        eventDate:mockEvent.eventDate,
                        creationDate:mockEvent.creationDate? mockEvent.creationDate : Date.now(),
                        price:mockEvent.price || null,
                        localAdress:mockEvent.localAdress || null,
                        localContactName:mockEvent.localContactName || null,
                        localContactMail:mockEvent.localContactEmail || null,
                        localContactPhone:mockEvent.localContactPhone || null,
                        localContactWebsite:mockEvent.localContactWebsite || null,
                        description:mockEvent.description,
                        UserId: 1
                    });
                });
                // Create Event RoleAct List
                Promise.all(eventPromises).then( (events) =>{
                    // console.log(events[0].name)
                    // Actor Role List Database
                    eventDb.map( (mockEvents, EvId) =>{
                        // console.log("eventId",EvId+1) // EventId Number into Database
                        // const eventRoleActs = eventDb.filter( (event, index) =>{
                        //     return eventDb[EvId].actorRole instanceof Object
                        // });
                        if (eventDb[EvId].actorRole instanceof Object){ // Check is ActorList list into EventId (events[EvId].id)
                            const ActorRoleList = eventDb[EvId].actorRole.length > 0 && eventDb[EvId].actorRole
                            // If ActorRole List is undefine, return nothing, else create
                            if(!ActorRoleList){ return false}
                            else {
                                ActorRoleList.map(ActRole =>{
                                    return ( // Create
                                        EvRoleActModel.create({
                                            EventId:events[EvId].id, // Get The real EventId
                                            roleName:ActRole.role,
                                            roleActor: ActRole.actor
                                        })
                                    );
                                });
                            };
                        };
                    });                   
                })
                Promise.all(eventPromises, userPromises).then( (event) =>{
                    // Create Reservation
                    // Error : voir avec personne
                    ReservationModel.create({
                        EventId:4,
                        label:"Place N°1",
                        // UserId:1,
                        paymentState:"Paid"
                    })
                    ReservationModel.create({
                        EventId:3,
                        label:"Place N°1",
                        // UserId:1,
                        paymentState:"UnPaid"
                    })
                    ReservationModel.create({
                        EventId:4,
                        label:"Place N°2",
                        // UserId:1,
                        paymentState:"Paid"
                    })
                    ReservationModel.create({
                        EventId:4,
                        label:"Place N°3",
                        // UserId:1,
                        paymentState:"Paid"
                    })
                })

                // Contact Ticket
                ContactModel.create({
                    senderFirstName:"Marc",
                    senderLastName:"Evans",
                    senderEmail:"marc.evans@inazuma.jp",
                    subjectMessage:"Bonjour, je vous contacte au sujet de mon adhésion. Pouvez-vous me le renouveller ?"
                })
                ContactModel.create({
                    senderFirstName:"Magalie",
                    senderLastName:"Malisou",
                    senderEmail:"magalie.malisou@gmail.com",
                    senderAdress:{
                        "number": 11,
                        "street": "Rue de la République",
                        "postcode" : 33140,
                        "city": "Villenave D'Ornom"
                    },
                    senderPhone:'0556426325',
                    statusState:"Valided",
                    subjectMessage:"Bonjour. J'ai un problème avec mon compte. Pouvez vous me donner un nouveau mot de passe ?"
                })
            })
    })
    .catch(error =>{
        if (error instanceof ValidationError){
            return console.error({Error : error.message}, 400)
        }
        // Error servor
        console.error({Error : error.message}, 500)
    });
    
};