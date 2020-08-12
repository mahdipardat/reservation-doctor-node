const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const addressSchema = new Schema({

    title : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : Schema.Types.ObjectId,
        ref : 'City',
        required : true
    }

} , { timestamps : true });

const Address = mongoose.model('Address' , addressSchema);

module.exports = Address;