const WorryEntry = require("../models/WorryEntry");

const worryEntryController = {
    userWorryEntries: (req, res) => {
        res.send(WorryEntry.find({}));
    }
}

module.exports = worryEntryController;