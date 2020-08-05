const User = require('../../models/user');
const gravatar = require('gravatar');
const sendForgetEmail = require('../../services/sendForgetMail');


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
              return res.status(404).send();
          }

    
          res.send(users);

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
            return res.status(404).send('user not found');
        }
        res.status(200).send({ user , token })

    } catch (e) {
        res.status(404).send(e);
    }
}

exports.getUser = async(req , res , next) => {
    try {
        const user = req.user;

        if(!user) {
            return res.status(404).send();
        }

        user.avatar = gravatar.url(user.email)

        res.send( user)
        
    } catch (e) {
        res.status(404).send()
    }
}

exports.updateUser = async(req , res , next) => {

    const updates = Object.keys(req.body);
    const allowsUpdated = ['name' , 'password' , 'email'];
    const isAllowdToUpdate = updates.every(update => allowsUpdated.includes(update));

    if(!isAllowdToUpdate) {
        return res.status(422).send('bad request');
    }

    try {
        
        updates.forEach(update => {
            req.user[update] = req.body[update];
        });

        await req.user.save();

        res.status(201).send(req.user);

    } catch (e) {
        res.status(400).send();
    }

}

exports.deleteUser = async(req , res , next) => {

    try {
        
        await req.user.remove();

        res.status(205).send(req.user)

    } catch (e) {
        res.status(500).send();
    }

}

exports.forget = async (req , res , next) => {

    const mobile = req.body.mobile;

    try {
        
        const user = await User.findOne({ mobile });

        if(!user) {
            return res.status(404).send();
        }

        const info = await sendForgetEmail(user);
        
        res.send({ msg : 'token sent!', info });

    } catch (e) {
        res.status(500).send();
    }

}


exports.reset = async (req , res , next) => {
    const token = req.params.token;
    const password = req.body.password;
    try {
        
        const user = await User.findOne({ forgetToken : token });

        if(!user) {
            return res.status(404).send();
        }

        user.password = password;
        user.forgetToken = undefined;
        await user.save();
        res.status(201).send(user);

    } catch (e) {
        res.status(400).send();
    }

}

exports.logout = async (req , res , next) => {
    try {
        
        await req.user.logout();

        res.send('logout');

    } catch (e) {
        res.status(500).send();
    }
}