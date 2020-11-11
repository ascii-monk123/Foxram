const express = require("express");
const path = require("path");
const rootDir = require("../utils/path");
const router = express.Router();

router.get("/dictionary", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "dictionary.html"));
});

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "main.html"));
});

module.exports = router;
