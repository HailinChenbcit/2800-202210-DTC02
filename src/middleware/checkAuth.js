module.exports = {
  /**
   * Checks if the request is authenticated (if the user is logged-in)
   * Proceed to the next request handler if authenticated, otherwise, redirect to login page.
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },

  /**
   * Checks if the request is authenticated (if the user is logged-in)
   * Redirect to homepage if authenticated, otherwise, proceed to the next request handler.
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  forwardAuthenticated: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/home");
  },

  /**
   * Checks if the current logged-in user is an admin
   * Proceed to the next request handler if user is an admin, otherwise, redirect to homepage.
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  isAdmin: (req, res, next) => {
    if (req.user.admin) {
      return next();
    }
    res.redirect("home");
  },
};
