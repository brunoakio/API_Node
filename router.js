import express from 'express';
import FormatController from './src/controllers/FormatController.js';
import tokenValited from './src/security/auth.js';

const routes = express.Router();


routes.get('/token', FormatController.auth);

routes.use('*', tokenValited);
routes.post('/formatar_numero', FormatController.format);




export default routes;