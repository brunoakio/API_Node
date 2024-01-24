import express from "express";
import { v4 as uuidv4 } from 'uuid';
import routes from './router.js';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);