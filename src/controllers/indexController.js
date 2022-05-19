const User = require("../models/User");
const WorryTime = require("../models/WorryTime");
const fs = require("fs").promises;

const offsetDate = (date, offset) =>
  new Date(date.getTime() + offset * 60 * 1000);

const indexController = {
  homePage: async (req, res) => {
    // find next worry time for user
    const worryTimes = await WorryTime.find({
      user: req.user._id,
    }).exec();

    const activeWorryTime = worryTimes
      .filter(
        (worryTime) =>
          new Date(worryTime.startTime.getTime() + worryTime.duration * 60000) >
          new Date()
      )
      .sort((a, b) => a.startTime - b.startTime);

    const nextWorryTime =
      activeWorryTime.length > 0 ? activeWorryTime[0] : null;

    // format next worry time
    if (nextWorryTime) {
      const startTimeString = offsetDate(
        nextWorryTime.startTime,
        -req.session.timezoneOffset
      ).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "medium",
      });

      const nextWorryTimeInfo = {
        id: nextWorryTime._id,
        startTimeString,
      };

      // worry time page become available 5 min before the start time and remain available until the end of worry time
      if (
        new Date() <
          new Date(nextWorryTime.startTime.getTime() + nextWorryTime.duration * 60 * 1000) &&
        new Date() > new Date(nextWorryTime.startTime.getTime() - 5 * 60 * 1000)
      ) {
        nextWorryTimeInfo.available = true;
      }
      console.log(nextWorryTimeInfo);
      res.render("home", { nextWorryTime: nextWorryTimeInfo });
    } else {
      res.render("home");
    }
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
