//import
const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");

//Enter point of app
const app = express();

//init Handlebars enginge and custom layout-"{layoutsDir}"
app.engine(
  "hbs",
  expressHbs({ layoutsDir: "views/layouts/", defaultLayout: "main-layout.hbs" })
);

//Init Pug engine
app.set("views", "views");

//Connect enginge to project
app.set("view engine", "hbs");

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
