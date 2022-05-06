module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.session.isAuth) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.session.isAuth) {
      return next();
    }
    res.redirect("/home");
  },
  isAdmin: (req, res, next) => {
    if (req.session.user.admin) {
      return next();
    }
    res.redirect("home");
  },
};
