const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const controllerRegisters = require('./controller/registersController');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API REST Anti-fraude Control',
            description: 'API REST para Controle de Antifraude por CPF',
            contact: {
                name: 'Estêvão Silva'
            },
            servers: ["http://localhost:7070"]
        }
    },
    // ['.routes/*.js]
    apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/cpf', controllerRegisters);
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            message: error.message
        }
    });
});

/**
 * @swagger
 * /cpf:
 *  post:
 *    description: Adiciona um CPF na lista restrita
 *    parameters:
 *      - name: cpf
 *        in: body
 *        description: Number of CPF
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - cpf
 *          properties:
 *            cpf:
 *              type: number
 *    responses:
 *      '201':
 *        description: Successful Registration
 *      '400':
 *        description: Registration failed
 */

/**
 * @swagger
 * /cpf:
 *  get:
 *    description: Retorna a lista de CPFs da lista restrita
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad Request
 */

/**
 * @swagger
 * /cpf/{cpf}:
 *  get:
 *    description: Verifica se um CPF está adicionado na lista restrita
 *    parameters:
 *      - name: cpf
 *        in: path
 *        description: Number of CPF
 *        required: true
 *        schema:
 *          type: number
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad Request
 */

/**
 * @swagger
 * /cpf/{cpf}:
 *    delete:
 *      description: Remove CPF
 *      parameters:
 *        - name: cpf
 *          in: path
 *          description: Number of CPF
 *          required: true
 *          schema:
 *            type: number
 *      responses:
 *        '201':
 *          description: Successfully deleted
 *        '400':
 *          description: Bad Request
 */

module.exports = app;