const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

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

module.exports = {
  userRouter,
};
