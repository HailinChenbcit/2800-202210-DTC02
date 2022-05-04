const User = require("../models/User");

const authController = {
  loginPage: (req, res) => {
    res.send("login page");
    // res.render("auth/login");
  },

  registerUser: async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, email, password } = req.body;
    try {
      const newUser = new User({ firstname, lastname, email, password });
      await newUser.save();
    } catch (err) {
      console.log(err.message);
    }

    res.send("home");
  },

  loginUser: async (req, res) => {
    // authenticate user and render home page
    const { email, password } = req.body;
    let user;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      console.log(err);
      throw err;
    }
    if (user.password === password) {
      res.send("user logged in");
    } else {
      res.send("User login failed");
    }
  },
};

module.exports = authController;
