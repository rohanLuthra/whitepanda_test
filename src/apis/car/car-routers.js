const router = require('express').Router();

const {
    getCars,
    addCar,
    updateCar,
    getCar,
    deleteCar,
} = require('./car-controller');

/**
 * @swagger
 *  /cars/:
 *      get:
 *          tags: 
 *              - cars
 *          summary: Get all the cars
 *          responses:
 *              200:
 *                  description: List of cars
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/car'
 * 
 */
router.get('/', getCars)
/**
 * @swagger
 *  /cars/:
 *      post:
 *          tags:
 *              - cars
 *          summary: Add a car
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              vehicle_number:
 *                                  type: string
 *                                  example: "UP16TU8989"
 *                              model:
 *                                  type: string
 *                                  example: "WagonR Lxi"
 *                              seating_capacity:
 *                                  type: number
 *                                  example: 5
 *                              rent_per_day:
 *                                  type: number
 *                                  example: 2000
 *                              other_details:
 *                                  type: map
 *                                  example: {"color": "white"}
 *          responses:
 *              200:
 *                  description: cars
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/car'
 * 
 */
router.post('/', addCar);

/**
 * @swagger
 *  /cars/{VEHICLE_NO}:
 *      put:
 *          tags: 
 *              - cars
 *          summary: Update Car
 *          parameters:
 *              - name: VEHICLE_NO
 *                description: vehicle number of the car
 *                in: path
 *                require: true
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              model:
 *                                  type: string
 *                                  example: "WagonR Lxi"
 *                              seating_capacity:
 *                                  type: number
 *                                  example: 5
 *                              rent_per_day:
 *                                  type: number
 *                                  example: 2000
 *                              other_details:
 *                                  type: map
 *                                  example: {"color": "white"}     
 *          responses:
 *              200:
 *                  description: Updated Car
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/car'
 * 
 */
router.put('/:vehicle_no', updateCar);
/**
 * @swagger
 *  /cars/{VEHICLE_NO}:
 *      get:
 *          tags: 
 *              - cars
 *          summary: Get Car of vehicle_no
 *          parameters:
 *              - name: VEHICLE_NO
 *                description: vehicle number of the car
 *                in: path
 *                require: true
 *          responses:
 *              200:
 *                  description: Car of vehicle_no
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/car'
 * 
 */
router.get('/:vehicle_no', getCar)
/**
 * @swagger
 *  /cars/{VEHICLE_NO}:
 *      delete:
 *          tags: 
 *              - cars
 *          summary: Delete Car of vehicle_no
 *          parameters:
 *              - name: VEHICLE_NO
 *                description: vehicle number of the car
 *                in: path
 *                require: true    
 *                  
 *          responses:
 *              200:
 *                  description: Car deleted
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/car_id'
 * 
 */
router.delete('/:vehicle_no', deleteCar);


module.exports = router;
