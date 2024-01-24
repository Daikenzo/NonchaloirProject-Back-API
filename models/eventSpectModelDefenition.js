// Event / Spetacles Model Defenition
module.exports = (sequelize, DataTypes) => {
    // Phone Regex
    const phoneExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g; 
    return sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le nom ne peut pas être vide'
                }
            }
        },
        type:DataTypes.STRING,
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        eventDate: {
            type:DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            validate:{
                isDate:{
                    args:true,
                    msg:"veuillez entrez une date valide."
                }
            }
        },
        creationDate: {
            type:DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            validate:{
                isDate:{
                    args:true,
                    msg:"veuillez entrez une date valide."
                }
            }
        },
        price:{
            type:DataTypes.JSON,
            validate:{
                isPriceValid(value) {
                    // Si 
                    if ( (value.hasOwnProperty('normal') && value.hasOwnProperty('adherent') 
                        && ((value.hasOwnProperty('junior') && !value.hasOwnProperty('student')) 
                        || (!value.hasOwnProperty('junior') && value.hasOwnProperty('student')) )
                        && value.hasOwnProperty('group')  // value.normal > 0
                        ) || (
                            (!value.hasOwnProperty('normal')) && !(value.hasOwnProperty('adherent') 
                            || value.hasOwnProperty ('junior') || value.hasOwnProperty('student') 
                            || value.hasOwnProperty('group')
                            ))
                    // && value.hasOwnProperty('adherent') && value.hasOwnProperty('junior')
                    ) {
                        const reduceValue = value.hasOwnProperty('student')? value.student : value.junior; 
                        // Tarrif normal / plein obligatoire
                        if ((value.normal === null || value.normal === 0) && (value.normal !== null || value.adherent === null 
                            || reduceValue === null || value.group === null)) {
                            throw new Error('Les évènements doivent spécifié au moins le tarif plein.');
                        } // Min value: 0
                        if (value.normal < 0 || value.adherent < 0 || reduceValue < 0 || value.group < 0){
                            throw new Error('Veuillez entrez une valeur positive');
                        }// Tarif plein doit être le plus grand nombre pour une personne
                        if (value.normal < value.adherent || value.normal < reduceValue || value.normal < value.group){
                            throw new Error('Le tarif normal/plein ne peut pas être inférieur au prix réduit');
                        }// ordre de prix : Adherent < tarif réduit < tarif groupe (par per)
                        if ( (value.adherent >= value.group || value.adherent >= reduceValue ) || (reduceValue >= value.group ) ){
                            throw new Error(
                                'Le prix adhérent doit être moins chère au plus cher dans cet ordre : adherent - réduit - groupe');
                        }
                    } else {
                        throw new Error('La syntaxe des données est incorrecte.');
                    };
                },
            }
        },
        localAdress:{
            type:DataTypes.JSON
        },
        localContactName:DataTypes.STRING,
        localContactMail:{
            type:DataTypes.STRING,
            validate:{
                isEmail:{
                    args:true,
                    msg:"Veuillez entrez une adresse email valide"
                }
            }
        },
        localContactPhone:{
            type:DataTypes.STRING,
            validate:{
                is:{
                    args:phoneExp,
                    msg:"vous devez respecter le format de téléphone européen"
                }
            }
        },
        localContactWebsite:{
            type:DataTypes.STRING,
            validate:{
                isUrl:{
                    args:true,
                    msg:"Veuillez entrez un site valide"
                }
            }
        }
    },{
        onDelete: 'CASCADE'
    },{
        updatedAt: false
    });
};