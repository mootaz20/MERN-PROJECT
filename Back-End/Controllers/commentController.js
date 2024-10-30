const Comment = require("../Models/comment");
const Post = require("../Models/post");

exports.addComment = async (req, res) => {
  try {
    const { post_id, text } = req.body;
    const post = await Post.findById(post_id);
    const commentData = new Comment({
      text,
      post_id,
      user_id: req.user._id,
    });
    const comment = await commentData.save();
    post.comments.push(comment);
    await post.save();

    res.status(200).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// exports.getComments = async (req, res) => {
//   try {
//     const post_id = req.params.post_id;
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
