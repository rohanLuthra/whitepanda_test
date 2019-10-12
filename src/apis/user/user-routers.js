const router = require('express').Router();
require('./user-passport');

const {
    getUser,
    deleteUser,
    editUser,
    loginUser,
    registerUser,
    userJwt,
    userLocal,
    getBookings,
    bookCar,
    finishBooking,
} = require('./user-controller');

/**
 * @swagger
 * /users/:
 *  get:
 *      security:
 *          - userJWT: []
 *      tags:
 *          - "user"
 *      summary: Get self
 *      description: Get details of currently logged in user
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: No such user found
 *          401:
 *              description: Unauthorised/invalid jwt
 */
router.get('/', userJwt, getUser);

/**
 * @swagger
 * /users/bookings:
 *  get:
 *      security:
 *          - userJWT: []
 *      tags:
 *          - "user"
 *      summary: Get user bookings
 *      description: Get bookings for the currently logged in user
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/booking'
 *          404:
 *              description: No such user found
 *          401:
 *              description: Unauthorised/invalid jwt
 */
router.get('/bookings', userJwt, getBookings);


/**
 * @swagger
 * /users/bookings:
 *  post:
 *      security:
 *          - userJWT: []
 *      tags:
 *          - "user"
 *      summary: Book a car
 *      produces:
 *          - application/json
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          vehicle_no:
 *                              type: string
 *                              example: UP16TU8989
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/booking'
 */
router.post('/bookings', userJwt, bookCar);

/**
 * @swagger
 * /users/bookings/{BOOKING_ID}:
 *  put:
 *      security:
 *          - userJWT: []
 *      tags:
 *          - "user"
 *      summary: Finish booking of BOOKING_ID
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: BOOKING_ID
 *            in: path
 *            required: true
 *            description: Booking id
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 */
router.put('/bookings/:booking_id', userJwt, finishBooking);


/**
 * @swagger
 * /users/:
 *  put:
 *      security:
 *          - userJWT: []
 *      tags:
 *          - "user"
 *      summary: Edit user info
 *      description: Edit the fName, lNmae of currently logged in user
 *      produces:
 *          - application/json
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fName:
 *                   type: string
 *                   example: black
 *                 lNmae:
 *                   type: string
 *                   example: panda2
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: status message
 *                                  example: Updated
 *                              user:
 *                                  $ref: '#/components/schemas/user'
 *          404:
 *              description: No such user
 *          401:
 *              description: Unauthorised/invalid jwt
 */
router.put('/', userJwt, editUser);

/**
 * @swagger
 * /users/:
 *  delete:
 *      security:
 *          - userJWT: []
 *      tags:
 *          - "user"
 *      summary: Delete current user
 *      description: Delete the currently logged in user
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  $ref: '#/components/schemas/user_id'
 *          404:
 *              description: No such user
 *          401:
 *              description: Unauthorised/invalid jwt
 */
router.delete('/', userJwt, deleteUser);


/**
 * @swagger
 * /users/auth/login:
 *  post:
 *      tags:
 *          - "user"
 *      summary: Login using otp
 *      description: get jwt token of user by passing otp
 *      produces:
 *          - application/json
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: user_1
 *                 password:
 *                   type: string
 *                   description: password
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                                  description: username of user
 *                                  example: user_1
 *                              token:
 *                                  type: string
 *                                  description: jwt token for user
 *                              user:
 *                                  $ref: '#/components/schemas/user'
 *          410:
 *              description: Unauthorised - invalid otp
 */
router.post('/auth/login', userLocal, loginUser);

/**
 * @swagger
 * /users/auth/register:
 *  post:
 *      tags:
 *          - "user"
 *      summary: Register a new user
 *      description: Register a new user
 *      produces:
 *          - application/json
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: user_1
 *                 password:
 *                   type: string
 *                   example: password
 *                 fName:
 *                   type: string
 *                   example: white
 *                 lName:
 *                   type: string
 *                   example: panda
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: status message
 *                                  example: User has been registered
 *                              id:
 *                                  $ref: '#/components/schemas/user_id'
 *                              jwt:
 *                                  type: string
 *                                  description: jwt of user
 *          410:
 *              description: Unauthorised - invalid otp
 */
router.post('/auth/register', registerUser);
module.exports = router;