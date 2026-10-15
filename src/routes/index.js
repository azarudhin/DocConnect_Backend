const router = require("express").Router();
const { getUsers, getUserById, getMe } = require("../controllers/userController");
const { getPosts, likePost } = require("../controllers/postController");
const { connect } = require("../controllers/connectController");

router.get("/users", getUsers);
router.get("/posts", getPosts);
router.post("/posts/:id/like", likePost);
router.post("/connect", connect);

module.exports = router;