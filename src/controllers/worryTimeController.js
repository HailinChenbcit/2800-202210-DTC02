const WorryTime = require("../models/WorryTime");

const worryEntryController = {
  duringWorryTimePage: (req, res) => {
    WorryTime.find({ user: req.session.passport.user }, (err, resp) => {
      res.render("duringWorryTime", { worryTime: resp });
    });
  },
  createWorryTime: async (req, res) => {
    console.log(req.body);
    const { startTime, duration, notificationEnabled, worries } = req.body;
    const worryTime = WorryTime({
      startTime,
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
