//swagger.js
const swaggerJSDoc = require('swagger-jsdoc')
const fs = require("fs");
const path = require("path");
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Documentacion de la API',
      version: '1.0.0',
      description: 'Documentacion de la API RESTFULL creada en clase de Electiva Web',
      
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo',
      }
    ]};
const options = {
swaggerDefinition,
apis: ["./routes/index.js"],
}
const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec