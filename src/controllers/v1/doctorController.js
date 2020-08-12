const Doctor = require('../../models/doctor');
const fs = require('fs');

exports.getAll = async (req , res , next) => {
    const page = req.query.page || 1;
    const search = req.query.search || '';

    try{
        const doctors = await Doctor.find({
            fullname : {
                $regex : search,
                $options : 'i'
            }
        }).populate('experts').limit(20).skip((page - 1) * 20);
        
        res.send(doctors);


    } catch (e) {
        
        res.status(500).send(e);
    }

}

exports.get = async (req , res , next) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findOne({ _id : id }).populate('experts');

        if (!doctor) {
            return res.status(404).send('not found!');
        }

        res.send(doctor);
    } catch (e) {
        res.status(500).send(e);
    }

}

exports.me = async (req , res , next) => {
    try {

        await req.doctor.populate('experts').execPopulate();

        res.send(req.doctor)

    } catch (e) {
        res.status(500).send(e);
    }
}

exports.store = async (req , res , next) => {
    
    try {
        const doctor = await Doctor.create({
            ...req.body,
            licenseImage : process.env.APP_BASEURL + '/' + req.file.path
        });
       
        const token = await doctor.generateAuthToken();
        res.send({ doctor , token })

    } catch (e) {
        fs.unlinkSync(req.file.path);
        res.status(400).send(e)
    }
}

exports.login = async (req , res , next) => {
    const { mobile , password } = req.body;

    try {

        const doctor = await Doctor.findByCredential(password , mobile);

        if (!doctor) {
            res.status(404).send('not found')
        }

        const token = await doctor.generateAuthToken();

        res.send({ doctor , token });

    } catch (e) {
        res.status(404).send(e);
    }

}

exports.update = async (req , res , next) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowsToUpdate = ['fullname' , 'email' , 'password' , 'experts' , 'licenseImage'];
    const isAllowedUpdate = updates.every(update => allowsToUpdate.includes(update));

    if (!isAllowedUpdate) {
        return res.status(400).send('bad request');
    }

    try {
        const doctor = await Doctor.findOne({ _id : id });

        if (req.file) {
            fs.unlinkSync(doctor.licenseImage.replace(process.env.APP_BASEURL + '/' , ''));
            doctor['licenseImage'] = process.env.APP_BASEURL + '/' +req.file.path;
        }

        updates.forEach(update => {
            doctor[update] = req.body[update];
        });

        await doctor.save();

        res.status(201).send(doctor);

    } catch (e) {
        fs.unlinkSync(req.file.path)
        res.status(400).send(e);
    }
}

exports.delete = async (req , res , next) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findOne({_id : id});
        if (!doctor) {
            return res.status(404).send('not found!');
        }

        fs.unlinkSync(doctor.licenseImage.replace(process.env.APP_BASEURL + '/' , ''));
        await doctor.remove();

        res.status(205).send(doctor);

    } catch (e) {
        res.status(400).send(e);
    }

}

exports.accept = async (req , res , next) => {
    const id = req.params.id;
    try {

        const doctor = await Doctor.findOne({ _id : id});
        doctor.status = 'active';
        await doctor.save();

        res.status(201).send(doctor)

    } catch (e) {
        res.status(500).send(e)
    }

}

exports.reject = async (req , res , next) => {

    const id = req.params.id;
    try {

        const doctor = await Doctor.findOne({ _id : id});
        doctor.status = 'decline';
        await doctor.save();

        res.status(201).send(doctor)

    } catch (e) {
        res.status(500).send(e)
    }
}