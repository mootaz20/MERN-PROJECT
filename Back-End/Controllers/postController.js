const Post = require("../Models/post");

exports.addPost = async (req, res) => {
  try {
    const { title, description, image, category_id } = req.body;
    if (!title || !description || !image || !category_id) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof image !== "string"
    ) {
      return res.status(400).json({ message: "Please enter valid data" });
    }
    const post = new Post({
      title,
      description,
      image,
      user_id: req.user._id,
      category_id,
    });
    await post.save();
    res.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getPosts = async (req, res) => {
  try {
    const post = await Post.find()
      .populate("user_id", "-password")
      .populate("category_id")
      .populate("comments");
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id)
      .populate("category_id")
      .populate("user_id", "-password")
      .populate("comments");
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "post not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: {
        message: "post deleted successfully",
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, category_id } = req.body;
    console.log(req.user._id);
    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
        user_id: req.user._id,
        category_id,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

