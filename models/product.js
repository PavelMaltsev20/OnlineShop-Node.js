//imports
const Cart = require("./cart");
const db = require("../utils/database")

module.exports = class Product {
  constructor(title, imageUrl, price, desc) {
    this.id = Math.random().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.desc = desc;
  }

  saveNewProduct() {

  }

  updateProductWithId(id) {

  }

  static deleteById(id) {

  }

  static fetchAll() {
   return db.execute("SELECT * FROM mytestschema.products")
  }


  static getById(productId, callback) {
   
  }

  static async getCartProductDetails(cart, callback) {
  
  }
};
