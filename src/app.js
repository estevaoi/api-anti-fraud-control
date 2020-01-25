const express = require('express');
const app = express();

const controllerRegisters = require('./controller/registersController');

app.use('/cpf', controllerRegisters);

module.exports = app;