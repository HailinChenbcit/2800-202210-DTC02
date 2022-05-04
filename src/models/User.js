const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
    worries: [{ type: Schema.Types.ObjectId, ref: "WorryEntry" }],
  },
  {
    _id: true,
    id: true,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
