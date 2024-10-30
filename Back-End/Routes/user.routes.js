const express = require("express");
const authMiddlware = require("../middlware/auth");
const userRoutes = express.Router();
const userController = require('../Controllers/userController')

userRoutes
  .route("/")
  .get(authMiddlware, userController.getUser);

module.exports = userRoutes;
