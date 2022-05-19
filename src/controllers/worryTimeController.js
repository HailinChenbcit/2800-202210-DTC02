const WorryTime = require("../models/WorryTime");
const WorryEntry = require("../models/WorryEntry");

const offsetDate = (date, offset) =>
  new Date(date.getTime() + offset * 60 * 1000);

const worryTimeController = {
  duringWorryTimePage: (req, res) => {
    WorryTime.find({ user: req.session.passport.user }, (err, resp) => {
      res.render("duringWorryTime", { worryTime: resp });
    });
  },
  createWorryTime: async (req, res) => {
    const { startTime, duration, notificationEnabled, worries } = req.body;
    const startTimeObj = offsetDate(
      new Date(startTime),
      req.session.timezoneOffset
    );
    const worryTime = WorryTime({
      startTime: startTimeObj,
      duration,
      notificationEnabled,
      worries,
      owner: req.user._id,
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
};

module.exports = worryTimeController;
