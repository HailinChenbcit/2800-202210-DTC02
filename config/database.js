const mongoose = require("mongoose");

const connectToMongo = async (uri) =>
  mongoose.connect(uri, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    userCreateIndex: true,
  });

module.exports = { connect: connectToMongo };
