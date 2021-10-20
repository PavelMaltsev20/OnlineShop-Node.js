//imports
const path = require("path");
const express = require("express");
const errorController = require("./controllers/error");
// Handlebats engine
const expressHbs = require("express-handlebars");
const db = require("./utils/database")

//Enter point of app
const app = express();

//init Handlebars enginge and custom layout-"{layoutsDir}"
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);

/*
  Connecting view enginge to project
  Replace second parameter for uses diffetent engine
*/

const pugEngine = "pug";
const hbsEngine = "hbs";
const ejsEngine = "ejs";

app.set("views", "views");
app.set("view engine", ejsEngine);

//Init body Parser and path for entire app
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


db.execute("SELECT * FROM products").then((result) => {
  console.log( result[0]);
}).catch((err) => {
  console.log("MySql database error: "+err);
});

// Init web pages
const admin = require("./routes/admin");
app.use(admin);

const shop = require("./routes/shop");
app.use(shop);

app.use(errorController.pageNotFound);

//Creating server
app.listen(3000);
