const User = require("../models/User");
const identicon = require("identicon");

const authController = {
  loginPage: (req, res) => {
    res.render("login");
  },

  registerPage: (req, res) => {
    res.render("register", { errorMessage: null });
  },

  registerUser: async (req, res, next) => {
    // Trim the inputted data that was given by the user
    let { firstname, lastname, email, password } = req.body;
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    // Buffer to identify the a new or existing user
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
      if (err.code === 11000) {
        const errorMessage =
          "Registration unsuccessful: the email is already linked to a user account.";
        res.render("register", { errorMessage });
      } else {
        const errorMessage = "Registration unsuccessful: unknown error.";
        res.render("register", { errorMessage });
      }
    }
  },

  // Session is destroyed when logout button triggered
  logout: (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/auth/login");
  },

  // Setting admin status to users
  toggleAdminStatus: (req, res) => {
    const { email } = req.params;
    if (email != req.user.email) {
      User.findOneAndUpdate(
        {
          email: email,
        },
        [
          {
            $set: { admin: { $not: "$admin" } },
          },
        ],
        (err, resp) => {
          if (err) {
            res.send(err);
          } else {
            res.send("OK");
          }
        }
      );
    }
  },
};

module.exports = authController;
