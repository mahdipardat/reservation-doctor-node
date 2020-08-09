const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    fullname : {
        type: String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5

    },
    mobile : {
        type : String,
        required : true,
        unique: true
    },
    nationalCode : {
        type : String,
        trim : true,
        required : true
    },
    licenseCode : {
        type : Number,
        required : true
    },
    licenseImage : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : [
            "pending",
            "decline",
            "active"
        ],
        default : "pending"
    },
    experts : [{
        type : Schema.Types.ObjectId,
        ref : 'Expert'
    }],
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
} , { timestamps : true});

doctorSchema.pre('save' , async function (next) {

    if (this.isModified('password')) {
        const hash = await bcrypt.hash(this.password , 8);
        this.password = hash;
    }

    next();
});

doctorSchema.methods.generateAuthToken = async function() {
    const doctor = this
    const token = jwt.sign({ _id : doctor._id } , process.env.APP_SECRET);
    doctor.tokens = doctor.tokens.concat({ token });
    await doctor.save();
    return token;
}

doctorSchema.statics.findByCredential = async function (password , mobile) {
    const doctor = await Doctor.findOne({ mobile });

    if (!doctor) {
        throw new Error('unable to login');
    }

    const isMath = await bcrypt.compare(password , doctor.password);

    if (!isMath) {
        throw new Error('unable to login')
    }

    return doctor;
}

const Doctor = mongoose.model('Doctor', doctorSchema);

module.export = Doctor;