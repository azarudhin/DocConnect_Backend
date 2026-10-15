const Connection = require("../models/Connection");
const User = require("../models/User");
const { STATIC_USER_ID } = require("../constants/user");

exports.connect = async (req, res) => {
  try {
    const from = req.body.from || req.body.currentUserId || req.body.fromUserId || STATIC_USER_ID;
    const to = req.body.to || req.body.targetUserId || req.body.toUserId || req.body.userId;

    if (!from || !to) {
      return res.status(400).json({
        status: 400,
        message: "failed to send Request",
      });
    }

    if (from.toString() === to.toString()) {
      return res.status(400).json({
        status: 400,
        message: "failed to send Request",
      });
    }

    const [fromUser, toUser] = await Promise.all([
      User.findById(from),
      User.findById(to),
    ]);

    if (!fromUser || !toUser) {
      return res.status(404).json({
        status: 404,
        message: "failed to send Request",
      });
    }

    const existing = await Connection.findOne({ from, to });
    if (existing) {
      if (req.body.action === "disconnect" || req.body.action === "remove") {
        await Connection.deleteOne({ _id: existing._id });
        return res.status(200).json({
          status: "Success",
          message: "Connection request removed",
        });
      }
      return res.status(400).json({
        status: 400,
        message: "Request will be All ready Send",
      });
    }

    const connection = await Connection.create({ from, to });

    res.status(200).json({
      status: "Success",
      message: "Request has be Sended",
      data: connection,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        status: 400,
        message: "Request will be All ready Send",
      });
    }
    res.status(500).json({
      status: 500,
      message: "failed to send Request",
    });
  }
};
