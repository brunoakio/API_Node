const express = require('express');

const FormatController = require('./controllers/FormatController');

const routes = express.Router();

routes.post('/formatar_numero', FormatController.format);

module.exports = routes;