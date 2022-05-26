// Require libraries
require("dotenv").config();   // enable the use of .env file to store sensitive info

const express = require("express");
const path = require("path");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const authController = require("./controllers/authController");
const indexController = require("./controllers/indexController");
const worryEntryController = require("./controllers/worryEntryController");
const worryTimeController = require("./controllers/worryTimeController");
const { upload } = require("./middleware/multer");

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
// declare the use of passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes for ejs views regarding logging in
app.get("/auth/register", forwardAuthenticated, authController.registerPage);
app.get("/auth/login", forwardAuthenticated, authController.loginPage);
app.post(
  "/auth/register",
  authController.registerUser,
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/auth/login",
  })
);
app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/auth/login",
  })
);
app.get("/auth/logout", authController.logout);


/**
 * Routes for serving server-side rendered pages
 */
app.get("/home", ensureAuthenticated, indexController.homePage);
app.get("/profile", ensureAuthenticated, indexController.profilePage);
app.get(
  "/accounts",
  ensureAuthenticated,
  isAdmin,
  indexController.accountsPage
);
app.get("/worryForm", ensureAuthenticated, indexController.worryFormPage);
app.get(
  "/dailyView/:date",
  ensureAuthenticated,
  worryEntryController.dailyWorryEntries
);
app.get("/editWorryEntry/:id", ensureAuthenticated, indexController.editPage);
app.get(
  "/setWorryTime",
  ensureAuthenticated,
  worryTimeController.worryTimeSetupPage
);
app.get(
  "/duringWorryTime/:id",
  ensureAuthenticated,
  worryTimeController.displayWorryTime
);

/**
 * API endpoints for front-end to access and update resouces
 */
// update user avatar
app.post(
  "/avatarUpload",
  ensureAuthenticated,
  upload.single("avatar"),
  indexController.uploadAvatar
);

// -------------------------- Worry Entries --------------------------
// Get all worry entries of the logged-in user
app.get(
  "/worryEntriesAll",
  ensureAuthenticated,
  worryEntryController.userWorryEntries
);
// create a worry entrry
app.post(
  "/createWorryEntry",
  ensureAuthenticated,
  upload.array("journalImages", 5),
  worryEntryController.createWorryEntry
);

// Update a worry entry
app.post(
  "/update/:id",
  ensureAuthenticated,
  worryEntryController.updateWorryEntries
);
// Delete a worry entry
app.delete(
  "/dailyView/remove/:id",
  ensureAuthenticated,
  worryEntryController.deleteWorryEntries
);
// Update a worry entry to `finished`
app.get(
  "/finishWorryEntry/:id",
  ensureAuthenticated,
  worryEntryController.finishWorryEntry
);


// -------------------------- Worry Time --------------------------
// create a worry time
app.post(
  "/worryTime/create",
  ensureAuthenticated,
  worryTimeController.createWorryTime
);

// update a worry time to `finished`
app.get(
  "/finishWorryTime/:id",
  ensureAuthenticated,
  worryTimeController.finishWorryTime
);

// -------------------------- Admin --------------------------
// granting admin privilege to a user
app.get(
  "/admin/toggleStatus/:email",
  ensureAuthenticated,
  isAdmin,
  authController.toggleAdminStatus
);

// Serve 404 not found page
app.get("/*", (req, res) => {
  res.render("notFound");
});

// Starts the server
app.listen(port, () =>
  console.log(`App listening on port ${port}!`)
);
