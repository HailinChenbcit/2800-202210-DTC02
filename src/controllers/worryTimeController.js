const WorryTime = require("../models/WorryTime");
const WorryEntry = require("../models/WorryEntry");
const { offsetDate, formatToString } = require("../utility/timezones")

const worryTimeController = {
  duringWorryTimePage: (req, res) => {
    WorryTime.find({ user: req.session.passport.user }, (err, resp) => {
      res.render("duringWorryTime", { worryTime: resp });
    });
  },
  createWorryTime: async (req, res) => {
    const { time, duration, worries, notes } = req.body;
    const startTime = offsetDate(new Date(time), req.session.timezoneOffset);
    const worryTime = WorryTime({
      startTime,
      duration: Number(duration),
      //   notificationEnabled,
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
    const worries = await WorryEntry.find({ _id: { $in: allWorryIDs }, finished: false }).exec();

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

    res.render("duringWorryTime", { worryEntries, worryDuration, worryTimeNotes });
  },

  worryTimeSetupPage: (req, res) => {
    const userId = req.user._id;
    // query the database for worry entries whose owner is `userId`
    WorryEntry.find(
      { owner: req.session.passport.user, finished: false },
      (err, resp) => {
        if (err) {
          res.json(err)
        }

        const worryDatum = resp.map((entry) => {
          const modifiedEntry = {
            id: entry.id,
            datetime: formatToString(offsetDate(
              new Date(entry.datetime),
              -req.session.timezoneOffset
            )),
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
};

module.exports = worryTimeController;
