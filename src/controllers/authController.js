const User = require("../models/User");

const authController = {
  loginPage: (req, res) => {
    res.render("login");
  },

  registerPage: (req, res) => {
    res.render("register");
  },

  registerUser: async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    try {
      const newUser = new User({ firstname, lastname, email, password });
      await newUser.save();
      next();
    } catch (err) {
      console.log(err.message);
      res.redirect("/auth/register");
    }
  },

  logout: (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/auth/login");
  },
};

module.exports = authController;
