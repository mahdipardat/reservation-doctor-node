const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');

module.exports = async (req , res  , next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('not authorized');
    }

    const decode = jwt.verify(token , process.env.APP_SECRET);

    if (!decode) {
        return res.status(401).send('not authorized');
    }

    const doctor = await Doctor.findOne({ _id : decode._id , 'tokens.token' : token});

    if (!doctor) {
        return res.status(401).send('not authorized');
    }

    req.doctor = doctor;
    next();
}