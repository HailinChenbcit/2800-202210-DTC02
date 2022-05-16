const User = require("../models/User");
const WorryEntry = require("../models/WorryEntry");

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

  createWorryEntry: async (req, res) => {
    let { time, mood, worryDescription } = req.body;
    time = new Date(time);
    mood = Number(mood);

    const newWorryEntry = WorryEntry({
      datetime: time,
      moodLevel: mood,
      worryDescription,
      owner: req.user._id
    });

    try {
      const worryEntryFromDB = await newWorryEntry.save();
      req.user.worries.push(worryEntryFromDB._id);
      await req.user.save();
      res.redirect("/home");
    } catch (e) {
      console.log(e);
    }
  },
  editPage: (req, res) => {
    res.render("edit");
  },
  

  dailyViewPage: (req, res) => {
    res.render("dailyView");
  },

  worryTimeSetupPage: (req, res) => {
    res.render("worryTimeSetup")
  }

};

module.exports = indexController;
