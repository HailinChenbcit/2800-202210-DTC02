const worryEntryController = {
    userWorryEntries: (req, res) => {
        res.send(req.user.worries);
    }
}

module.exports = worryEntryController;