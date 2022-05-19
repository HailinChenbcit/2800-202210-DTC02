const WorryEntry = require("../models/WorryEntry");
const fs = require("fs").promises;

const emojis = {
  1: "&#128549;",
  2: "&#128542;",
  3: "&#128563;",
  4: "&#128513",
  5: "&#128522;",
};

const offsetDate = (date, offset) =>
  new Date(date.getTime() + offset * 60 * 1000);

const worryEntryController = {
  userWorryEntries: (req, res) => {
    WorryEntry.find(
      { owner: req.session.passport.user },
      "moodLevel datetime owner",
      (err, resp) => {
        res.json(resp);
      }
    );
  },

  // Show all worry cards
  dailyWorryEntries: async (req, res) => {
    const dateString = req.params.date;

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = Number(dateString.substring(6, 8));

    const date = new Date(year, month, day);
    const dateOffsetted = offsetDate(date, req.session.timezoneOffset);
    const nextDay = new Date(year, month, day + 1);
    const nextDayOffsetted = offsetDate(nextDay, req.session.timezoneOffset);

    console.log(dateString, date, nextDay);

    const worryEntriesRaw = await WorryEntry.find({
      owner: req.user._id,
      datetime: {
        $gte: dateOffsetted,
        $lt: nextDayOffsetted,
      },
    }).exec();

    const worryEntries = worryEntriesRaw.map((entry) => {
      const worryEntry = {
        id: entry._id,
        time: offsetDate(
          entry.datetime,
          -req.session.timezoneOffset
        ).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "medium",
        }),
        description: entry.worryDescription,
        moodIcon: emojis[entry.moodLevel],
        images: entry.images,
      };
      return worryEntry;
    });
    res.render("dailyView", { worryEntries, dayview: req.params.date });
  },

  // Edit worry card
  updateWorryEntries: async (req, res, next) => {
    const { id } = req.params;
    const { worryDescription } = req.body;
    try {
      const updatedWorryEntry = await WorryEntry.findByIdAndUpdate(
        id,
        { worryDescription },
        { new: true }
      ).exec();
      next();
    } catch (e) {
      res.json(e);
    }
  },

  // Delete worry card
  deleteWorryEntries: (req, res) => {
    WorryEntry.deleteOne(
      {
        _id: req.params.id,
      },
      function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Deleted Data " + data);
        }
      }
    );
  },

  createWorryEntry: async (req, res) => {
    let { time, mood, worryDescription } = req.body;
    const offsettedTime = offsetDate(
      new Date(time),
      req.session.timezoneOffset
    );

    mood = Number(mood);

    const images = [];
    const files = req.files;
    if (files && files.length > 0) {
      for (let file of files) {
        try {
          const imageBuffer = await fs.readFile(`./uploads/${file.filename}`);
          const contentType = file.mimeType;
          images.push({ data: imageBuffer, contentType });
          fs.unlink(`./uploads/${file.filename}`);
        } catch (e) {
          console.log(e);
        }
      }
    }

    const newWorryEntry = WorryEntry({
      datetime: offsettedTime,
      moodLevel: mood,
      worryDescription,
      owner: req.user._id,
      images,
    });

    try {
      const worryEntryFromDB = await newWorryEntry.save();
      res.redirect("/home");
    } catch (e) {
      console.log(e);
    }
  },

  // updateWorryTimes: async (req, res) => {
  //   const { id } = req.params;
  //   const { worryDescription } = req.body;
  //   try {
  //     const updatedWorryEntry = await WorryEntry.findByIdAndUpdate(
  //       id,
  //       { worryDescription },
  //       { new: true }
  //     ).exec();
  //     res.json(updatedWorryEntry);
  //   } catch (e) {
  //     res.json(e);
  //   }
  // },
};

module.exports = worryEntryController;
