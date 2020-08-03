const express = require('express');
const router = express.Router();


// v1 api
const apiV1 = require('./v1');

router.use('/v1' , apiV1);


module.exports = router;