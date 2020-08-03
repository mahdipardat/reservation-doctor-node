const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = process.env.MONGO_SERVER;

mongoose.connect(uri , { useNewUrlParser : true , useCreateIndex : true , useUnifiedTopology : true });