const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const UserModel = require("../models/user");

router.get("/info", protect, async (req, res) => {
  const user = await UserModel.findById(req.user.id).select("-password");

  res.json({ user });
});

module.exports = router;
