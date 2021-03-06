const Product = require("../models/product");
const Cart = require("../models/cart");

exports.shopPage = (req, res, next) => {
//   Product.fetchAll().then((rows, fieldData) => {
//     console.log(rows);

// //     res.render("shop/index.pug", {
// //     pageTitle: "Shop index",
// //     products: rows,
// //  });
// }).catch((err) => {
//   console.log("Shop.js, indexPage error: "+err);
// })
};


//TODO SOME ERROR HERE
exports.indexPage = (req, res, next) => {
  // Product.fetchAll().then((rows, fieldData) => {
  
  //     res.render("shop/index.pug", {
  //     pageTitle: "Shop index",
  //     products: rows,
  
  // });
  // }).catch((err) => {
  //   console.log("Shop.js, indexPage error: "+err);
  // })
};

exports.cartPage = (req, res, next) => {
  Cart.getCartProducts((cart) => {
    Product.getCartProductDetails(cart, (products, total) => {
      res.render("shop/cart.pug", {
        pageTitle: "Your cart",
        products: products,
        total: total,
      });
    });
  });
};

exports.addToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.getById(productId, (result) => {
    const cart = new Cart(result.id);
    cart.addToCart();
    res.redirect("/cart");
  });
};

exports.deleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Cart.deleteById(productId);
  res.redirect("/cart");
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
