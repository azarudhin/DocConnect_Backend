const Connection = require("../models/Connection");
const { formatUser } = require("../utils/format");
const User = require("../models/User");
const { STATIC_USER_ID } = require("../constants/user");

exports.getUsers = async (req, res) => {
  try {
    const currentUserId = req.query.currentUserId || STATIC_USER_ID;

    const users = await User.find({ _id: { $ne: currentUserId } });
    if (!users || users.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "User list not have",
        data: [],
      });
    }

    const requests = await Connection.find({ from: currentUserId }).select("to");
    const requestedIds = requests.map((r) => r.to.toString());

    const formattedUsers = users.map((u) => ({
      ...formatUser(req, u),
      isRequested: requestedIds.includes(u._id.toString()),
    }));

    res.status(200).json({
      status: "Success",
      data: formattedUsers,
      requestedIds,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "User list not have",
      data: [],
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: null,
      });
    }
    res.status(200).json({
      status: "Success",
      data: formatUser(req, user),
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message || "Failed to fetch user",
      data: null,
    });
  }
};
