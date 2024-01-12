// Contact FormData Model Defenition
module.exports = (sequelize, DataTypes) => {
    // Phone Regex (European)
    const phoneExp = /^((\+)33|0|0033)[1-9](\d{2}){4}$/g; 
    return sequelize.define('Reservation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg: "Le libellé du ticket ne peux être null"
                },
                len:{
                    args:[3,10],
                    msg:"Le nom du ticket doit être entre 3 et 10 caractères"
                }
            }
        },
        paymentState:{
            type:DataTypes.ENUM,
            // Reimbursed is for a paid status when Event has been canceled
            values: ['Unpaid','Paid', 'Reimbursed'],
            defaultValue:'Unpaid'
        }

    },{
        onDelete: 'CASCADE', // Sur un effacement de données, supprimé toutes info en cascade
        scopes: {
            withPrice: { // For Jwt token
                attributes: {}
            }
        }
    },
    {
        updatedAt: new Date(),
        createdAt: new Date()
    });
};