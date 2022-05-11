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
        allWorries = WorryEntry.find({ owner: req.user._id }, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                // console.log("Data " + data);
                res.render("dailyView.ejs", {
                    "data": data,
                })
            }
        });
    },
    // Edit worry card
    updateWorryEntries: (req, res) => {
        eventModel.updateOne({
            _id: req.params.id
        }, {
            $inc: { hits: 1 }
        }, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Data " + data);
            }
            console.log(_id)
            res.send("Updated Worry Entry!");
        });
    },
    // Delete worry card
    deleteWorryEntries: (req, res) => {
        worryEntry.remove({
            owner: req.user._id
        }, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Data " + data);
            }
            res.send("Deleted Entry!");
        });
    },
}

module.exports = worryEntryController;