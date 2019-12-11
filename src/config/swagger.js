const version = require('../../package');

module .exports = {
    swagger : (server) => {
        const expressSwagger = require('express-swagger-generator')(server);
        let options = {
            swaggerDefinition: {
                info: {
                    description: 'API tweet/comment/timeline',
                    title: 'API',
                    version: version.version,
                },
                host: process.env.HOST+':'+process.env.listen_port,
                basePath: '/api-tweet/v1',
                produces: [
                    "application/json"
                ],
                schemes: ['http', 'https'],
                securityDefinitions: {
                    JWT: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization',
                        description: "",
                    }
                }
            },
            basedir: __dirname, //app absolute path
            files: ['../router.js'] //Path to the API handle folder
        };
        return expressSwagger(options);
    }
};
