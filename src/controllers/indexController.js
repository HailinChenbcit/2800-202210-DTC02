const User = require("../models/User");
const WorryTime = require("../models/WorryTime");
const fs = require("fs").promises;

const offsetDate = (date, offset) =>
  new Date(date.getTime() + offset * 60 * 1000);

const indexController = {
  homePage: async (req, res) => {
    const worryTimes = await WorryTime.find({
      user: req.user._id,
    }).exec();

    const futureWorryTime = worryTimes
      .filter(
        (worryTime) =>
          new Date(worryTime.startTime.getTime() + worryTime.duration * 60000) >
          new Date()
      )
      .sort((a, b) => a.worryTime - b.worryTime);

    const nextWorryTime =
      futureWorryTime.length > 0 ? futureWorryTime[0] : null;

    nextWorryTime.startTime = offsetDate(
      nextWorryTime.startTime,
      -req.session.timezoneOffset
    ).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
    res.render("home", { nextWorryTime });
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
