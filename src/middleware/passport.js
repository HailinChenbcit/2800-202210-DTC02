const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

/**
 * Defines passport authentication strategy
 * use email and password for authentication.
 */
const localLogin = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: "email",
    passwordField: "password",
  },

  async (req, email, password, done) => {
    const user = await User.findOne({ email, password }).exec();
    if (user) {
      // store timezone information in the session.
      req.session.timezoneOffset = Number(req.body.timezoneOffset);
      return done(null, user);
    } else {
      return done(null, false, {
        message: "Your login details are not validate. Please try again.",
      });
    }
  }
);


/**
 * Serializes user to the session.
 */
passport.serializeUser((user, done) => {
  done(null, user._id);
});

/**
 * Deserialize user on each request to make sure the user object attaced to
 * the request object is always up-to-date
 */
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found." }, null);
  }
});

module.exports = passport.use(localLogin);
