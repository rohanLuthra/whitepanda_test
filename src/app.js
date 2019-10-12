/* eslint-disable linebreak-style */
const express = require('express');
const createError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('../swagger.conf');

const appRoutes = require('./routes');

const app = express();
// to be set to specif domains later
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.json({ msg: 'hello' });
});

app.use(appRoutes);


// 404 error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Main error handler for express app. All errors passed to next() are caught here.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const { message, stack } = err;

    const status = res.statusCode === 200 ? err.statusCode || 500 : res.statusCode;

    res.status(status).json({
        message,
        status,
        stack: process.env.NODE_ENV === 'production' ? 'unavailable' : stack,
    });
});


module.exports = app;
