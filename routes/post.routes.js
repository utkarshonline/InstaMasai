const express = require("express");
const { PostModel } = require("../models/post.model");
const { auth } = require("../middleware/auth.middleware");
const mongoose = require("mongoose");
const postRouter = express.Router();
postRouter.use(auth);

postRouter.post("/add", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).json({ msg: "a new Post has been created" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find({
      userId: req.body.userId,
    });
    res.status(200).json({ post: posts });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

postRouter.patch("/update/:postId", async (req, res) => {
  const { postId } = req.params;
  const payload = req.body;
  try {
    const post = await PostModel.findOne({ _id: PostId });
    if (post.userId === req.body.userId) {
      await PostModel.findByIdAndUpdate({ _id: postId }, payload);
      res.status(200).json({ msg: "user has been updated" });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

postRouter.delete("/delete/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({ _id: PostId });
    if (post.userId === req.body.userId) {
      await PostModel.findByIdAndDelete({ _id: postId });
      res.status(200).json({ msg: "user has been deletede" });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

module.exports = {
  postRouter,
};
