const express = require('express');

const defaultPath = `/api`;

const routesList = [
    {   
        path:`${defaultPath}/users`,
        router:'./routes/userRoutes'
    },
    {   
        path:`${defaultPath}`,
        router:'./routes/userRoutes'
    }
];

module.exports = routesList;