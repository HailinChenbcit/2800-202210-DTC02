const User = require("../models/User");
const WorryEntry = require("../models/WorryEntry");
const fs = require("fs").promises;

const indexController = {
  homePage: (req, res) => {
    res.render("home");
  },
  accountsPage: async (req, res) => {
    const users = await User.find({});
    res.render("accounts", { users });
  },
  profilePage: (req, res) => {
    res.render("profile", {
      user: req.user,
    });
  },
  worryFormPage: (req, res) => {
    res.render("worryForm");
  },

  editPage: (req, res) => {
    res.render("edit", { id: req.params.id, date: req.params.date });
  },

  dailyViewPage: (req, res) => {
    res.render("dailyView");
  },

  worryTimeSetupPage: (req, res) => {
    const userId = req.user._id;
    // query the database for worry entries whose owner is `userId`
    WorryEntry.find({ owner: req.session.passport.user }, (err, resp) => {
      console.log(resp)
      res.render("worryTimeSetup", {
        worryData: resp
      });
      
    });
  },

  uploadAvatar: async (req, res) => {
    const file = req.file;
    try {
      const imageBuffer = await fs.readFile(`./uploads/${file.filename}`);
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          avatar: { data: imageBuffer, contentType: file.mimeType },
        },
        { new: true }
      ).exec();
      fs.unlink(`./uploads/${file.filename}`);
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
};

module.exports = indexController;
