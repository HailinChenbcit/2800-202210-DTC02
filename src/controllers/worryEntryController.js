const WorryEntry = require("../models/WorryEntry");
const fs = require("fs").promises;
const { offsetDate, formatToString, formatToURLString } = require("../utility/timezones");
const { emojis } = require("../utility/moods");

const worryEntryController = {
  // Finds all worry entries from this user
  userWorryEntries: (req, res) => {
    WorryEntry.find(
      { owner: req.session.passport.user },
      "moodLevel datetime owner",
      (err, resp) => {
        res.json(resp);
      }
    );
  },

  // Finds all worry entries by this user at a certain date, then render the daily view
  dailyWorryEntries: async (req, res) => {
    const dateString = req.params.date;

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = Number(dateString.substring(6, 8));

    const date = new Date(year, month, day);
    const dateOffsetted = offsetDate(date, req.session.timezoneOffset);
    const nextDay = new Date(year, month, day + 1);
    const nextDayOffsetted = offsetDate(nextDay, req.session.timezoneOffset);

    const worryEntriesRaw = await WorryEntry.find({
      owner: req.user._id,
      datetime: {
        $gte: dateOffsetted,
        $lt: nextDayOffsetted,
      },
    }).exec();

    // Maps the raw worry entries data into a renderable format
    const worryEntries = worryEntriesRaw.map((entry) => {
      const worryEntry = {
        id: entry._id,
        time: formatToString(
          offsetDate(
            entry.datetime,
            -req.session.timezoneOffset
          )),
        description: entry.worryDescription,
        moodIcon: emojis[entry.moodLevel],
        images: entry.images,
      };
      return worryEntry;
    });
    res.render("dailyView", { worryEntries, dayview: req.params.date });
  },

  // Updates the worry entry by its id
  updateWorryEntries: async (req, res) => {
    const { id } = req.params;
    let { worryDescription } = req.body;
    worryDescription = worryDescription.trim();
    WorryEntry.findByIdAndUpdate(id, { worryDescription }, { new: true }, (err, resp) => {
      if (err) {
        res.json(err);
      } else {
        const rawDatetime = offsetDate(new Date(resp.datetime), -req.session.timezoneOffset);
        const fmtedDatetime = formatToURLString(rawDatetime);
        res.redirect(`/dailyView/${fmtedDatetime}`);
      }
    });
  },

  // Deletes a worry entry by its id
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

  // Creates a new worry entry given a time, mood, and a description
  createWorryEntry: async (req, res) => {
    let { time, mood, worryDescription } = req.body;
    worryDescription = worryDescription.trim();
    const offsettedTime = offsetDate(
      new Date(time),
      req.session.timezoneOffset
    );

    mood = Number(mood);

    // Processes uploaded images and saves it to the worry entry
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

  // Sets the finished attribute of a worry entry to true
  finishWorryEntry: async (req, res) => {
    const { id } = req.params;
    try {
      const finishedWorryEntry = await WorryEntry.findByIdAndUpdate(id, {
        finished: true,
      }).exec();
      res.json(finishedWorryEntry);
    } catch (e) {
      res.json(e);
    }
  },

};

module.exports = worryEntryController;
