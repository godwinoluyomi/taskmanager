const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Controller Function
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });

    const savedUser = await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error:", error.message);
    // res.status(500).json({ error: "Internal Server Error" });
    if (error.message.includes("duplicate key error ")) {
      return res.status(409).json({ error: "User already registered" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Login Controller Function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "6h",
    });

    res.status(200).json({ user: user, token: token, isAuthenticated: true });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
