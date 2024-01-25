// Database Conexion Configs

// Port D'écoute (Default)
const listen = {
    host: process.env.host || `localhost`,
    port: process.env.port || 8010
}

// Databases
const dbInfo = {
    dialect: 'mariadb', // Dialect Type
    logging:false,
    default:{
        host:'localhost',
        port:3306,
        database:'piscineprosc_fp_nonchaloirv1',
        user:'root',
        password:'cV$e&alj85k9kdSQ@N'
    },
    production:{
        host:'',
        port:3306,
        database:'',
        user:'',
        password:``
    }
}

// Export
module.exports ={
    listen, dbInfo
}
