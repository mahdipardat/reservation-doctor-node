const Expert = require('../../models/expert');
const { geoSearch } = require('../../models/expert');


exports.getAll = async (req , res , next) => {

    const page = req.query.page || 1;
    const search = req.query.search || '';

    try {
        
        const experts = await Expert.find({
            title : {
                $regex : search,
                $options : "i"
            }
        }).limit(20).skip((page - 1) * 20);

        res.send(experts);

    } catch (e) {
        res.status(500).send(e);
    }

}

exports.get = async (req , res , next) => {

    const id = req.params.id;

    try {
        const expert = await Expert.findOne({ _id : id });

        if(!expert) {
            return res.status(404).send('not found');
        }

        res.send(expert);

    } catch (e) {
        res.status(500).send(e);
    }

}

exports.store = async (req , res , next) => {
    const { title } = req.body;
    try {
        const expert = await Expert.create({ title });

        res.status(201).send(expert);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.update = async (req , res , next) => {
    const id = req.params.id;
    const { title } = req.body;

    try {
        const expert = await Expert.findOne({ _id : id });

        if(!expert) {
            return res.status(404).send('not found!');
        }

        expert.title = title;
        await expert.save();

        res.status(201).send(expert);

    } catch (e) {
        res.status(400).send(e);
    }
}

exports.delete = async (req , res , next) => {
    const id = req.params.id;
    try {
        
        const expert = await Expert.findByIdAndDelete(id);

        res.status(205).send(expert);

    } catch (e) {
        res.status(500).send(e);
    }

}