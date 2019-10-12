const mongoose = require('mongoose');

const { Schema } = mongoose;
/**
 * @swagger
 *  components:
 *      schemas:
 *          user_id:
 *              type: String
 *              format: mongoId
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          user:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                  password:
 *                      type: string
 *                  fName:
 *                      type: string
 *                  lName:
 *                      type: string
 */

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    hashword:{
        type: String,
        required: true,
    },
    fName:{
        type: String,
        required: true,
    },
    lName:{
        type: String,
        required: true,
    }
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
