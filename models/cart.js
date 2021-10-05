//improts
const Product = require("./product");
const fileReader = require("./fileReader");

//variables
const fileName = "cart.json";

module.exports = class Cart {
  constructor(productId) {
    this.productId = productId;
    this.quantity = 1;
  }

  addToCart() {
    fileReader.readFromFile(fileName, (cart) => {
      if (cart.find((item) => item.productId === this.productId)) {
        cart.map((item) => {
          if (item.productId === this.productId) {
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
   * The function reads data
   * from two files (cart.json and products.json) and compares ids.
   * If they match then an object (Product object)
   * with this id is add to the list (result list)
   *
   * @param callback return result that contains Products objects
   */
  static getCartProducts(callback) {
    fileReader.readFromFile(fileName, (cart) => {
      const cartIdList = cart.map((item) => item.productId);
      fileReader.readFromFile("products.json", (products) => {
        const result = products.filter((product) =>
          cartIdList.includes(product.id)
        );
        callback(result);
      });
    });
  }

  static deleteById(id) {
    fileReader.readFromFile(fileName, (cart) => {
      const result = cart.filter((current) => current.productId !== id);
      fileReader.saveToFile(fileName, result);
    });
  }
};
