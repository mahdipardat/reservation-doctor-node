const State = require('../../models/state');
const City = require('../../models/city');


exports.getAll = async(req , res , next) => { 

    const page = req.query.page || 1;
    const search = req.query.search || '';

    try {
        
        const states = await State.find({
            title : {
                $regex : search,
                $options : 'i'
            }
        }).populate({ path : 'cities' , select : "title"}).limit(20).skip((page - 1) * 20).select({title : 1});
        
        
        res.send(states);

    } catch (e) {
        res.status(500).send(e);
    }

}

exports.get = async(req , res , next) => { 

    const id = req.params.id;

    try {
        const state = await State.findOne({_id : id}).populate({path : 'cities' , select : 'title'}).select('title');

        if(!state) {
            return res.status(404).send('not found');
        }

        res.send(state);
    } catch (e) {
        res.status(500).send(e);
    }

}

exports.store = async(req , res , next) => { 

    const { title } = req.body;

    try {
        
        const state = await State.create({ title });
        res.status(201).send(state);

    } catch (e) {
        res.status(400).send(e);
    }

 }

exports.update = async(req , res , next) => { 

    const id = req.params.id;
    const { title } = req.body;

    try {
        
        const state = await State.findOne({ _id : id });

        if(!state) {
            return res.status(404).send('not found!')
        }

        state.title = title;
        await state.save();

        res.status(201).send(state);

    } catch (e) {
        res.status(400).send(e);
    }
}

exports.delete = async(req , res , next) => { 

    const id  = req.params.id;

    try {
        
        const state = await State.findOneAndDelete({ _id : id});

        if(!state) {
            return res.status(404).send('not found!');
        }

        res.status(205).send(state);

    } catch (e) {
        res.status(500).send(e);
    }

}