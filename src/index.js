const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const routes = require('./router');
const jsonwebtoken = require('jsonwebtoken');
const { user, PRIVATE_KEY, tokenValited} = require('./security/auth');

app.use(express.json());
app.use(routes);

app.listen(3333);