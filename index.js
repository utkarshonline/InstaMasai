const express = require("express");
const { connection } = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log("server is running ar port 8080");
  } catch (err) {
    console.log(err);
  }
});
