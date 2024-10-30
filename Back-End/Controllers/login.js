const User = require("../Models/user");
const jwt = require('jsonwebtoken');


exports.login =  async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({
        status: "success login",
        data: {
          token,
          user: {
            name: user.name,
            email: user.email,
            age: user.age,
          },
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
