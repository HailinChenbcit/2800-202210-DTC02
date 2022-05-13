module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/home");
  },
  isAdmin: (req, res, next) => {
    if (req.user.admin) {
      return next();
    }
    res.redirect("home");
  },
};
