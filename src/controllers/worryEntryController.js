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
    res.send(req.user.worries);
  },

  // Show all worry cards
  displayWorryEntries: async (req, res) => {
    const dateString = req.params.date;
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = Number(dateString.substring(6, 8));
    const date = new Date(year, month, day);
    const nextDay = new Date(year, month, day + 1);
    console.log(date, nextDay);
    const worryEntries = await WorryEntry.find({
      owner: req.user._id,
      datetime: {
        $gte: date,
        $lt: nextDay,
      },
    }).exec();
    console.log(worryEntries);
    res.render("dailyView", { data: worryEntries });
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
};

module.exports = worryEntryController;
