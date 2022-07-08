const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/info", protect, (req, res) => {
  console.log("Server: getting info");
  res.json({ message: "get info" });
});

module.exports = router;
