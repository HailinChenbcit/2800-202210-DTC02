// Require libraries
require("dotenv").config();

const express = require("express");
const path = require("path");
const authController = require("./controllers/authController");
const indexController = require("./controllers/indexController");
const db = require("../config/database");
const { Session } = require("inspector");

// UserModel-Session
const UserModel = require("./models/User")
const session = require("express-session");
const User = require("./models/User");
const MongoDBSession = require('connect-mongodb-session')(session);



const app = express();

// Route for static public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));


// Routes for ejs views regarding logging in
app.get("/auth/login", authController.loginPage);
app.get("/auth/register", authController.registerPage);
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


// MONGODB-SESSION
const store = new MongoDBSession({
  uri:'mongodb://localhost:27017',
  collection: 'mySessions'
})

// BROWSER-SESSION
app.use(session(
  {
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
  }
))

app.post("/auth/register", async (req, res)=>{
  const {username, email, password} = req.body;

  let user = await UserModel.findOne({email});

  if (user) return res.redirect("/auth/register")

  user = new UserModel({
    username,
    email,
    password,
  })

  await user.save()

  res.redirect("/auth/login")
})
