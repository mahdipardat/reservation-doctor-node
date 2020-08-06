


module.exports = async (req , res , next) => {

    if(req.user.role !== "superAdmin" ) {
        return res.status(401).send('not authorized as superAdmin');
    }

    next();

}