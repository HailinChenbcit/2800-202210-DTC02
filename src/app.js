// Require libraries
require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const authController = require("./controllers/authController");
const indexController = require("./controllers/indexController");
const worryEntryController = require("./controllers/worryEntryController");

const {
  ensureAuthenticated,
  forwardAuthenticated,
  isAdmin,
} = require("./middleware/checkAuth");
const db = require("../config/database");
const passport = require("./middleware/passport");
const port = process.env.PORT || 3000;

const app = express();

// Route for static public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
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
    saveUninitialized: false,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, _, next) => {
  console.log(req.url);
  // console.log(req.session);
  // console.log(req.body);
  // console.log(req.user);
  next();
});

// Routes for ejs views regarding logging in
app.get("/auth/register", forwardAuthenticated, authController.registerPage);
app.get("/auth/login", forwardAuthenticated, authController.loginPage);
app.post(
  "/auth/register",
  authController.registerUser,
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);
app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);
app.get("/auth/logout", authController.logout);

// Routes for ejs views
app.get("/home", ensureAuthenticated, indexController.homePage);
app.get("/profile", ensureAuthenticated, indexController.profilePage);
app.get(
  "/accounts",
  ensureAuthenticated,
  isAdmin,
  indexController.accountsPage
);
app.get("/worryForm", ensureAuthenticated, indexController.worryFormPage);

// Worry entry
app.get("/worryEntriesAll", ensureAuthenticated, worryEntryController.userWorryEntries);
app.post(
  "/createWorryEntry",
  ensureAuthenticated,
  indexController.createWorryEntry
);

// Routes for daily view
app.get("/dailyView", ensureAuthenticated, worryEntryController.displayWorryEntries);
// Update
app.get("/dailyView/update/:id", ensureAuthenticated, worryEntryController.updateWorryEntries);
// Delete
app.get("/dailyView/remove/:id", ensureAuthenticated, worryEntryController.deleteWorryEntries);


// Starts the server
app.listen(port, () =>
  console.log(`App listening on port 3000. | ${__dirname}!`)
);
