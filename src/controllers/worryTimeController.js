const WorryTime = require("../models/WorryTime");

const worryEntryController = {
  duringWorryTimePage: (req, res) => {
    WorryTime.find({ user: req.session.passport.user }, (err, resp) => {
      res.render("duringWorryTime", { worryTime: resp });
    });
  },
  createWorryTime: async (req, res) => {
    const { time, duration, worries, notes } = req.body;
    const startTime = new Date(time);
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
};

module.exports = worryEntryController;
