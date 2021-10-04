const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

const products = [];

router.get("/add-product", adminController.newProductPage);
router.post("/product", adminController.addProductPost);
router.get("/admin/products", adminController.getProducts);

module.exports = router;
