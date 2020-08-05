const User = require('../models/user');
const jwt = require('jsonwebtoken');


module.exports = async (req , res , next) => {

    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).send('not authorized');
    }

    const decode = jwt.verify(token , process.env.APP_SECRET);
    const user = await User.findOne({ _id : decode._id , 'tokens.token' : token });


    if(!user) {
        return res.status(401).send('not authorized!');
    }

    req.user = user;
    next();

}