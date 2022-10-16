const express = require("express");
const router = express.Router();

const home_controller = require("../controllers/homeController");

/// HOME ROUTE ///

// GET home page
router.get("/", home_controller);

module.exports = router;
