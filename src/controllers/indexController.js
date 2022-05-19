const User = require("../models/User");
const WorryEntry = require("../models/WorryEntry");
const worryEntryController = require("./worryEntryController");
const fs = require("fs").promises;

const offsetDate = (date, offset) =>
  new Date(date.getTime() + offset * 60 * 1000);

const emojis = {
  1: "&#128549;",
  2: "&#128542;",
  3: "&#128563;",
  4: "&#128513",
  5: "&#128522;",
};

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
        const modifiedDatetime = offsetDate(new Date(resp.datetime), -req.session.timezoneOffset).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "medium",
        })

        res.render("edit", { id: resp.id, datetime: modifiedDatetime, moodIcon: emojis[resp.moodLevel], worryDescription: resp.worryDescription })
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
