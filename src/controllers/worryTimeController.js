const WorryTime = require("../models/WorryTime");
const WorryEntry = require("../models/WorryEntry");

const worryTimeController = {
  duringWorryTimePage: (req, res) => {
    WorryTime.find({ user: req.session.passport.user }, (err, resp) => {
      res.render("duringWorryTime", { worryTime: resp });
    });
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
    console.log(totalTime)

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
};

module.exports = worryTimeController;
