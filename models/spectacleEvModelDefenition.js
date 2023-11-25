// Event / Spetacles Model Defenition
module.exports = (sequelize, Datatypes) => {
    return sequelize.define('event', {
        id: {
            type:DataTypes.INTEGER,
            primarykey: true,
            autoincrement:true
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
            type:Datatypes.STRING,
            allowNull:false
        },
        createAt: {
            type:DataTypes.DATE,
            defaultValue: new DATEONLY(Date.now()),
            validate:{
                isDate:{
                    args:true,
                    msg:"veuillez entrez une date valide."
                }
            }
        },
        representDate: {
            type:DataTypes.DATE,
            defaultValue: new DATE(Date.now()),
            validate:{
                isDate:{
                    args:true,
                    msg:"veuillez entrez une date valide."
                }
            }
        },
        price:{
            type:DataTypes.DECIMAL(4,2),
            defaultValue:0,
            validate:{
                min:0
            }
        },
        locationAdress:{
            type:Datatypes.JSON
        },
        locationContactName:DataTypes.STRING,
        locationContactMail:{
            type:DataTypes.STRING,
            validate:{
                isEmail:{
                    args:true,
                    msg:"Veuillez entrez une adresse email valide"
                }
            }
        },
        locationContactPhone:{
            type:DataTypes.DECIMAL(10,0)
        }
    },{
        updatedAt: false
    });
};