// Require libraries
require("dotenv").config();

const express = require("express");
const path = require("path");
const authController = require("./controllers/authController");
const indexController = require("./controllers/indexController");
const db = require("../config/database");

const app = express();

// Route for static public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// Routes for ejs views regarding logging in
app.get("/auth/login", authController.loginPage);
app.post("/auth/register", authController.registerUser);
app.post("/auth/login", authController.loginUser);


// Routes for ejs views
app.get("/home", indexController.homePage);
app.get("/accounts", indexController.accountsPage)

// Starts the server and the MongoDB database
db.connect("mongodb://localhost:27017")
  .then(() =>
    app.listen(3000, () => {
      console.log(`App listening on port 3000. | ${__dirname}!`);
    })
  )
  .catch((err) => console.log("Unable to start the server: " + err));
