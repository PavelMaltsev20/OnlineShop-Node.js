const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

const products = [];

router.get("/add-product", productController.productPage);
router.post("/product", productController.addProductPost);

module.exports = router;
