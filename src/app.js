// Require libraries
require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const authController = require("./controllers/authController");
const indexController = require("./controllers/indexController");
const {
  ensureAuthenticated,
  forwardAuthenticated,
  isAdmin,
} = require("./middleware/checkAuth");
const db = require("../config/database");

const app = express();

// Route for static public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

MONGO_URI='mongodb+srv://bosco:bosco1234@cluster0.eqqix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
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
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, _, next) => {
  console.log(req.headers);
  console.log(req.session);
  console.log(req.body);
  next();
});

// Routes for ejs views regarding logging in
app.get("/auth/register", forwardAuthenticated, authController.registerPage);
app.get("/auth/login", forwardAuthenticated, authController.loginPage);
app.post("/auth/register", authController.registerUser);
app.post("/auth/login", authController.loginUser);

// Routes for ejs views
app.get("/home", ensureAuthenticated, indexController.homePage);
app.get("/accounts", ensureAuthenticated, isAdmin, indexController.accountsPage);

// Starts the server
app.listen(3000, () =>
  console.log(`App listening on port 3000. | ${__dirname}!`)
);
