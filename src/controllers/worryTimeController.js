const WorryTime = require("../models/WorryTime");

const offsetDate = (date, offset) =>
  new Date(date.getTime() + offset * 60 * 1000);

const worryEntryController = {
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
};

module.exports = worryEntryController;
