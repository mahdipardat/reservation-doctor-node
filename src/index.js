const express = require('express');
const app = express();

require('./db/mongoose');
require('./bootstraps')(app);




module.exports = startApp = () => {
    const port = process.env.APP_PORT || 3000;
    app.listen(port , console.log(`app is running on port : ${port}`));
}