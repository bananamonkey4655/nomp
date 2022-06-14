const mongoose = require("mongoose");
require("dotenv").config();

// Connect to mongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Mongoose is connected");
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

module.exports = db;
