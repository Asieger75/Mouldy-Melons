
require("dotenv").config();

//we need to load handlebars (take burgers for boilerplate) , need to install, npm i express-handlebars

const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing

const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

//setup handlebars 
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/user-api-routes.js")(app);
require("./routes/reviews-api-routes.js")(app);
require("./routes/movies-api-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});