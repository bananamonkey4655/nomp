const express = require("express");
const db = require("./config/database");
const cors = require("cors");
const axios = require("axios");
const session = require("express-session");
const passport = require("passport");
// const MongoStore = require("connect-mongo"); //OBSOLETE REMOVE LATER, replace authentication method of sessions with JWT
const auth = require("./routes/auth");
const eatery = require("./routes/eatery");

require("dotenv").config();
require("./config/passport");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // *****OBSOLETE, REMOVE LATER********
    // store: MongoStore.create({
    //   mongoUrl: process.env.MONGODB_URI,
    //   collectionName: "sessions",
    // }),
    // cookie: {
    //   maxAge: 1000 * 10,
    // },
    // ************************************
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", auth);
app.use("/eatery", eatery);

app.get("/", (req, res) => {
  res.send(
    "<h1>This is the response from the GET request for the backend</h1>"
  );
  // res.send("This is the response from the GET request for the backend"); //TEST
  // res.json({ hello: "world" }); //TEST
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running`);
});
