const JWT = require("jsonwebtoken");


const User = require("./user.model.js");
const config = require("../../config.js");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({ msg: "Bad request" })
    }

    let { _id } = JWT.verify(token,config.JWT_SECRET);

    if (!_id) {
      return res.status(401).json({ msg: "Authentiction faild." })
    }

    let user = await User.findById(_id).select(['-password']);

    if(!user){
      return res.status(401).json({ msg: "User not found." })
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(500).json({ msg: "Token verification failed." })
  }
}

module.exports = { verifyToken };