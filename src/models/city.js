const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },

    state : {
        type : Schema.Types.ObjectId,
        ref : 'State',
        required : true
    }
} ,  { timestamps : true});

const City = mongoose.model('City' , citySchema);

module.exports = City;