//imports
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

  static deleteProduct(id) {
    fileReader.readFromFile(fileName, (products) => {
      for (const index in products) {
        if (products[index].id === id) {
          products.splice(index, 1);
        }
      }

      fileReader.saveToFile(fileName, products);
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
