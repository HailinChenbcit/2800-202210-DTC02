const WorryEntry = require("../models/WorryEntry");


const worryEntryController = {
    userWorryEntries: (req, res) => {
        res.send(req.user.worries);
    },

    displayWorryEntries: (req, res) => {
        // list all worry cards
        allWorries = WorryEntry.find({owner: req.user._id})
        // query entrytime
        entrytime = WorryEntry.find({owner: req.user._id}, {createdAt:1})
        // query worry description
        description = WorryEntry.find({owner: req.user._id}, {worryDescription:1})
        // Mood level
        moodLevel = WorryEntry.find({owner: req.user._id}, {moodLevel:1})

        console.log(entrytime, description)

        res.render("dailyView.ejs", {
            "entrytime": entrytime.createdAt,
            "description": description.worryDescription,
            "moodLevel": moodLevel,
        })
    },
}

module.exports = worryEntryController;