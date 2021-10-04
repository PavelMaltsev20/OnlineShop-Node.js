const fileDir = require("../utils/path");
const path = require("path");
const fs = require("fs");

exports.readFromFile = (fileName, callback) => {
  const p = path.join(fileDir, "data", fileName);
  fs.readFile(p, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

exports.saveToFile = (fileName, objectForSave) => {
  const p = path.join(fileDir, "data", fileName);
  const jsonObject = JSON.stringify(objectForSave);
  fs.writeFile(p, jsonObject, (err) => {
    console.log("FileReader: file saved.");
  });
};
