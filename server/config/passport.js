const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");
/** Alternatively:
 * const connection = require("./database");
 * const UserModel = connection.models.User;
 */

const verify = (username, password, done) => {
  UserModel.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      // User doesn't exist in our database
      return done(null, false, { message: "Incorrect username" });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      }
      return done(null, false, { message: "Incorrect password! " });
    });
  });
};

const strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(err, user);
  });
});
