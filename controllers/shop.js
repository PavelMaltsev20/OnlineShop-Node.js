const Product = require("../models/product");
const Cart = require("../models/cart");

exports.shopPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/products-list.pug", {
      pageTitle: "Shop",
      products: products,
    });
  });
};

exports.indexPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index.pug", {
      pageTitle: "Shop index",
      products: products,
    });
  });
};

exports.cartPage = (req, res, next) => {
  Cart.getCartProducts((products) => {
    res.render("shop/cart.pug", {
      pageTitle: "Your cart",
      products: products,
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout.pug", { pageTitle: "Checkout" });
};

exports.orders = (req, res, next) => {
  res.render("shop/orders.pug", { pageTitle: "Orders" });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;

  Product.getById(productId, (product) => {
    res.render("shop/product-details.pug", {
      pageTitle: product.title,
      product: product,
    });
  });
};

exports.addToCart = (req, res, next) => {
  const productId = req.body.productId;
  const cart = new Cart(productId);
  cart.addToCart();
  res.redirect("/cart");
};
