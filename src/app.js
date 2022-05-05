// Require libraries
require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const authController = require("./controllers/authController");
const indexController = require("./controllers/indexController");
const db = require("../config/database");

const app = express();

// Route for static public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// connect to mongodb atlas
db.connect(process.env.MONGO_URI);

// initialize mongodb session store
const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "Sessions",
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.use((req, _) => console.log(req.session));

// Routes for ejs views regarding logging in
app.get("/auth/register", authController.registerPage);
app.get("/auth/login", authController.loginPage);
app.post("/auth/register", authController.registerUser);
app.post("/auth/login", authController.loginUser);

// Routes for ejs views
app.get("/home", indexController.homePage);
app.get("/accounts", indexController.accountsPage);

// Starts the server
app.listen(3000, () =>
  console.log(`App listening on port 3000. | ${__dirname}!`)
);
