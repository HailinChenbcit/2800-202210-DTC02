const WorryEntry = require("../models/WorryEntry");
const emojis = {
  1: "&#128549;",
  2: "&#128542;",
  3: "&#128563;",
  4: "&#128513",
  5: "&#128522;",
};
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
    const nextDay = new Date(year, month, day + 1);
    // console.log(dateString, date, nextDay)
    const worryEntriesRaw = await WorryEntry.find({
      owner: req.user._id,
      datetime: {
        $gte: date,
        $lt: nextDay,
      },
    }).exec();

    const worryEntries = worryEntriesRaw.map((entry) => {
      const worryEntry = {
        id: entry._id,
        time: entry.datetime.toLocaleString("en-GB", {
          // timeZone: "Canada/Pacific",
          dateStyle: "medium",
          timeStyle: "medium",
        }),
        description: entry.worryDescription,
        moodIcon: emojis[entry.moodLevel]
      };
      return worryEntry;
    });
    console.log(worryEntries)
    res.render("dailyView", { worryEntries });
  },

  // Edit worry card
  updateWorryEntries: async (req, res) => {
    const { id } = req.params;
    const { worryDescription } = req.body;
    try {
      const updatedWorryEntry = await WorryEntry.findByIdAndUpdate(
        id,
        { worryDescription },
        { new: true }
      ).exec();
      res.json(updatedWorryEntry);
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
};

module.exports = worryEntryController;
