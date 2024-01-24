import express from 'express';
import FormatController from './src/controllers/FormatController.js';
import { user, PRIVATE_KEY} from './src/security/auth.js';

const routes = express.Router();


routes.post('/formatar_numero', FormatController.format);

routes.get('/token', FormatController.auth);

export default routes;