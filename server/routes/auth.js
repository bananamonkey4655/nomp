const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username,
      password,
    });

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    // Generate JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7 days" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message:
          "Sorry, your password was incorrect. Please double-check your password.",
      });
    }

    const payload = { user: { id: user.id } };

    // Generate JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7 days" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
