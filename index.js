const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { postRouter } = require("./routes/post.routes");
const { auth } = require("./middleware/auth.middleware");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(8081, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log("server is running ar port 8081");
  } catch (err) {
    console.log(err);
  }
});
