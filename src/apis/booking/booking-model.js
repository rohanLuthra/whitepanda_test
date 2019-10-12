const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *      schemas:
 *          booking_id:
 *              type: String
 *              format: mongoId
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          booking:
 *              type: object
 *              properties:
 *                  user_id:
 *                      $ref: '#/components/schemas/user'
 *                  car_id:
 *                      $ref: '#/components/schemas/car'
 *                  issued_date:
 *                      type: date
 *                  return_date:
 *                      type: date
 *                  cost:
 *                      type: number
 */

const bookingSchema = new Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    car_id:{
        type: mongoose.Types.ObjectId,
        ref: 'car'
    },
    issued_date:{
        type: Date,
        default: new Date(),
    },
    return_date:{
        type: Date,
    },
    cost:{
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        enum: [ 'open', 'closed'],
        default: 'open',
    }
})

const bookingModel = mongoose.model('booking', bookingSchema);

module.exports = bookingModel;
