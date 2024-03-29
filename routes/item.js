const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "public/images/",
  limits: { fileSize: 10485760 }, // 10MB
});

const item_controller = require("../controllers/itemController");

/// ITEM ROUTES ///

// GET request to create Item
router.get("/create", item_controller.item_create_get);

// POST request to create Item
router.post(
  "/create",
  upload.single("picture"),
  item_controller.item_create_post
);

// GET request for list of all Item items
router.get("/", item_controller.index);

// GET request to view Item details
router.get("/:id", item_controller.item_detail);

// GET request to update Item
router.get("/:id/update", item_controller.item_update_get);

// POST request to update Item
router.post(
  "/:id/update",
  upload.single("picture"),
  item_controller.item_update_post
);

// GET request to delete Item
router.get("/:id/delete", item_controller.item_delete_get);

// POST request to delete Item
router.post("/:id/delete", item_controller.item_delete_post);

module.exports = router;
