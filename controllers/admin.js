const Product = require("../models/product");

exports.newProductPage = (req, res, next) => {
  console.log("entered");
  res.render("admin/add-product.pug", {
    pageTitle: "Add product",
  });
};

exports.addProductPost = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = +req.body.price;
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

exports.editProductPage = (req, res, next) => {
  const productId = req.body.productId;
  Product.getById(productId, (product) => {
    res.render("admin/edit-products.pug", {
      pageTitle: "Edit product",
      product: product,
    });
  });
};

exports.updateProduct = (req, res, next) => {
  const product = new Product();
  product.setId(req.body.idForUpdate);
  product.title = req.body.title;
  product.imageUrl = req.body.imageUrl;
  product.price = +req.body.price;
  product.desc = req.body.desc;
  product.updateProduct();
  res.redirect("/admin/products");
};
