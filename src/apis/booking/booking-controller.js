const creatErrors = require('http-errors');
const Booking = require('./booking-model');
const Car = require('../car/car-model');
const User = require('../user/user-model');


async function getBookings(req, res, next){
    try{
        const doc = await Booking.find({});
        res.send(doc);
    }catch(error){
        next(error);
    }
}

async function getBooking(req, res, next){
    try{

        const {id} = req.params;
        const doc = await Booking.findOne({_id:id}).populate('car_id').populate('user_id');
        if(!doc) throw creatErrors(404, 'No such booking');
        res.send(doc);

    }catch(error){
        next(error);
    }
}

async function getBookingsForUser(req, res, next){
    try{

        const {username} = req.params;
        const user = await User.findOne({'username':username});
        if(!user) throw creatErrors(404, 'No such user');
        const doc = await Booking.findOne({user_id:user._id});
        if(!doc) throw creatErrors(404, 'No such booking');
        res.send(doc);

    }catch(error){
        next(error);
    }
}

async function getBookingsForCar(req, res, next){
    try{

        const {vehicle_no} = req.params;
        const car = await Car.findOne({vehicle_number: vehicle_no});
        if(!car) throw creatErrors(404, 'No such car');
        const doc = await Booking.findOne({car_id:car._id});
        if(!doc) throw creatErrors(404, 'No such booking');
        res.send(doc);

    }catch(error){
        next(error);
    }
}

module.exports = {
    getBooking,
    getBookings,
    getBookingsForUser,
    getBookingsForCar,
}