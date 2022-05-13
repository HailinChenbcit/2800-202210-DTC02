const WorryEntry = require("../models/WorryEntry");

const worryEntryController = {
    userWorryEntries: (req, res) => {
        console.log("LOG: " + req.session.passport.user)
        WorryEntry.find({owner: req.session.passport.user}, "moodLevel datetime owner",(err, resp) => {
            res.json(resp)
        })
    }
}

module.exports = worryEntryController;