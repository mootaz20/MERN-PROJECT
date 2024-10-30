const Post = require("../Models/post");

const checkUser = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user_id.toString() !== req.user._id.toString()) {
      console.log("from if");
      return res.status(401).json({ msg: "Not authorized to edit or delete this post" });
    }
    console.log("this post to me");

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = checkUser;
