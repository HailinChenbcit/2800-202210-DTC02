// Require libraries
require("dotenv").config();

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

app.use(passport.initialize());
app.use(passport.session());

app.use((req, _, next) => {
  console.log(req.url);
  console.log(req.session);
  console.log(req.body);
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

// Routes for ejs views
app.get("/home", ensureAuthenticated, indexController.homePage);
app.get("/profile", ensureAuthenticated, indexController.profilePage);
app.post(
  "/avatarUpload",
  ensureAuthenticated,
  upload.single("avatar"),
  indexController.uploadAvatar
);
app.get(
  "/accounts",
  ensureAuthenticated,
  isAdmin,
  indexController.accountsPage
);
app.get("/worryForm", ensureAuthenticated, indexController.worryFormPage);

// Worry entry
app.get(
  "/worryEntriesAll",
  ensureAuthenticated,
  worryEntryController.userWorryEntries
);
app.post(
  "/createWorryEntry",
  ensureAuthenticated,
  upload.array("journalImages", 5),
  worryEntryController.createWorryEntry
);
app.get("/editWorryEntry/:id", ensureAuthenticated, indexController.editPage);

// Routes for daily view
app.get(
  "/dailyView/:date",
  ensureAuthenticated,
  worryEntryController.dailyWorryEntries
);
// Update
app.post(
  "/update/:id",
  ensureAuthenticated,
  worryEntryController.updateWorryEntries
);

// Delete daily view
app.delete(
  "/dailyView/remove/:id",
  ensureAuthenticated,
  worryEntryController.deleteWorryEntries
);

// Worry Time routes
app.get(
  "/duringWorryTime/:id",
  ensureAuthenticated,
  worryTimeController.displayWorryTime
);
app.get(
  "/finishWorryEntry/:id",
  ensureAuthenticated,
  worryEntryController.finishWorryEntry
);

// worry time
app.get(
  "/setWorryTime",
  ensureAuthenticated,
  worryTimeController.worryTimeSetupPage
);

app.post(
  "/worryTime/create",
  ensureAuthenticated,
  worryTimeController.createWorryTime
);

app.get(
  "/finishWorryTime/:id",
  ensureAuthenticated,
  worryTimeController.finishWorryTime
);

// admin
app.get(
  "/admin/toggleStatus/:email",
  ensureAuthenticated,
  isAdmin,
  authController.toggleAdminStatus
);

app.get("/*", (req, res) => {
  res.render("notFound");
});

// Starts the server
app.listen(port, () =>
  console.log(`App listening on port ${port}!`)
);
