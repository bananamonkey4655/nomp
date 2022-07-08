const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

// TODO
const protect = async (req, res, next) => {
  // Get token from request header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      next();
    } catch (err) {
      console.log("Error with auth middleware: " + err);
      res.status(401).json({ message: "Server error" });
    }
  }
};

module.exports = { protect };
