const Product = require("../models/product");

const newProductPage = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add product" });
};

const addProductPost = (req, res, next) => {
  const newProduct = new Product(req.body.title);
  newProduct.save();
  res.redirect("/");
};

const shopPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/products-list.pug", {
      pageTitle: "Shop",
      products: products,
    });
  });
};

exports.productPage = newProductPage;
exports.addProductPost = addProductPost;
exports.shopPage = shopPage;
