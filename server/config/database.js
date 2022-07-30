const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const db = mongoose.connection;

module.exports = db;
