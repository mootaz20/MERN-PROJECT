const express = require('express');
const registerRoutes = express.Router();
const registerController = require('../Controllers/register')


registerRoutes.route('')
              .post(registerController.register); 

module.exports = registerRoutes;