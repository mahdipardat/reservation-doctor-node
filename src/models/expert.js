const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const expertSchema = new Schema({

    title : {
        type  : String,
        trim : true,
        required : true
    }

} , { timestamps : true});


const Expert  = mongoose.model('Expert' , expertSchema);

module.exports = Expert;