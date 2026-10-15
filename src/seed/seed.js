require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const Connection = require("../models/Connection");
const { STATIC_USER_ID } = require("../constants/user");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany();
  await Post.deleteMany();
  await Connection.deleteMany();

  const users = await User.insertMany([
    {
      _id: new mongoose.Types.ObjectId(STATIC_USER_ID),
      name: "Dr. Arjun Mehta",
      occupation: "Cardiology",
      profileImage: "user1.png",
      connectionsCount: 2,
    },
    { name: "Docconnect", occupation: "Healthcare Technology", profileImage: "user2.png", connectionsCount: 2 },
    { name: "Dr. Arjun Mehta", occupation: "Cardiology", profileImage: "user3.png", connectionsCount: 2 },
    { name: "Dr. Arjun Mehta", occupation: "Cardiology", profileImage: "user4.png", connectionsCount: 2 },
    { name: "Dr. Arjun Mehta", occupation: "Cardiology", profileImage: "user5.png", connectionsCount: 2 },
  ]);

  const postText = "Welcome to Docconnect! We're building India's largest healthcare professional network. Connect with doctors, nurses, pharmacists, and medical students across the country.";
  const now = Date.now();

  await Post.insertMany([
    {
      content: postText,
      author: users[1]._id,
      images: ["post1.png"],
      likesCount: 5,
      sharesCount: 3,
      commentsCount: 0,
      createdAt: new Date(now),
    },
    {
      content: postText,
      author: users[1]._id,
      images: ["post2.png", "post3.png"],
      likesCount: 6,
      sharesCount: 2,
      commentsCount: 1,
      createdAt: new Date(now - 1 * 3600000),
    },
    {
      content: postText,
      author: users[1]._id,
      images: ["post3.png"],
      likesCount: 8,
      sharesCount: 4,
      commentsCount: 2,
      createdAt: new Date(now - 2 * 3600000),
    },
    {
      content: postText,
      author: users[1]._id,
      images: ["post4.png", "post5.png"],
      likesCount: 12,
      sharesCount: 5,
      commentsCount: 3,
      createdAt: new Date(now - 3 * 3600000),
    },
    {
      content: postText,
      author: users[1]._id,
      images: ["post5.png"],
      likesCount: 15,
      sharesCount: 7,
      commentsCount: 4,
      createdAt: new Date(now - 4 * 3600000),
    },
  ]);

  console.log("Seeded 5 users and 5 posts successfully");
  console.log("Static Current User ID:", STATIC_USER_ID);

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});