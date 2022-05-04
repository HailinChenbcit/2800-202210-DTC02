const mongoose = require("mongoose");

const connectToMongo = async (uri) =>
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = { connect: connectToMongo };
