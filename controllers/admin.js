const Product = require("../models/product");

exports.newProductPage = (req, res, next) => {
  res.render("admin/add-product.pug", { pageTitle: "Add product" });
};

exports.addProductPost = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const desc = req.body.desc;
  const newProduct = new Product(title, imageUrl, price, desc);
  newProduct.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products.pug", {
      pageTitle: "Admin products",
      products: products,
    });
  });
};
