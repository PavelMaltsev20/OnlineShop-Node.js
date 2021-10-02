//imports
const path = require("path");
const express = require("express");
// Handlebats engine
const expressHbs = require("express-handlebars");

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
