//imports
const Cart = require("./cart")
const fileReader = require("./fileReader");
const productsList = [];
const fileName = "products.json";

module.exports = class Product {
  constructor(title, imageUrl, price, desc) {
    this.id = Math.random().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.desc = desc;
  }

  saveNewProduct() {
    fileReader.readFromFile(fileName, (products) => {
      products.push(this);

      fileReader.saveToFile(fileName, products);
    });
  }

  updateProductWithId(id) {
    this.id = id;
    fileReader.readFromFile(fileName, (products) => {
      const updatedArray = products.map((item) => {
        if (item.id === this.id) {
          return this;
        } else {
          return item;
        }
      });
      fileReader.saveToFile(fileName, updatedArray);
    });
  }

  static deleteById(id) {
    fileReader.readFromFile(fileName, (products) => {
      const result = products.filter((item) => item.id !== id);
      fileReader.saveToFile(fileName, result);
      Cart.deleteById(id);
    });
  }

  static fetchAll(callback) {
    fileReader.readFromFile(fileName, callback);
  }

  static getById(productId, callback) {
    fileReader.readFromFile(fileName, (products) => {
      const product = products.find((current) => current.id === productId);
      callback(product);
    });
  }
};
