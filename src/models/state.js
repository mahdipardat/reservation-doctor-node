const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const City = require('./city');


const stateSchema = new Schema({

    title : {
        type : String,
        required : true
    }

}, { timestamps : true});


stateSchema.virtual('cities' , {
    ref : 'City',
    localField : '_id',
    foreignField : 'state',

});

stateSchema.set('toObject', { virtuals: true });
stateSchema.set('toJSON', { virtuals: true });


stateSchema.pre('remove' , async function(next) {

    await City.deleteMany({ state : this._id });
    next();
})

const State = mongoose.model('State' , stateSchema);

module.exports = State;