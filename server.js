const express = require("express");
const users = require("./routes/users");
const profile = require("./routes/profile");
const posts = require("./routes/posts");
const app = express();
const mongoose = require("mongoose");
const mongoURI = require("./config/keys").mongoURI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at ${port}`));
