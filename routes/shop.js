const express = require("express");
const router = express.Router();
const admin = require("./admin.js");

router.get("/", (req, res, next) => {
  const products = admin.products;
  res.render("shop", {
    pageTitle: "Shop",
    hasProducts: products.length > 0,
    products: products,
    productCSS: true
  });
});

module.exports = router;
