const express = require("express");
const logoutRoutes = express.Router();
const authMiddlware = require("../middlware/auth");
const logoutController = require('../Controllers/logoutController')

logoutRoutes
  .route("/")
  .post(authMiddlware, logoutController.logout)

module.exports = logoutRoutes;
