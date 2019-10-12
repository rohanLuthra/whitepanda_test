const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
        title: 'White Panda',
        version: '0.1.0',
        description: 'API documentation for White Panda',
    },
    basePath: '/',
    servers: [
        {
            url: 'https://whitepanda-test.herokuapp.com',
            description: 'Heroku server',
        },
    ],
};

const options = {
    swaggerDefinition,
    contact: {
        name: 'Rohan Luthra',
        email: 'rohanluthra14@gmail.com',
    },
    apis: ['./src/apis/**/*.js', './src/helpers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
