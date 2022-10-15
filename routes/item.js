const express = require("express")
const router = express.Router()

const item_controller = require("../controllers/itemController")

/// ITEM ROUTES ///

// Redirect the user to the page of Items inside of a Category
router.get("/category/:category/item", item_controller.index)

// GET request to view Item details
router.get("/category/:category/item/:id", item_controller.item_detail)

// GET request to create Item
router.get("/category/:category/item/create", item_controller.item_create_get)

// POST request to create Item
router.post("/category/:category/item/create", item_controller.item_create_post)

// GET request to update Item
router.get("/category/:category/item/:id/update", item_controller.item_update_get)

// POST request to update Item
router.post("/category/:category/item/:id/update", item_controller.item_update_post)

// GET request to delete Item
router.get("/category/:category/item/:id/delete", item_controller.item_delete_get);

// POST request to delete Item
router.post("/category/:category/item/:id/delete", item_controller.item_delete_post)

module.exports = router;