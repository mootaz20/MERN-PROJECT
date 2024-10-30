const express = require("express");
const postRoutes = express.Router();
const postController = require("../Controllers/postController");
const authMiddlware = require("../middlware/auth");
const checkUser = require("../middlware/checkUser");

postRoutes.route("/")
          .post(authMiddlware,postController.addPost)
          .get(authMiddlware,postController.getPosts);

postRoutes.route("/:id")
          .get(authMiddlware,postController.getPost)
          .delete(authMiddlware,checkUser,postController.deletePost)
          .patch(authMiddlware,checkUser,postController.updatePost);       
          

module.exports = postRoutes;
