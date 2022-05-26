const WorryTime = require("../models/WorryTime");
const WorryEntry = require("../models/WorryEntry");
const { offsetDate, formatToString } = require("../utility/timezones");

const worryTimeController = {
  /**
   * Handles POST request to create a worry time.
   * @param {Request} req 
   * @param {Response} res 
   */
  createWorryTime: async (req, res) => {
    // Parses request body to get form inputs
    let { time, duration, worries, notes } = req.body;
    notes = notes.trim();  // remove trailing white spaces in notes
    const startTime = offsetDate(new Date(time), req.session.timezoneOffset);
    const worryTime = WorryTime({
      startTime,
      duration: Number(duration),
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
  
  /**
   * Handles GET request to render and serve the during worry time page.
   * @param {Request} req 
   * @param {Response} res 
   */
  displayWorryTime: async (req, res) => {
    // finds the worry time record with the id from the params
    const worryTime = await WorryTime.findById(req.params.id).exec();

    // finds all worry entries associated with the worry time
    const allWorryIDs = worryTime.worries;
    const worries = await WorryEntry.find({
      _id: { $in: allWorryIDs },
      finished: false,
    }).exec();

    const worryDuration = worryTime.duration;
    const worryTimeNotes = worryTime.notes;

    const worryEntries = worries.map((entry) => {
      const worryEntry = {
        id: entry._id,
        description: entry.worryDescription,
        finished: entry.finished,
      };
      return worryEntry;
    });

    // renders the during worry time page with worry entries, duration and notes
    res.render("duringWorryTime", {
      worryEntries,
      worryDuration,
      worryTimeNotes,
    });
  },

  /**
   * Handles GET request to serve the worry time setup form.
   * @param {Request} req 
   * @param {Response} res 
   */
  worryTimeSetupPage: (req, res) => {
    const userId = req.user._id;
    // query the database for worry entries whose owner is `userId` and is not finished
    WorryEntry.find(
      { owner: req.session.passport.user, finished: false },
      (err, resp) => {
        if (err) {
          res.json(err);
        }
        // reformmat each worry entry
        const worryDatum = resp.map((entry) => {
          const modifiedEntry = {
            id: entry.id,
            datetime: formatToString(
              offsetDate(new Date(entry.datetime), -req.session.timezoneOffset)
            ),
            moodLevel: entry.moodLevel,
            worryDescription: entry.worryDescription,
            finished: entry.finished,
            owner: entry.owner,
            createdAt: entry.createdAt,
            updatedAt: entry.updatedAt,
            __v: entry.__v,
            images: entry.images,
          };
          return modifiedEntry;
        });

        // renders the worry time setup form using worry entries
        res.render("worryTimeSetup", {
          worryData: worryDatum,
        });
      }
    );
  },

  /**
   * Handles GET request to update a worry time record to be `finished`.
   * @param {Request} req 
   * @param {Response} res 
   */
  finishWorryTime: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedWorryTime = await WorryTime.findByIdAndUpdate(
        id,
        { finished: true },
        { new: true }
      ).exec();
      res.json(updatedWorryTime);
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = worryTimeController;
