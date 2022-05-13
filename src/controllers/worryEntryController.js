const WorryEntry = require("../models/WorryEntry");
const emojis = {
    1: "&#128549;",
    2: "&#128542;",
    3: "&#128563;",
    4: '&#128513',
    5: "&#128522;",
}
const worryEntryController = {
    userWorryEntries: (req, res) => {
        res.send(req.user.worries);
    },

    // Show all worry cards
    displayWorryEntries: (req, res) => {
        WorryEntry.find({ owner: req.user._id }, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                res.render("dailyView.ejs", {
                    "data": data,
                })
            }
        });
    },

    // Edit worry card
    updateWorryEntries: (req, res) => {
        WorryEntry.updateOne({
            _id: req.params.id
        }, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                // console.log(data);
                res.render("dailyView.ejs", {
                    "data": data,
                })
            }
        });
    },

    // Delete worry card
    deleteWorryEntries: (req, res) => {
        WorryEntry.deleteOne({
            _id: req.params.id
        }, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Deleted Data " + data);
            }
        });
    },

}

module.exports = worryEntryController;