const express = require("express");
const loginRoutes = express.Router();
const loginController = require('../Controllers/login') 

loginRoutes.route("/")
           .post(loginController.login)

module.exports = loginRoutes;
