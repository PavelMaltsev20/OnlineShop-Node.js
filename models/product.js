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

  save() {
    fileReader.readFromFile(fileName, (products) => {
      products.push(this);

      fileReader.saveToFile(fileName, products);
    });
  }

  updateProduct() {
    fileReader.readFromFile(fileName, (products) => {
      const updatedArray = products.map((item) => {
        console.log(item.id);
        console.log(this.id);

        if (item.id === this.id) {
          console.log(this);
          return this;
        } else {
          return item;
        }
      });

      console.log(updatedArray);

      fileReader.saveToFile(fileName, updatedArray);
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

  setId(id){
    this.id = id;
  }
};
