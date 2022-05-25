const User = require("../models/User");
const identicon = require("identicon");

const authController = {
  loginPage: (req, res) => {
    res.render("login");
  },

  registerPage: (req, res) => {
    res.render("register");
  },

  registerUser: async (req, res, next) => {
    let { firstname, lastname, email, password } = req.body;
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    const buffer = await identicon.generate(email, 64);
    try {
      const newUser = new User({
        firstname,
        lastname,
        email,
        password,
        avatar: { data: buffer, contentType: "image/png" },
      });
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

  toggleAdminStatus: (req, res) => {
    const { email } = req.params
    if (email != req.user.email) {
      User.findOneAndUpdate({
        email: email
      }, [{
        $set: { admin: {$not: "$admin"} }
      }], (err, resp) => {
        if (err) {
          res.send(err)
        } else {
          res.send("OK")
        }
      })
    }
  }
};

module.exports = authController;
