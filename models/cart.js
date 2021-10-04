//improts
const Product = require("./product");
const fileReader = require("./fileReader");

//variables
const fileName = "cart.json";

module.exports = class Cart {
  constructor(productId, price) {
    this.productId = productId;
    this.quantity = 1;
    this.price = price;
  }

  addToCart() {
    fileReader.readFromFile(fileName, (cart) => {
      for (const item of cart) {
        if (item.productId === this.productId) {
          this.quantity = item.quantity + 1;
          this.price = item.price + this.price;
          cart.splice(item, 1);
        }
      }
      cart.push(this);
      fileReader.saveToFile(fileName, cart);
    });
  }
};
