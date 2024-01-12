// Event / Spetacles Roles Actor Model Defenition
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ActorRoleList', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleName:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: {
                    msg: 'Le nom du rôle ne peut pas être vide'
                }
            }
        },
        roleActor:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: {
                    msg: 'Le nom du rôle ne peut pas être vide'
                }
            }
        }
    },{
        onDelete: 'CASCADE'
    },{
        updatedAt: false
    });
};

/*
une piece de théatre peut voir un iu plusieurs roles avec une ou plusieur personnes
chaque role est associé à une et seule pièce, hormis dans le cas d'une représentation répété ()
*/