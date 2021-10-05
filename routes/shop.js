const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.indexPage);

router.get("/products", shopController.shopPage);

router.get("/cart", shopController.cartPage);

router.post("/cart", shopController.addToCart);

router.get("/checkout", shopController.getCheckout);

router.get("/orders", shopController.orders);

router.get("/products/:productId", shopController.getProductById);

router.post("/cart/delete/:productId", shopController.deleteCartItem);

module.exports = router;
