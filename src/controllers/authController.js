const authController = {
  loginPage: (req, res) => {
    res.send("login page")
    // res.render("auth/login");
  },

  registerUser: (req, res) => {
    const body = req.body;
    res.send("register user")
  },

  loginUser: (req, res) => {
    // authenticate user and render home page
    res.send("login user");
  },
};

module.exports = authController;
