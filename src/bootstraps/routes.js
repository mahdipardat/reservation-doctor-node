const router = require('../routes/index');
const swaggerUi = require('swagger-ui-express');
const swagger = require('../../swagger.json');

module.exports = app => {   

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));
    app.use(router);

}