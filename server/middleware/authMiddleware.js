const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

// TODO
const protect = async (req, res, next) => {
  // Get token from request header
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.log("Error with auth middleware: " + err);
    res.status(401).json({ message: "Server error" });
  }
};

module.exports = { protect };
