const express = require('express');

const defaultPath = `/api`;

const routesList = [
    {   
        path:`${defaultPath}/users`,
        router:'./routes/userRoutes'
    },
    {   
        path:`${defaultPath}/roles`,
        router:'./routes/roleRoutes'
    },
    {   
        path:`${defaultPath}/events`,
        router:'./routes/eventRoutes'
    }
];

module.exports = routesList;