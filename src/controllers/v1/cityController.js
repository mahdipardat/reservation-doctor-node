const City = require('../../models/city');

exports.getAll = async(req , res , next) => { 

    const page = req.query.page || 1;
    const search = req.query.search || '';

    try {
        
        const cities = await City.find({
            title : {
                $regex : search,
                $options : "i"
            }
        }).populate('state').limit(20).skip((page - 1) * 20).cache({ key : "city"}).exec();


        res.send(cities);

    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }

}

exports.get = async(req , res , next) => {

    const id = req.params.id;

    try {
        
        const city = await City.findOne({ _id : id }).populate('state');

        if(!city) {
            return res.status(404).send('not found!');
        }

        res.send(city);

    } catch (e) {
        res.status(500).send(e);
    }

 }

exports.store = async(req , res , next) => { 

    const { title , state } = req.body;

    try {
        
        const city = await City.create({ title , state });

        if(!city) {
            return res.status(404).send('not found!');
        }

        res.status(201).send(city);

    } catch (e) {
        res.status(400).send(e);
    }

}

exports.update = async(req , res , next) => { 
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowsToUpdate = ['title' , 'state'];
    const isAllowToUpdate = updates.every(update => allowsToUpdate.includes(update));

    if(!isAllowToUpdate) {
        return res.status(422).send('not validate');
    }


    try {

        const city = await City.findOne({ _id : id});

        updates.forEach(update => {
            city[update] = req.body[update]
        });

        await city.save();

        if(!city) {
            return res.status(404).send('not found!');
        }
        
        res.status(201).send(city);

    } catch (e) {
        res.status(400).send(e)
    }

 }

exports.delete = async(req , res , next) => { 

    const id = req.params.id;

    try {
        const city = await City.findOneAndDelete({ _id : id });

        if(!city) {
            return res.status(404).send('not found!');
        }

        res.status(205).send(city);

    } catch (e) {
        res.status(400).send(e)
    }

}