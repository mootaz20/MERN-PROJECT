const express = require("express");
const commentRoutes = express.Router();
const commentController = require("../Controllers/commentController");
const authMiddlware = require("../middlware/auth");

commentRoutes.route("/")
             .post(authMiddlware,commentController.addComment);

module.exports = commentRoutes;
