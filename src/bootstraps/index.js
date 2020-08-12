const express = require('express');


module.exports = app => {
    

    // bootstraps packages
    require('./package')(app);
    
    // bootstraps routes
    require('./routes')(app);

    

}