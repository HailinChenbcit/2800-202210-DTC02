const User = require("../models/User");

const indexController = {
  homePage: (req, res) => {
    res.render("home");
  },
  accountsPage: async (req, res) => {
    const users = await User.find({});
    res.render("accounts", { users });
  },
  profilePage: (req, res) => {
    res.render("profile", {
      user: req.user
    });
  },
  worryFormPage: (req, res) => {
    res.render("worryForm");
  },
  
};

module.exports = indexController;

