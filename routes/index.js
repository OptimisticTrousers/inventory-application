var express = require("express");
var router = express.Router();

// Require controller modules
var home_controller = require("../controllers/homeController");
var category_controller = require("../controllers/categoryController");
var item_controller = require("../controllers/itemController");

/// CATEGORY ROUTES ///

/* GET home page. */
router.get("/", home_controller);

// Redirect /category to home page
router.get("/category", category_controller.index)

// GET request for each Item in a Category
router.get("/category/:category", category_controller.category_detail)

// GET request for updating a category
router.get("/category/:category/update", category_controller.category_update_get)

// POST request for updating a category
router.post("/category/:category/update", category_controller.category_update_post)

// GET request for deleting a category 
router.get("/category/:category/delete", category_controller.category_delete_get)

// POST request for deleting a category
router.post("/category/:category/delete", category_controller.category_delete_post)

// GET request for creating a Category
router.get("/category/create", category_controller.category_create_get);

// POST request for creating a Category
router.post("/category/create", category_controller.category_create_post);



module.exports = router;
