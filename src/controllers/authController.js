const User = require("../models/User");

function login(req, user) {
  req.session.isAuth = true;
  req.session.user = user;
}


const authController = {
  loginPage: (req, res) => {
    res.render("login");
  },
  registerPage: (req, res) =>{
    res.render("register");
  },

  registerPage: (req, res) => {
    res.send("register");
  },

  registerUser: async (req, res) => {
    console.log(req.body);
    const { firstname, lastname, email, password } = req.body;
    try {
      const newUser = new User({ firstname, lastname, email, password });
      await newUser.save();
      login(req, newUser);
    } catch (err) {
      console.log(err.message);
      res.redirect("/auth/register");
    }
    res.render("home");
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
    if (user && user.password === password) {
      login(req, user);
      res.render("home");
    } else {
      res.send("User login failed");
    }
  },
};

module.exports = authController;
