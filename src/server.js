require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

require("./models/User");
require("./models/Post");
require("./models/Connection");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", routes);
app.use("/", routes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});