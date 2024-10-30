const express = require("express");
const categoryRoutes = express.Router();
const categoryController = require("../Controllers/categoryController");
const authMiddlware = require("../middlware/auth");

categoryRoutes.route("/")
              .post(authMiddlware,categoryController.addCategory)
              .get(authMiddlware,categoryController.getCategories);

categoryRoutes.route('/:id')
              .get(authMiddlware,categoryController.getCategory)
              .delete(authMiddlware,categoryController.deleteCategory)
              .put(authMiddlware,categoryController.editCategory)

module.exports = categoryRoutes;
