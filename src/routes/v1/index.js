const express = require('express');
const router = express.Router();

// routers
const userRouter = require('./user');
const stateRouter = require('./state');
const cityRouter = require('./city');

router.use('/users' , userRouter);
router.use('/states' , stateRouter);
router.use('/cities' , cityRouter);

module.exports = router;