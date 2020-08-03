const express = require('express');
const router = express.Router();

// users routers
const userRouter = require('./user');


router.use('/users' , userRouter);


module.exports = router;