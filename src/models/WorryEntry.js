const mongoose = require("mongoose");
const { Schema } = mongoose;

const worryEntrySchema = new Schema(
  {
    datetime: {
      type: Date,
      default: () => Date.now(),
    },
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
    owner: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    _id: true,
    id: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("WorryEntry", worryEntrySchema);
