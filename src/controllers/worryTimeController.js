const WorryTime = require("../models/WorryTime");
const WorryEntry = require("../models/WorryEntry");
const { offsetDate, formatToString } = require("../utility/timezones");

const worryTimeController = {
  createWorryTime: async (req, res) => {
    let { time, duration, worries, notes } = req.body;
    notes = notes.trim();
    const startTime = offsetDate(new Date(time), req.session.timezoneOffset);
    const worryTime = WorryTime({
      startTime,
      duration: Number(duration),
      worries,
      notes,
      user: req.user._id,
    });

    try {
      const newWorryTime = await worryTime.save();
    } catch (e) {
      console.log(e);
    }
    res.redirect("/home");
  },
  // display total worry time
  displayWorryTime: async (req, res) => {
    const worryTime = await WorryTime.findById(req.params.id).exec();

    const allWorryIDs = worryTime.worries;
    const worries = await WorryEntry.find({
      _id: { $in: allWorryIDs },
      finished: false,
    }).exec();

    const worryDuration = worryTime.duration;
    const worryTimeNotes = worryTime.notes;

    const worryEntries = worries.map((entry) => {
      const worryEntry = {
        id: entry._id,
        description: entry.worryDescription,
        finished: entry.finished,
      };
      return worryEntry;
    });

    res.render("duringWorryTime", {
      worryEntries,
      worryDuration,
      worryTimeNotes,
    });
  },

  worryTimeSetupPage: (req, res) => {
    const userId = req.user._id;
    // query the database for worry entries whose owner is `userId` and is not finished
    WorryEntry.find(
      { owner: req.session.passport.user, finished: false },
      (err, resp) => {
        if (err) {
          res.json(err);
        }

        const worryDatum = resp.map((entry) => {
          const modifiedEntry = {
            id: entry.id,
            datetime: formatToString(
              offsetDate(new Date(entry.datetime), -req.session.timezoneOffset)
            ),
            moodLevel: entry.moodLevel,
            worryDescription: entry.worryDescription,
            finished: entry.finished,
            owner: entry.owner,
            createdAt: entry.createdAt,
            updatedAt: entry.updatedAt,
            __v: entry.__v,
            images: entry.images,
          };
          return modifiedEntry;
        });

        res.render("worryTimeSetup", {
          worryData: worryDatum,
        });
      }
    );
  },

  finishWorryTime: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedWorryTime = await WorryTime.findByIdAndUpdate(
        id,
        { finished: true },
        { new: true }
      ).exec();
      res.json(updatedWorryTime);
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = worryTimeController;
