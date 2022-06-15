const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.post("/register", (req, res, next) => {
  const saltLength = 10;
  bcrypt.hash(req.body.password, saltLength, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new UserModel({
      username: req.body.username,
      password: hashedPassword,
    });
    user.save((err) => {
      if (err) {
        res.json({ success: false });
      }
      res.json({ success: true });
    });
  });
});

module.exports = router;
