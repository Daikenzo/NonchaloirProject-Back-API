// Nonchaloir API
// Import
const express = require('express');
const morgan = require('morgan');
var cors = require('cors'); // Middlerswares for http request from express
const sequelize = require('./db/sequelizeSetup');
const { listen } = require('./configs/databaseConfig');
const routes = require('./routes/_routesList');
const app = express();
// Init Sequelize
sequelize.initDb();

// Init App
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Init Middleware
    // TimeStamp Queries Logger

// Run Middleware

// Init & Set Route
routes.forEach((route)=>{
    const routepath = require(route.router);
    app.use(route.path, routepath);
});

// End Point Middleware

// default Request
app.get("*", (req, res) => {
    // Request Not Found
    res.status(404).json({ message: `L'url demandé n'existe pas.`, errorCode:res.statusCode})
})
// Connect App from listen Port
app.listen(listen.port, (err) =>{
    if (err) console.log("Erreur de démarage du serveur", err)
    console.log(`Connecté sur le port ${listen.port}`);
});
