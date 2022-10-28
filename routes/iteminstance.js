const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/", limits: { fieldSize: 10 } });

const item_instance_controller = require("../controllers/iteminstanceController");

/// ITEM INSTANCE ROUTES ///

// GET request for creating an ItemInstance
router.get("/create", item_instance_controller.iteminstance_create_get);

// POST request for creating an ItemInstance
router.post("/create", upload.single("picture"), item_instance_controller.iteminstance_create_post);

// GET request for list of all ItemInstance items
router.get("/", item_instance_controller.index);

// GET request for one ItemInstance
router.get("/:id", item_instance_controller.iteminstance_detail);

// GET request to update an ItemInstance
router.get("/:id/update", item_instance_controller.iteminstance_update_get);

// POST request to update an ItemInstance
router.post("/:id/update", upload.single("picture"), item_instance_controller.iteminstance_update_post);

// GET request to delete an ItemInstance
router.get("/:id/delete", item_instance_controller.iteminstance_delete_get);

// POST request to delete an ItemInstance
router.post("/:id/delete", item_instance_controller.iteminstance_delete_post);

module.exports = router;
