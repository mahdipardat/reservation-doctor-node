const mail = require('../bootstraps/mailer');
const crypto = require('crypto');
const ejs = require('ejs');
const path = require('path');

const sendForgetEmail = async(user) => {

    const token = crypto.randomBytes(16).toString('hex');

    user.forgetToken = token;
    
    await user.save();

    const data = await ejs.renderFile(path.resolve('src/mails/forgetPassword.ejs') , { user , token , url : process.env.APP_BASEURL});

    const info = await mail.sendMail({
        from : '<doctors@gmail.com>',
        subject : 'فراموشی رمز عبور در سایت دکتر',
        to : user.email,
        html : data
    });

    return info;

}


module.exports = sendForgetEmail;