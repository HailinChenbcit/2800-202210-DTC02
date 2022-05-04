const { Schema } = require("mongoose");

const worryTimeSchema = new Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    notificationEnaled: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    worries: [{ type: Schema.Types.ObjectId, ref: "WorryEntry" }],
  },
  {
    _id: true,
    id: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("WorryTime", worryTimeSchema);
