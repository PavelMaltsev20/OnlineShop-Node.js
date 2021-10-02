//import
const path = require("path");
const express = require("express");

//Enter point of app
const app = express();

app.set("view engine", "pug");
app.set("views", "views");

//Init body Parser and path for entire app
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Init web pages
const admin = require("./routes/admin");
app.use(admin.routes);

const shop = require("./routes/shop");
app.use(shop);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "404" });
});

//Creating server
app.listen(3000);
