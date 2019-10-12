const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('./user-model');
const Car = require('../car/car-model');
const Booking = require('../booking/booking-model')

const JWT_USER_SECRET = 'U$3R_sEcR3!_&eY';
const SALT_ROUNDS = 12;



function userLocal(req, res, next) {
    return passport.authenticate('user-local', (err, user, info) => {
        if (err) return next(createError(500, err)); // Error while checking : server error
        if (!user) return next(info); // Authentication failure : user error
        req.user = user;
        return next(); // Authentication successful
    })(req, res, next);
}

function userJwt(req, res, next) {
    return passport.authenticate('user-jwt', (err, user, info) => {
        if (err) return next(createError(500, err)); // Error while checking : server error
        if (!user) return next(info); // Authentication failure : user error
        user.type = 'rest';
        req.user = user;
        return next(); // Authentication successful
    })(req, res, next);
}

async function deleteUser(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.findById(id).exec();
        if (!user) throw createError(404, 'No such user');
        const deleted = await User.findOneAndDelete({ _id: id });
        res.json({ id: deleted._id });
    } catch (error) {
        next(error);
    }
}

async function loginUser(req, res) {
    try{
        const { _id, username } = req.user;
        const payLoad = { _id };

        // TODO Set jwt options like exp
        const token = jwt.sign(payLoad, JWT_USER_SECRET);
        return res.json({ _id, username, token });
    }catch(error){
        next(error);
    }
}

async function registerUser(req, res, next){
    try{
        const {
            username,
            password,
            fName,
            lName,
        } = req.body;

        const hashword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = {
            username,
            hashword,
            fName,
            lName,
        }
        const doc = await new User(user).save();
        if (!doc) throw createError(500, 'Couldnt add user');
        res.json({ message: 'New user added', user: doc });
    }catch(error){
        next(error);
    }
}

async function editUser(req, res, next) {
    const { _id } = req.user;
    const edits = {};
    edits.fName = req.body.fName;
    edits.lName = req.body.lName;
    try {
        const doc = await User.findByIdAndUpdate(_id, edits, { new: true }).exec();
        if (!doc) throw createError(404, 'No such user');
        res.json({ message: 'Updated', user: doc });
    } catch (error) {
        next(error);
    }
}

async function getUser(req, res, next){
    try{
        const { _id } = req.user;
        const doc = await User.findById( _id);
        if(!doc) throw createError(404, 'No such user');
        res.send(doc);
    }catch(error){
        next(error);
    }
}

async function getBookings(req, res, next){
    try{

        const { _id } = req.user;
        const doc = await Booking.find( {user_id: _id} ).populate('car_id');
        res.send(doc);

    }catch(error){
        next(error);
    }
}

async function bookCar(req, res, next){
    try{
        
        const {vehicle_no} = req.body;
        const {_id} = req.user;
        let car = await Car.findOne( {vehicle_number: vehicle_no} );
        if(!car) throw createError(404, 'No such car');
        // console.log(car)
        if(car.booked === true) throw createError(200, 'Car Alreay booked');
        car = await Car.findOneAndUpdate( {vehicle_number: vehicle_no}, {$set: {booked: true}}, {new: true} );
        const booking = {
            user_id: _id,
            car_id: car._id
        }
        const doc = await new Booking(booking).save();
        if(!doc) throw createError(500, 'couldnt book your car');
        res.json({message:'booking added', booking: doc});

    }catch(error){
        next(error);
    }
}

async function getCostForBooking(booking){

    const issuedDate = booking.issued_date;
    const return_date = new Date();
    const diffDays = Math.ceil( (Math.abs(return_date - issuedDate))/ (1000*60*60*24));
    return diffDays * booking.car_id.rent_per_day;
}

async function finishBooking(req, res, next){
    try{
        const {booking_id} = req.params;
        const {_id} = req.user;
        let booking = await Booking.findOne({'_id':booking_id, 'user_id':_id}).populate('car_id');
        if(!booking) throw createError(500, 'No such booking');
        if(booking.status === 'closed') throw createError(401, 'booking already closed')
        const cost = await getCostForBooking( booking );
        const car = await Car.findByIdAndUpdate(booking.car_id._id, {$set: { booked: false } } );
        booking = await Booking.findOneAndUpdate( {_id: booking_id}, {$set : { 'cost': cost, return_date: new Date(), status: 'closed' } }, {new: true} )
        res.json({message:'booking added', Booking: booking});

    }catch(error){
        next(error);
    }
}


module.exports = {
    getUser,
    deleteUser,
    editUser,
    loginUser,
    registerUser,
    userJwt,
    userLocal,
    getBookings,
    bookCar,
    finishBooking
}