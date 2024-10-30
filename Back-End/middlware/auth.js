const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const authMiddlware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (err) {
    return res.status(500).send(`Internal server error ${err}`);
  }
};

module.exports = authMiddlware;
