const express = require('express');
const router = express.Router();

// routers
const userRouter = require('./user');
const stateRouter = require('./state');
const cityRouter = require('./city');
const expertRouter = require('./expert');
const doctorRouter = require('./doctor');

router.use('/users' , userRouter);
router.use('/states' , stateRouter);
router.use('/cities' , cityRouter);
router.use('/experts' , expertRouter);
router.use('/doctors' , doctorRouter);

module.exports = router;