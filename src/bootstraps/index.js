const express = require('express');


module.exports = app => {
    

    app.use(express.json());

    // bootstraps routes
    require('./routes')(app);

    // bootstraps packages
    require('./package')(app);

}