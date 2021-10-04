//imports
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const productsList = [];

/*
    path.join paremeters:
    1 rootDir - root project folder
    2 data - path to scpecific folder
    3 products.json - name of file
*/
const p = path.join(rootDir, "data", "products.json");

const fetchDataFromFile = (callback) => {
  fs.readFile(p, (err, content) => {
    if (err) {
      console.log("product.js, fetchDataFromFile, l:18 :: " + err);
      callback([]);
    } else {
      callback(JSON.parse(content));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, desc) {
    this.id = Math.random().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.desc = desc;
  }

  static fetchAll(callback) {
    fetchDataFromFile(callback);
  }

  save() {
    fetchDataFromFile((products) => {
      products.push(this);
      //p - file storage, JSON.stringify(products) - data, (err) - error
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  getById(productId, callback) {
    fetchDataFromFile((products) => {
      const product = products.find((current) => current.id === productId);
      callback(product);
    });
  }
};
