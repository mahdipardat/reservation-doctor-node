const Address = require('../../models/address');
const City = require('../../models/city');
const State = require('../../models/state');

exports.getAll = async (req , res , next) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;

    try {
        
        const addresses = await Address.find({
            $or : [
                {
                    title : {
                        $regex : search,
                        $options : 'i'
                    }
                },
                {
                    address : {
                        $regex : search,
                        $options : 'i'
                    }
                }
            ]
        }).populate({
            path : 'city',
            model : City,
            populate : {
                path : 'states',
                model : State
            }
        }).limit(20).skip((page - 1) * 20);

        res.send(addresses);

    } catch (e) {
        res.status(500).send(e);
    }
}

exports.get = async (req , res , next) => {
    const id = req.params.id;
    try {
        const address = await Address.findOne({ _id : id}).populate({
            path : 'city',
            model : City,
            populate : {
                path : 'states',
                model : State
            }
        }).exec();

        if(!address) {
            return res.status(404).send('not found!');
        }

        res.send(address);

    } catch (e) {
        res.status(500).send(e);
    }
}

exports.store = async (req , res , next) => {

    try {
        
        const address = await Address.create(req.body);

        res.status(201).send(address);

    } catch (e) {
        res.status(400).send(e);
    }

}

exports.update = async (req , res , next) => {

    const id = req.params.id;

    try {
        
        const address = await Address.findOneAndUpdate({ _id : id} , req.body);

        if(!address) {
            return res.status(404).send(address);
        }

        res.status(201).send(address);

    } catch (e) {
        res.status(400).send(e);
    }

}

exports.delete = async (req , res , next) => {

    const id = req.params.id;

    try {
        
        const address = await Address.findOne({ _id : id });

        if(!address) {
            return res.status(404).send('not found!');
        }

        await address.remove();

        res.status(205).send(address);

    } catch (e) {
        res.status(500).send(e);
    }

}