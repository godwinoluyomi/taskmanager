// Middleware to verify the JWT Token that was returned on successful login.
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  // .replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);

    // Find user in the database to be sure the user id decoded from the jwt is in the DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.userId = user._id.toString();

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = verifyToken;
