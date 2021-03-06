const User = require("../models/User");
const WorryTime = require("../models/WorryTime");
const WorryEntry = require("../models/WorryEntry");
const fs = require("fs").promises;
const {
  offsetDate,
  formatToString,
  formatToURLString,
} = require("../utility/timezones");
const { emojis } = require("../utility/moods");

const indexController = {
  // Displays current user calendar in homepage
  homePage: async (req, res) => {
    // Find next worry time for user
    const worryTimes = await WorryTime.find({
      user: req.user._id,
    }).exec();
    // Add
    const activeWorryTime = worryTimes
      .filter(
        (worryTime) =>
          new Date(worryTime.startTime.getTime() + worryTime.duration * 60000) >
            new Date() && !worryTime.finished
      )
      .sort((a, b) => a.startTime - b.startTime);

    const nextWorryTime =
      activeWorryTime.length > 0 ? activeWorryTime[0] : null;

    // Format next worry time
    if (nextWorryTime) {
      const startTimeString = formatToString(
        offsetDate(nextWorryTime.startTime, -req.session.timezoneOffset)
      );

      const nextWorryTimeInfo = {
        id: nextWorryTime._id,
        startTimeString,
        duration: nextWorryTime.duration,
      };

      // worry time page become available 5 min before the start time
      // and remain available until the end of worry time
      if (
        new Date() <
          new Date(
            nextWorryTime.startTime.getTime() +
              nextWorryTime.duration * 60 * 1000
          ) &&
        new Date() > new Date(nextWorryTime.startTime.getTime() - 5 * 60 * 1000)
      ) {
        nextWorryTimeInfo.available = true;
      }

      res.render("home", { nextWorryTime: nextWorryTimeInfo });
    } else {
      res.render("home", { nextWorryTime: null });
    }
  },
  // Display accounts page for admins, including all registered users
  accountsPage: async (req, res) => {
    const users = await User.find({});
    res.render("accounts", { users, currentUser: req.user.email });
  },
  // Display profile page with current logged-in user information
  profilePage: (req, res) => {
    res.render("profile", {
      user: req.user,
    });
  },
  // Display worryform page
  worryFormPage: (req, res) => {
    res.render("worryForm");
  },
  // Edit worry entry in duringworry page
  editPage: (req, res) => {
    WorryEntry.findById(req.params.id, (err, resp) => {
      if (err) {
        res.json(err);
      } else {
        const rawDatetime = offsetDate(
          new Date(resp.datetime),
          -req.session.timezoneOffset
        );
        const modifiedDatetime = formatToString(rawDatetime);
        const fmtedDatetime = formatToURLString(rawDatetime);

        res.render("edit", {
          id: resp.id,
          datetimeDisplay: modifiedDatetime,
          datetimeLink: fmtedDatetime,
          moodIcon: emojis[resp.moodLevel],
          worryDescription: resp.worryDescription,
        });
      }
    });
  },
  // Display dailyview page
  dailyViewPage: (req, res) => {
    res.render("dailyView");
  },
  // Change user avatar in profile page
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
