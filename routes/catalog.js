const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello world")
})

router.get("/jerseys", (req, res) => {
  res.send("Jersey boy")
})

module.exports = router;
