const WorryTime = require("../models/WorryTime");

const worryEntryController = {
    // Show all worry cards
    duringWorryTimePage: (req, res) => {
        WorryTime.find({user: req.session.passport.user}, (err, resp) => {
            
            res.render("duringWorryTime", {"worryTime": resp})
        })
    }
}

module.exports = worryEntryController;