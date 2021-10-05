const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/admin/add-product", adminController.newProductPage);

router.post("/save-product", adminController.addProductPost);

router.get("/admin/products", adminController.getProducts);

router.post("/admin/edit/:productId", adminController.editProductPage);

router.post("/admin/update/:productId", adminController.updateProduct);

router.post("/admin/delete/:productId", adminController.deleteProduct);

module.exports = router;
