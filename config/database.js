const mongoose = require("mongoose");

// Connects to MongoDB using the given uri
const connectToMongo = (uri) =>
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log(err?.message);
      else console.log("Connected to mongodb");
    }
  );

module.exports = { connect: connectToMongo };
