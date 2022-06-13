const mongoose = require("mongoose");
require("dotenv").config();

// Connect to mongoDB
mongoose.connect(process.env.DB_STRING, { useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

module.exports = db;