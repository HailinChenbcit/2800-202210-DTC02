const indexController = {
  homePage: (req, res) => {
    res.render("home");
  },
  accountsPage: (req, res) => {
    res.render("accounts");
  },
};

module.exports = indexController;

