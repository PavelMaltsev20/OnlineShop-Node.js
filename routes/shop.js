const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.indexPage);

router.get("/products", shopController.shopPage);

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);

router.get("/orders", shopController.orders);

router.get("/products/:productId", shopController.getProductById);

module.exports = router;
