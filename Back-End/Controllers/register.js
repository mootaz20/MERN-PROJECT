const User = require("../Models/user");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { email, name, age, image, password } = req.body;
    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof image !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "Invalid input types. Email, name, image, and password must be strings.",
      });
    }

    const user = await User.create({
      email,
      name,
      age,
      image,
      password
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({
      status: "success",
      data: {
        token,
        user: {
          name: user.name,
          email: user.email,
          age: user.age,
          image: user.image,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
