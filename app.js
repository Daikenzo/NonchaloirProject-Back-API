// Nonchaloir API
// Import
const express = require('express');
const morgan = require('morgan');
var cors = require('cors'); // Middlerswares for http request from express
const sequelize = require('./db/sequelize');
const { listen } = require('./configs/databaseConfig');
const routes = require('./routes/_routesList');
const app = express();

// Init Sequelize
sequelize.initDb();

// Init App
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Init & Set Route
routes.forEach((route)=>{
    const routepath = require(route.router);
    app.use(route.path, routepath);
});

// Init Middleware

// default Request
app.use((req, res) => {
    res.status(404).json({ message: `L'url demandé n'existe pas.`, errorCode:res.statusCode})
})
// Connect App from listen Port
app.listen(listen.port, (err) =>{
    if (err) console.log("Erreur de démarage du serveur", err)
    console.log(`Connecté sur le port ${listen.port}`);
});
