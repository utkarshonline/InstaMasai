const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../models/blacklist.model");
const { auth } = require("../middleware/auth.middleware");
const userRouter = express.Router();
userRouter.use(auth);

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, pass, age, city } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.status(400).json({ mag: "user is already registered" });
    }
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.status(200).json({ error: err });
      } else {
        const user = await new UserModel({
          name,
          email,
          gender,
          pass: hash,
          age,
          city,
        });
        await user.save();
        console.log(user);
        res.status(200).json({
          msg: "the new user has been registered",
          reguser: user,
        });
      }
    });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, "masai", {
            expiresIn: "7d",
          });
          res.status(200).json({ msg: "Login done", token });
        } else {
          res.status(200).json({ msg: "wrong pass" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ msg: "plese register first" });
  }
});

userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const blacklist = new BlacklistModel({ token });
    await blacklist.save();
    res.status(200).json({ msg: "logged out" });
  } catch (err) {
    res.status(400).json("msg:err");
  }
});

module.exports = {
  userRouter,
};
