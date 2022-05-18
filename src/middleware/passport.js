const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const localLogin = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: "email",
    passwordField: "password",
  },

  async (req, email, password, done) => {
    const user = await User.findOne({ email, password }).exec();
    if (user) {
      req.session.timezoneOffset = req.body.timezoneOffset;
      return done(null, user);
    } else {
      return done(null, false, {
        message: "Your login details are not validate. Please try again.",
      });
    }
  }
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found." }, null);
  }
});

module.exports = passport.use(localLogin);
