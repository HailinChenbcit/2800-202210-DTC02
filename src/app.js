require("dotenv").config();

const express = require("express");
const path = require("path");
const authController = require("./controllers/authController");
const indexController = require("./controllers/indexController");
const db = require("../config/database");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/auth/login", authController.loginPage);
app.post("/auth/register", authController.registerUser);
app.post("/auth/login", authController.loginUser);

app.get("/home", indexController.homePage);

db.connect("mongodb://localhost:27017")
  .then(() =>
    app.listen(3000, () => {
      console.log(`App listening on port 3000. | ${__dirname}!`);
    })
  )
  .catch((err) => console.log("Unable to start the server: " + err));
