const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const UserModel = require("../models/user");

router.get("/info", protect, async (req, res) => {
  console.log("Server: getting info");

  const user = await UserModel.findById(req.user.id).select("-password");

  console.log(user);
  res.json({ user });
});

module.exports = router;
