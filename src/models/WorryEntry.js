const { Schema } = require("mongoose");

const worryEntrySchema = new Schema(
  {
    moodLevel: {
      type: Number,
      required: true,
    },
    worryDescription: {
      type: String,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
    id: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("WorryEntry", worryEntrySchema);
