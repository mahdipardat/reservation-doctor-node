const express = require('express');
const app = express();

require('./db/mongoose');
require('./bootstraps')(app);

// const bcrypt = require('bcrypt');

// const testHash = async function() {
//     const data = 'red1377';
//     const hash = await bcrypt.hash(data , 8)
//     console.log(hash);
//     const isMatch = await bcrypt.compare('fake data', hash);
//     console.log(isMatch);
// }

// testHash()



module.exports = startApp = () => {
    const port = process.env.APP_PORT || 3000;
    app.listen(port , console.log(`app is running on port : ${port}`));
}