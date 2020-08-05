const User = require('../../models/user');

exports.getUsers = async(req , res , next) => {

    const page = req.query.page || 1;
    const search = req.query.search || '';

    try {
        
        const users = await User.find({
            role: "customer",
            name: {
                $regex: search,
                $options: "i",
              },
          }).limit(20).skip((page - 1) * 20);

          if(!users) {
              res.status(404).send();
          }

          res.send({ users });

    } catch (e) {
        res.status(500).send();
    }

}

exports.store = async(req , res , next) => {

    try {
        
        const user = new User(req.body);

        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user , token });

    } catch (e) {
        res.status(400).send(e);
    }

}


exports.login = async(req , res , next) => {
    try {
        
        const user = await User.findByCredential(req.body.password , req.body.mobile);
        const token = await user.generateAuthToken();
        if(!user) {
            res.status(404).send('user not found');
        }
        res.status(200).send({ user , token })

    } catch (e) {
        res.status(404).send(e);
    }
}

exports.getUser = async(req , res , next) => {

}

exports.updateUser = async(req , res , next) => {

}

exports.deleteUser = async(req , res , next) => {

}