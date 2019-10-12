const Car = require('./car-model');
const createErrors = require('http-errors');

async function getCars(req, res, next){
    try{
        const doc = await Car.find();
        res.json(doc)
    }catch(error){
        next(error);
    }
}
async function getAvailableCars(req, res, next){
    try{
        const {
            seating_capacity,
            model,
            other_details
        } = req.query;
        let query = {};
        if(seating_capacity) query.seating_capacity = seating_capacity;
        if(model) query.model = model;
        if(other_details) query.other_details = other_details;
        query.booked =  false;
        console.log(query)
        const doc = await Car.find( query );
        res.json(doc)
    }catch(error){
        next(error);
    }
}

async function getCar(req, res, next){
    try{
        const {vehicle_no}= req.params; 
        const doc = await Car.findOne({vehicle_number: vehicle_no});
        if(!doc) throw createErrors(500, 'No such car');
        res.json(doc)
        
    }catch(error){
        next(error);
    }
}

async function updateCar(req, res, next){
    try{
        const {vehicle_no}= req.params 
        const {
            model,
            seating_capacity,
            rent_per_day,
            other_details,
        } = req.body;

        const car = {
            model, seating_capacity, rent_per_day, other_details
        }

        const doc = await Car.findOneAndUpdate( {vehicle_number: vehicle_no}, {$set: car}, {new: true} );
        if(!doc) throw createErrors(500, 'couldnt update car')
        res.json({message: 'updated', car: doc})

        
    }catch(error){
        next(error);
    }
}

async function deleteCar(req, res, next){
    try{
        const { vehicle_no } = req.params;
        const doc = await Car.findOneAndDelete({vehicle_number: vehicle_no});
        if(!doc) throw createErrors(500, 'couldnt delete car');
        res.json({message: 'deleted', id: doc._id})
        
    }catch(error){
        next(error);
    }
}

async function addCar(req, res, next){
    try{
        const {
            vehicle_number,
            model,
            seating_capacity,
            rent_per_day,
            other_details,
        } = req.body;

        const car = {
            vehicle_number, model, seating_capacity, rent_per_day, other_details
        }
        const doc = await new Car(car).save();
        if(!doc) throw createErrors(500, 'couldnt add car')
        res.json({message: 'added', car: doc})
        
    }catch(error){
        next(error);
    }
}




module.exports = {
    getCars,
    addCar,
    updateCar,
    getCar,
    deleteCar,
    getAvailableCars
}