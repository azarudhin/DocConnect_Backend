const Post = require("../models/Post");
const User = require("../models/User");
const { formatUser, formatPost } = require("../utils/format");
const { STATIC_USER_ID } = require("../constants/user");

exports.getPosts = async (req, res) => {
  try {
    const userId = req.query.currentUserId || STATIC_USER_ID;
    const [currentUser, posts] = await Promise.all([
      User.findById(userId),
      Post.find().sort({ createdAt: -1 }).populate("author"),
    ]);

    const formattedPosts = posts.map((p) => formatPost(req, p, false));

    res.json({
      status: "Success",
      message: "Feed fetched successfully",
      data: {
        currentUser: currentUser ? formatUser(req, currentUser) : null,
        posts: formattedPosts,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Failed to fetch the feed",
      data: null,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { isLiked } = req.body;

    const increment = isLiked === false ? -1 : 1;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likesCount: increment } },
      { new: true }
    ).populate("author");

    if (!post) {
      return res.status(404).json({
        status: "Error",
        message: "Post not found",
        data: null,
      });
    }

    if (post.likesCount < 0) {
      post.likesCount = 0;
      await post.save();
    }

    res.json({
      status: "Success",
      message: isLiked === false ? "Post unliked" : "Post liked",
      data: formatPost(req, post, isLiked !== false),
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Failed to update like status",
      data: null,
    });
  }
};