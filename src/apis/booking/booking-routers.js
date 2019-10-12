const router = require('express').Router();
const {
    getBooking,
    getBookings,
    getBookingsForCar,
    getBookingsForUser,
} = require('./booking-controller');
/**
 * @swagger
 *  /bookings/:
 *      get:
 *          tags: 
 *              - bookings
 *          summary: Get all the booking
 *          responses:
 *              200:
 *                  description: List of booking
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/booking'
 * 
 */
router.get('/', getBookings)

/**
 * @swagger
 *  /bookings/{ID}:
 *      get:
 *          tags: 
 *              - bookings
 *          summary: Get Bokoking of ID
 *          parameters:
 *              - name: ID
 *                description: _id of the booking
 *                in: path
 *                require: true
 *          responses:
 *              200:
 *                  description: Car of vehicle_no
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/booking'
 * 
 */
router.get('/:id', getBooking)

/**
 * @swagger
 *  /bookings/user/{USERNAME}:
 *      get:
 *          tags: 
 *              - bookings
 *          summary: Get Bookings for user with USERNAME
 *          parameters:
 *              - name: USERNAME
 *                description: USERNAME of the user
 *                in: path
 *                require: true
 *          responses:
 *              200:
 *                  description: List of booking
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/booking'
 * 
 */
router.get('/user/:username', getBookingsForUser)

/**
 * @swagger
 *  /bookings/car/{VEHICLE_NO}:
 *      get:
 *          tags: 
 *              - bookings
 *          summary: Get Bookings for car with VEHICLE_NO
 *          parameters:
 *              - name: VEHICLE_NO
 *                description: _id of the booking
 *                in: path
 *                require: true
 *          responses:
 *              200:
 *                  description: List of bookings
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/booking'
 * 
 */
router.get('/car/:vehicle_no', getBookingsForCar)

module.exports = router;