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

  createWorryEntry: async (req, res) => {
    let { time, mood, worryDescription } = req.body;
    time = new Date(time);
    console.log(time);
    mood = Number(mood);

    const newWorryEntry = WorryEntry({
      datetime: time,
      moodLevel: mood,
      worryDescription,
      owner: req.user._id,
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
