/* eslint-disable linebreak-style */
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const createError = require('http-errors');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWT_USER_SECRET = 'U$3R_sEcR3!_&eY';
const User = require('./user-model');

passport.use('user-local', new LocalStrategy({
    session: false,
},
(username, password, cb) => User.findOne({ username })
    .then((user) => {
        if (!user) return cb(null, false, createError(404, 'No such User'));
        return bcrypt.compare(password, user.hashword, (err, same) => {
            if (err) {
                return cb(err, false, createError(500, 'Checking failed'));
            }
            if (same) {
                return cb(null, user, 'Auth Successful');
            }
            return cb(null, false, createError(401, 'Invalid credentials'));
        });
    })
    .catch((err) => cb(err, false, createError(500, 'Checking failed')))));

/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          userJWT:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *          
 */

passport.use('user-jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_USER_SECRET,
}, (jwtPayload, cb) => User.findById(jwtPayload._id, (err, dbEntry) => {
    if (err) return cb(err, false, createError(500, 'Checking failed'));
    if (!dbEntry) return cb(null, false, createError(404, 'No such user'));
    return cb(null, dbEntry, 'Auth Successful');
})));
