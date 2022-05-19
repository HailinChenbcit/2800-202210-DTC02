const WorryTime = require("../models/WorryTime");
const WorryEntry = require("../models/WorryEntry");
const { offsetDate } = require("../utility/timezones")

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
    const allWorryTimes = await WorryTime.find({
      owner: req.user._id,
    }).exec();
    const worryTimes = allWorryTimes.map((entry) => {
      const worryTime = {
        duration: entry.duration,
      };
      return worryTime;
    });
    var totalTime = 0;
    worryTimes.forEach((entry) => {
      totalTime += entry.duration;
    });
    console.log(totalTime);

    const allWorryEntries = await WorryEntry.find({
      $and: [
        {
          owner: req.user._id,
        },
        {
          finished: false,
        },
      ],
    }).exec();
    const worryEntries = allWorryEntries.map((entry) => {
      const worryEntry = {
        id: entry._id,
        description: entry.worryDescription,
        finished: entry.finished,
      };
      return worryEntry;
    });

    res.render("duringWorryTime", { worryEntries, totalTime });
  },
  // Update selected worry time
  updateWorryTime: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedDuringTime = await WorryEntry.findByIdAndUpdate(id, {
        finished: true,
      }).exec();
      res.json(updatedDuringTime);
    } catch (e) {
      res.json(e);
    }
  },

  worryTimeSetupPage: (req, res) => {
    const userId = req.user._id;
    // query the database for worry entries whose owner is `userId`
    WorryEntry.find(
      { owner: req.session.passport.user, finished: false },
      (err, resp) => {
        const worryDatum = resp.map((entry) => {
          const modifiedEntry = {
            id: entry.id,
            datetime: offsetDate(
              new Date(entry.datetime),
              -req.session.timezoneOffset
            ).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "medium",
            }),
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
