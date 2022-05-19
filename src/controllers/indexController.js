const User = require("../models/User");
const WorryEntry = require("../models/WorryEntry");
const worryEntryController = require("./worryEntryController");
const fs = require("fs").promises;
const { offsetDate, formatToString, formatToURLString } = require("../utility/timezones")
const { emojis } = require("../utility/moods")

const indexController = {
  homePage: (req, res) => {
    WorryEntry.find({ owner: req.session.passport.user }, (err, data) => {
      res.render("home", { "amtOfWorries": data.length });
    })
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
    WorryEntry.findById(req.params.id, (err, resp) => {
      if (err) {
        res.json(err)
      } else {
        const rawDatetime = offsetDate(new Date(resp.datetime), -req.session.timezoneOffset)
        const modifiedDatetime = formatToString(rawDatetime)
        const fmtedDatetime = formatToURLString(rawDatetime)

        res.render("edit", { id: resp.id, datetimeDisplay: modifiedDatetime, datetimeLink: fmtedDatetime, moodIcon: emojis[resp.moodLevel], worryDescription: resp.worryDescription })
      }
    })
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
