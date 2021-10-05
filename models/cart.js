//improts
const Product = require("./product");
const fileReader = require("./fileReader");

//variables
const fileName = "cart.json";

module.exports = class Cart {
  constructor(id, quantity = 1) {
    this.id = id;
    this.quantity = quantity;
  }

  addToCart() {
    fileReader.readFromFile(fileName, (cart) => {
      if (cart.find((item) => item.id === this.id)) {
        cart.map((item) => {
          if (item.id === this.id) {
            item.quantity += 1;
            return item;
          } else {
            return item;
          }
        });
      } else {
        cart.push(this);
      }
      fileReader.saveToFile(fileName, cart);
    });
  }

  /**
   * @param callback return cart objects
   */
  static getCartProducts(callback) {
    fileReader.readFromFile(fileName, (cart) => {
      callback(cart);
    });
  }

  static deleteById(id) {
    fileReader.readFromFile(fileName, (cart) => {
      const result = cart.filter((current) => current.id !== id);
      fileReader.saveToFile(fileName, result);
    });
  }
};
