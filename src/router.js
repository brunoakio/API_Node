const express = require('express');

const FormatController = require('./controllers/FormatController');

const routes = express.Router();

const { user, PRIVATE_KEY, tokenValited} = require('./security/auth');

routes.post('/formatar_numero', FormatController.format);

routes.get('/token', FormatController.auth);

module.exports = routes;