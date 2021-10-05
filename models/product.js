//imports
const Cart = require("./cart");
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

  /**
   * Function find the required object by ID
   *
   * @param productId gets id of string format to find the desired object
   * @param callback returns the found object can take the value of null
   */
  static getById(productId, callback) {
    fileReader.readFromFile(fileName, (products) => {
      const product = products.find((current) => current.id === productId);
      callback(product);
    });
  }

  static async getCartProductDetails(cart, callback) {
    const result = [];
    var total = 0;
    for (const item of cart) {
      await new Promise((res, rej) => {
        this.getById(item.id, (product) => {
          if (product !== null) {
            total = total + product.price * item.quantity;
            result.push([product, item.quantity]);
            res();
          } else {
            rej("Products.js: Failded to recieve product l:73");
          }
        });
      });
    }

    callback(result, total);
  }
};
