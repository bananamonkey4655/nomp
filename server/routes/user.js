const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/user");

router.get("/info", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({ user });
});

module.exports = router;
