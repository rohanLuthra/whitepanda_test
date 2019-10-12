const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *      schemas:
 *          car_id:
 *              type: String
 *              format: mongoId
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          car:
 *              type: object
 *              properties:
 *                  vehicle_number:
 *                      type: string
 *                  model:
 *                      type: string
 *                  seating_capacity:
 *                      type: number
 *                  rent_per_day:
 *                      type: number
 *                  booked:
 *                      type: boolean
 *                  other_details:
 *                      type: map
 */

const carSchema = new Schema({
    vehicle_number:{
        type: String,
        required: true,
        unique: true,
    },
    model:{
        type: String,
        required: true,
    },
    seating_capacity:{
        type: Number,
        required: true,
    },
    rent_per_day:{
        type: Number,
        required: true,
    },
    booked:{
        type: Boolean,
        required: true,
        default: false,
    },
    other_details:{
        type: Map,
        of: String,
    }
})

const carModel = mongoose.model('car', carSchema);

module.exports = carModel;
