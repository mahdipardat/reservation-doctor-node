

module.exports = (req , res , next ) => {

    if(req.user.role === "superAdmin" || req.user.role === "admin") {
        return next();
    }

    return res.status(401).send("not authorized as admin");

}