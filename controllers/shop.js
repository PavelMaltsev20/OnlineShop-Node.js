const Product = require("../models/product");

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

exports.getCart = (req, res, next) => {
  res.render("shop/cart.pug", { pageTitle: "Your cart" });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout.pug", { pageTitle: "Checkout" });
};

exports.orders = (req, res, next) => {
  res.render("shop/orders.pug", { pageTitle: "Orders" });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;

  Product.getById((productId) => {
    res.redirect("/product/found-succesfully");
  });
};
