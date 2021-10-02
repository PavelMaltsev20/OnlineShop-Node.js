const express = require("express");
const router = express.Router();
const admin = require("./admin.js");

router.get("/", (req, res, next) => {
  res.render("shop", { products: admin.products });
});

module.exports = router;
