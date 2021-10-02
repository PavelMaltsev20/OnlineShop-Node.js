const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../utils/path");
const admin = require("./admin.js");

router.get("/", (req, res, next) => {
  console.log(admin.products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
