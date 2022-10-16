const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");

/// CATEGORY ROUTES ///

// GET request for creating a Category
router.get("/create", category_controller.category_create_get);

// POST request for creating a Category
router.post("/create", category_controller.category_create_post);

// GET request for list of all Category items
router.get("/", category_controller.index);

// GET request for each Item in a Category
router.get("/:id", category_controller.category_detail);

// GET request for updating a category
router.get("/:id/update", category_controller.category_update_get);

// POST request for updating a category
router.post("/:id/update", category_controller.category_update_post);

// GET request for deleting a category
router.get("/:id/delete", category_controller.category_delete_get);

// POST request for deleting a category
router.post("/:id/delete", category_controller.category_delete_post);

module.exports = router;
