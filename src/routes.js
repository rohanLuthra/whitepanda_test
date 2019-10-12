const router = require('express').Router();

const carRouters = require('./apis/car/car-routers');
const userRouters = require('./apis/user/user-routers')
const bookingRouters = require('./apis/booking/booking-routers');

router.use('/cars', carRouters);
router.use('/users', userRouters);
router.use('/bookings', bookingRouters);

module.exports = router;
