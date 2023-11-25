// Database Conexion Configs

// Port D'écoute (Default)
const listen = {
    host: `localhost`,
    port: '8010'
    
}

// Databases
const db = {
    host:'localhost',
    dialect: 'mariadb', // Dialect Type
    database: 'piscineprosc_fp_nonchaloirv1',
    port: 3306,
    user: 'root',
    password: `cV$e&alj85k9kdSQ@N`,
}

module.exports ={
    listen,db
}
