const express = require('express');

const defaultPath = `/api`;

const routesList = [
    // Conthroller Route
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
    },
    {   
        path:`${defaultPath}/actors`,
        router:'./routes/evActRoleRoutes'
    },
    {   
        path:`${defaultPath}/contacts`,
        router:'./routes/contactRoutes'
    },
    {   
        path:`${defaultPath}/reservations`,
        router:'./routes/reservationRoutes'
    }
];


module.exports = routesList;