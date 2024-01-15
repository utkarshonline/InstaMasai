const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlacklistModel } = require("../models/blacklist.model");
const { PostModel } = require("../models/post.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (await BlacklistModel.findOne({ token })) {
    return res.json({ msg: "You Have been logged out again" });
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        const { userId } = decoded;
        const user = await UserModel.findOne({ _id: userId });
        req.body.userId = decoded.userId;
        next();
      } else {
        res.json({ msg: "You are not authorized" });
      }
    } catch (err) {
      res.status(400).json({ msg: "please login" });
    }
  }
};

module.exports = {
  auth,
};
